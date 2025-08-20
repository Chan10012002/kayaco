import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	cart,
	product,
	category,
	orders,
	order_items,
	address
} from '$lib/server/db/schema';
import { paymentMethod as paymentMethodEnum } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { productId } = params;

	try {
		const products = await db
			.select({
				id: product.id,
				title: product.product_name,
				description: product.description,
				price: product.price,
				quantity: product.quantity,
				imageSrc: product.image_url,
				category: category.category_name
			})
			.from(product)
			.leftJoin(category, eq(product.categoryId, category.id))
			.where(eq(product.id, productId))
			.execute();

		const paymentMethods = Object.values(paymentMethodEnum.enumValues || ['Cash on Delivery', 'Paymongo Portal']);

		return {
			productId,
			products,
			paymentMethods
		};
	} catch (error) {
		console.error('Error loading product:', error);
		return {
			productId,
			products: [],
			paymentMethods: ['Cash on Delivery', 'Paymongo Portal']
		};
	}
};

export const actions: Actions = {
	addToCart: async ({ request, params, locals }) => {
	try {
		const form = await request.formData();
		const variant = form.get('variant') as string;
		const quantity = Number(form.get('quantity') || 1);
		const userId = locals.user?.id;

		if (!userId) {
			throw redirect(303, '/login');
		}

		if (!variant || isNaN(quantity) || quantity <= 0) {
			return fail(400, { error: 'Invalid form submission.' });
		}

		const productId = params.productId;
		if (!productId) {
			return fail(400, { error: 'Product ID is required.' });
		}
		
		const result = await db
			.select({ 
				price: product.price,
				quantity: product.quantity 
			})
			.from(product)
			.where(eq(product.id, productId))
			.limit(1);

		const productData = result[0];

		if (!productData) {
			return fail(404, { error: 'Product not found' });
		}

		if (productData.quantity < quantity) {
			return fail(400, { 
				error: `Insufficient stock. Only ${productData.quantity} items available.` 
			});
		}
		const existingCartItem = await db
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

		if (existingCartItem.length > 0) {
			await db
				.update(cart)
				.set({ 
					quantity: existingCartItem[0].quantity + quantity 
				})
				.where(eq(cart.id, existingCartItem[0].id));
		} else {
			await db.insert(cart).values({
				id: crypto.randomUUID(),
				userId,
				productId,
				variant,
				quantity,
				price: productData.price
			});
		}

		return { success: true };
	} catch (error) {
		console.error('Error adding to cart:', error);
		if (error instanceof Response) {
			throw error;
		}
		return fail(500, { error: 'Failed to add item to cart. Please try again.' });
	}
},

	buyNow: async ({ locals, request }) => {
	const userId = locals.user?.id;
	if (!userId) {
		throw redirect(303, '/login');
	}

	const form = await request.formData();
	const productId = form.get('productId') as string;
	const variant = form.get('variant') as string;
	const quantity = Number(form.get('quantity') || 1);
	const paymentMethod = form.get('paymentMethod') as string;

	if (!productId || !variant || isNaN(quantity) || quantity <= 0 || !paymentMethod) {
		return fail(400, { error: 'Invalid form submission.' });
	}

	if (!['Cash on Delivery', 'Paymongo Portal'].includes(paymentMethod)) {
		return fail(400, { error: 'Invalid payment method.' });
	}

	const productResult = await db
		.select({
			id: product.id,
			price: product.price,
			quantity: product.quantity
		})
		.from(product)
		.where(eq(product.id, productId))
		.limit(1);

	const productData = productResult[0];
	if (!productData) return fail(404, { error: 'Product not found' });

	if (productData.quantity < quantity) {
		return fail(400, {
			error: `Insufficient stock. Only ${productData.quantity} items available.`
		});
	}

	const userAddresses = await db
		.select()
		.from(address)
		.where(eq(address.userId, userId))
		.limit(1);

	if (!userAddresses.length) {
		return fail(400, {
			error: 'No shipping address found. Please add a shipping address first.'
		});
	}

	const defaultAddress = userAddresses[0];
	const totalAmount = parseFloat(productData.price) * quantity;
	const orderId = crypto.randomUUID();

	try {
		await db.insert(orders).values({
			id: orderId,
			userId,
			totalAmount,
			shippingAddress: defaultAddress.id,
			paymentMethod
		});

		await db.insert(order_items).values({
			id: crypto.randomUUID(),
			orderId,
			productId,
			totalAmount: totalAmount.toFixed(2),
			quantity
		});

		await db
			.update(product)
			.set({ quantity: productData.quantity - quantity })
			.where(eq(product.id, productId));

		return {
			success: true,
			message: 'Order placed successfully!',
			orderId
		};
	} catch (error) {
		console.error('Error placing order:', error);
		return fail(500, { error: 'Failed to place order. Please try again.' });
	}
}
};