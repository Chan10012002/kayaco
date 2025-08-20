// src/routes/api/delete-user/+server.ts

import db from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const { lguId } = await request.json();

	if (!lguId) {
		return new Response('Missing lguId', { status: 400 });
	}

	// Optional: Check if user exists
	const existingUser = await db.select().from(user).where(eq(user.id, lguId)).limit(1);
	if (existingUser.length === 0) {
		return new Response('User not found', { status: 404 });
	}

	// Delete the user
	await db.delete(user).where(eq(user.id, lguId));

	return new Response('User deleted successfully', { status: 200 });
}
