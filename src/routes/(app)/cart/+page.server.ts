import { db } from '$lib/server/db';
import { cart, orders, order_items, product, address } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { Actions, PageServerLoad } from './$types';
import { paymentMethod as paymentMethodEnum } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals, depends }) => {
	const userId = locals.user?.id;

	if (!userId) {
		throw redirect(303, '/login');
	}
	depends('app:cart');
	const cartItems = await db
		.select({
			cartId: cart.id,
			productId: product.id,
			name: product.product_name,
			price: cart.price,
			quantity: cart.quantity,
			image: product.image_url
		})
		.from(cart)
		.leftJoin(product, eq(cart.productId, product.id))
		.where(eq(cart.userId, userId));

	const userAddresses = await db
		.select({
			id: address.id,
			house_num: address.house_num,
			street: address.street,
			city: address.city,
			province: address.province,
			zip: address.zip
		})
		.from(address)
		.where(eq(address.userId, userId));

	const paymentMethods = Object.values(paymentMethodEnum.enumValues || ['Cash on Delivery', 'Paymongo Portal']);
	
	return {
		cartItems,
		paymentMethods,
		userAddresses
	};
};

export const actions: Actions = {
	updateQuantity: async ({ request, locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');
		const form = await request.formData();
		const cartId = form.get('cartId')?.toString();
		const quantityStr = form.get('quantity')?.toString();
		if (!cartId || !quantityStr) {
			return fail(400, { error: 'Missing cart ID or quantity' });
		}
		const quantity = Number(quantityStr);
		if (isNaN(quantity) || quantity < 1) {
			return fail(400, { error: 'Invalid quantity' });
		}
		try {
			await db
				.update(cart)
				.set({ quantity })
				.where(and(eq(cart.id, cartId), eq(cart.userId, userId)));

			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to update quantity' });
		}
	},

	deleteItem: async ({ request, locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');

		const form = await request.formData();
		const cartId = form.get('cartId')?.toString();
		if (!cartId) {
			return fail(400, { error: 'Missing cart ID' });
		}
		try {
			await db.delete(cart).where(and(eq(cart.id, cartId), eq(cart.userId, userId)));
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to delete item' });
		}
	},

	clearCart: async ({ locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');

		try {
			await db.delete(cart).where(eq(cart.userId, userId));
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to clear cart' });
		}
	},

	placeOrder: async ({ request, locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');

		const form = await request.formData();
		const addressId = form.get('addressId')?.toString();
		const payment = form.get('paymentMethod')?.toString();
		
		if (!addressId || !payment) {
			return fail(400, { error: 'Missing address or payment method' });
		}
		try {
			const userAddress = await db
				.select({ id: address.id })
				.from(address)
				.where(and(eq(address.id, addressId), eq(address.userId, userId)))
				.limit(1);

			if (!userAddress.length) {
				return fail(400, { error: 'Invalid address selected' });
			}

			const cartItems = await db
				.select({
					productId: cart.productId,
					quantity: cart.quantity,
					price: cart.price
				})
				.from(cart)
				.where(eq(cart.userId, userId));

			if (!cartItems.length) return fail(400, { error: 'Cart is empty' });
			
			for (const item of cartItems) {
				const productRow = await db
					.select({ quantity: product.quantity })
					.from(product)
					.where(eq(product.id, item.productId))
					.limit(1);

				const available = productRow[0]?.quantity ?? 0;
				if (available < item.quantity) {
					return fail(400, {
						error: `Insufficient stock for a product in your cart. Available: ${available}`
					});
				}
			}

			const total = cartItems.reduce(
				(sum, item) => sum + Number(item.price) * item.quantity,
				0
			);

			const orderId = uuidv4();

			await db.insert(orders).values({
				id: orderId,
				userId,
				totalAmount: total.toFixed(2),
				status: 'Pending',
				shippingAddress: addressId,
				paymentMethod: payment
			});

			for (const item of cartItems) {
				await db.insert(order_items).values({
					id: uuidv4(),
					orderId,
					productId: item.productId,
					quantity: item.quantity,
					totalAmount: (Number(item.price) * item.quantity).toFixed(2)
				});

				// Deduct inventory
				const currentProduct = await db
					.select({ quantity: product.quantity })
					.from(product)
					.where(eq(product.id, item.productId))
					.limit(1);

				const newQuantity = currentProduct[0].quantity - item.quantity;

				await db
					.update(product)
					.set({ quantity: newQuantity })
					.where(eq(product.id, item.productId));
			}

			await db.delete(cart).where(eq(cart.userId, userId));

			return { success: true, orderId };
		} catch (err) {
			console.error('Order placement error:', err);
			return fail(500, { error: 'Failed to place order' });
		}
	}
};