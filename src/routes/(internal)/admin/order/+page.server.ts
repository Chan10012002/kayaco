import { fail } from '@sveltejs/kit';
import { orders, order_items, product, user, address } from '$lib/server/db/schema';
import db from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { updateOrderSchema } from '$lib/zod-schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
	
	const ordersData = await db
		.select({
			id: orders.id,
			userId: orders.userId,
			totalAmount: orders.totalAmount,
			status: orders.status,
			shippingAddress: orders.shippingAddress,
			orderdate: orders.orderdate,
			user_fname: user.f_name,
			user_lname: user.l_name,
			customer_email: user.email,
			house_num: address.house_num,
			city: address.city,
			province: address.province
		})
		.from(orders)
		.leftJoin(user, eq(orders.userId, user.id))
		.leftJoin(address, eq(orders.shippingAddress, address.id))
		.execute();

	const ordersWithItems = await Promise.all(
		ordersData.map(async (order) => {
			const items = await db
				.select({
					id: order_items.id,
					productId: order_items.productId,
					quantity: order_items.quantity,
					totalAmount: order_items.totalAmount,
					product_name: product.product_name,
					unit_price: product.price
				})
				.from(order_items)
				.leftJoin(product, eq(order_items.productId, product.id))
				.where(eq(order_items.orderId, order.id))
				.execute();

			return {
				...order,
				items,
				customer_name: `${order.user_fname || ''} ${order.user_lname || ''}`.trim(),
				full_address: `${order.house_num || ''} ${order.city || ''} ${order.province || ''}`.trim()
			};
		})
	);

	return {
		orders: ordersWithItems
	};
}

export const actions = {
	updateOrder: async ({ request }) => {
		const form = await superValidate(request, zod(updateOrderSchema));
		
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { orderId, status, totalAmount, shippingAddress, notes } = form.data;
			const validStatuses = ['Pending', 'Processing', 'Completed', 'Delivered', 'Cancelled'];
			if (!validStatuses.includes(status)) {
				return fail(400, { form, message: 'Invalid status value.' });
			}

			await db
				.update(orders)
				.set({ 
					status: status as any,
					totalAmount: totalAmount?.toString(),
					shippingAddress: shippingAddress,
				})
				.where(eq(orders.id, orderId));

			return { form, success: true };
		} catch (error) {
			console.error('Error updating order:', error);
			return fail(500, { form, message: 'Internal Server Error' });
		}
	}
};