import db from '$lib/server/db';
import { category } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const { categoryId } = await request.json();

	const existingCategory = await db
		.select()
		.from(category)
		.where(eq(category.id, categoryId))
		.limit(1);

	if (existingCategory.length === 0) {
		return new Response('Category not found', { status: 404 });
	}

	await db.delete(category).where(eq(category.id, categoryId));

	return new Response('Category deleted successfully', { status: 200 });
}
