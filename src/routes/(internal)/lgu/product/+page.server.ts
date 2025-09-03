import 'dotenv/config';
import { fail } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { productSchema, updateProductSchema } from '$lib/zod-schema';
import { createClient } from '@supabase/supabase-js';
import type { PageServerLoad, Actions } from './$types.js';
import { product, category, user } from '$lib/server/db/schema';
import db from '$lib/server/db';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Supabase URL or Service Key is not defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const load: PageServerLoad = async ({ depends }) => {
	depends('refetch:product');
	const categories = await db.select().from(category).orderBy(category.category_name);

	const municipality = await db.select().from(user).where(eq(user.role, 'lgu'));

	const products = await db
		.select({
			id: product.id,
			categoryId: product.categoryId,
			product_name: product.product_name,
			description: product.description,
			price: product.price,
			quantity: product.quantity,
			image_url: product.image_url,
			category_name: category.category_name,
			lguId: product.lguId,
			f_name: user.f_name
		})
		.from(product)
		.leftJoin(category, eq(product.categoryId, category.id))
		.leftJoin(user, eq(product.lguId, user.id))
		.execute();

	return {
		form: await superValidate(zod(productSchema)),
		categories,
		products,
		municipality
	};
};

export const actions: Actions = {
	product: async (event) => {
	const formData = await event.request.formData();

	// validate normal fields with superforms
	const form = await superValidate(formData, zod(productSchema));
	if (!form.valid) {
		return fail(400, { form });
	}

	const { product_name, description, price, quantity, categoryId } = form.data;
	const lguId = event.locals.user?.id;

	if (!lguId) {
		return setError(form, '', 'You must be logged in as LGU to add a product');
	}
	const imageFile = formData.get('image_url') as File | null;
	const productThumbnailFolder = 'product-photos/';
	let imgUrl: string | null = null;

	if (imageFile && imageFile.size > 0) {
		const fileName = `${productThumbnailFolder}${Date.now()}-${imageFile.name}`;

		const { data, error: uploadError } = await supabase.storage
			.from('kayaco')
			.upload(fileName, imageFile, {
				cacheControl: '3600',
				upsert: false,
				contentType: imageFile.type
			});

		if (uploadError) {
			console.error('Error uploading product image:', uploadError);
			return setError(form, 'image_url', 'Error uploading product image');
		}

		imgUrl = `${supabaseUrl}/storage/v1/object/public/kayaco/${data.path}`;
	}

	try {
		await db.insert(product).values({
			id: uuidv4(),
			categoryId,
			lguId,
			product_name,
			description,
			price: price.toString(),
			quantity,
			image_url: imgUrl
		});
	} catch (e) {
		if (e instanceof postgres.PostgresError) {
			console.error('DB insert error:', e);
			return setError(form, '', 'Unable to create product');
		}
		return setError(form, '', 'Unable to create product');
	}
},
	updateProduct: async (event) => {
		const form = await superValidate(event, zod(updateProductSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { productId, product_name, description, price, quantity, categoryId, image_url} =
			form.data;

		if (!productId || typeof productId !== 'string') {
			return new Response('Invalid product ID', { status: 400 });
		}

		try {
			const existingProduct = await db
				.select({
					image_url: product.image_url
				})
				.from(product)
				.where(eq(product.id, productId))
				.limit(1);

			if (existingProduct.length === 0) {
				return new Response('Product not found', { status: 404 });
			}

			const productThumbnailFolder = 'product-photos/';
			let imgUrl = existingProduct[0].image_url;

			if (image_url && image_url.size > 0) {
				if (imgUrl) {
					const oldFilePath = imgUrl.replace(`${supabaseUrl}/storage/v1/object/public/kayaco/`, '');
					const { error: deleteError } = await supabase.storage
						.from('kayaco')
						.remove([oldFilePath]);
					if (deleteError) {
						console.error('Error deleting old image:', deleteError);
						return setError(form, 'image_url', 'Error deleting old image');
					}
				}
				const fileName = `${productThumbnailFolder}${Date.now()}-${image_url.name}`;

				const { data, error: uploadError } = await supabase.storage
					.from('kayaco')
					.upload(fileName, image_url, { cacheControl: '3600', upsert: false });

				if (uploadError) {
					console.error('Error uploading new thumbnail:', uploadError);
					return setError(form, 'image_url', 'Error uploading new thumbnail');
				}

				imgUrl = `${supabaseUrl}/storage/v1/object/public/kayaco/${data.path}`;
			}
			await db
				.update(product)
				.set({
					categoryId,
					product_name,
					description,
					price,
					quantity,
					image_url: imgUrl
				})
				.where(eq(product.id, productId));
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				return setError(form, '', 'Unable to create update');
			}
			return setError(form, '', 'Unable to create update');
		}
	}
};