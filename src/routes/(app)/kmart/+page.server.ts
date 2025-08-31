import { product, category, cart, user } from '$lib/server/db/schema';
import db from '$lib/server/db';
import { eq, and } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, depends }) => {
	// Add dependency tracking for cart updates
	depends('cart:refresh');
	
	const userId = locals.user?.id;

	const categories = await db.select().from(category).execute();

	const products = await db
		.select({
			id: product.id,
			title: product.product_name,
			description: product.description,
			price: product.price,
			quantity: product.quantity,
			imageSrc: product.image_url,
			lguId: product.lguId,
			category: category.category_name,
			f_name: user.f_name
			
		})
		.from(product)
		.leftJoin(category, eq(product.categoryId, category.id))
		.leftJoin(user, eq(product.lguId, user.id)) 
		.execute();

	let cartItems: 
	{ id: string; productId: string; variant: string; quantity: number; price: string; productName: string | null; imageSrc: string | null; }[] = [];

	if (userId) {
		cartItems = await db
			.select({
				id: cart.id,
				productId: cart.productId,
				variant: cart.variant,
				quantity: cart.quantity,
				price: cart.price,
				productName: product.product_name,
				imageSrc: product.image_url
			})
			.from(cart)
			.leftJoin(product, eq(cart.productId, product.id))
			.where(eq(cart.userId, userId))
			.execute();
	}

	return {
		categories,
		products,
		cartItems 
	};
};

export const actions: Actions = {
	addToCart: async ({ request, locals }) => {
		const form = await request.formData();
		const productId = form.get('productId') as string;
		const variant = form.get('variant') as string || 'default';
		const quantity = Number(form.get('quantity') || 1);
		const userId = locals.user?.id;

		if (!userId) {
			throw redirect(303, '/login');
		}

		if (!productId || isNaN(quantity)) {
			return fail(400, { error: 'Invalid form submission.' });
		}

		// Check if item already exists in cart - FIXED: Use 'and' to combine conditions
		const existingItem = await db
			.select()
			.from(cart)
			.where(
				and(
					eq(cart.userId, userId),
					eq(cart.productId, productId),
					eq(cart.variant, variant)
				)
			)
			.limit(1);

		if (existingItem.length > 0) {
			// Update quantity if item exists
			await db
				.update(cart)
				.set({ quantity: existingItem[0].quantity + quantity })
				.where(eq(cart.id, existingItem[0].id));
		} else {
			// Fetch product price for new items
			const result = await db
				.select({ price: product.price })
				.from(product)
				.where(eq(product.id, productId))
				.limit(1);

			const productData = result[0];

			if (!productData) {
				return fail(404, { error: 'Product not found' });
			}

			await db.insert(cart).values({
				id: crypto.randomUUID(),
				userId,
				productId,
				variant,
				quantity,
				price: productData.price
			});
		}

		return {
			success: true
		};
	}
};