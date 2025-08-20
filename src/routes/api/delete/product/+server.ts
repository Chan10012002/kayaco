import db from '$lib/server/db';
import { product, cart, cartItem } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const { productId } = await request.json();

	const existingproduct = await db.select().from(product).where(eq(product.id, productId)).limit(1);

	if (existingproduct.length === 0) {
		return new Response('product not found', { status: 404 });
	}

	await db.delete(cartItem).where(eq(cartItem.productId, productId));

	await db.delete(cart).where(eq(cart.productId, productId));

	await db.delete(product).where(eq(product.id, productId));

	return new Response('product deleted successfully', { status: 200 });
}
