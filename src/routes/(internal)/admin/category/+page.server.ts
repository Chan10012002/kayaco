import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { categorySchema, updateCategorySchema } from '$lib/zod-schema';
import { eq } from 'drizzle-orm';
import db from '$lib/server/db';
import { category } from '$lib/server/db/schema';
import postgres from 'postgres';

export const load: PageServerLoad = async ({ depends }) => {
	depends('refetch:category');

	const categoryDetails = await db
		.select({
			id: category.id,
			category_name: category.category_name
		})
		.from(category)
		.orderBy(category.category_name);
	return {
		categoryDetails,
		form: await superValidate(zod(categorySchema))
	};
};

export const actions: Actions = {
	addCategory: async (event) => {
		const form = await superValidate(event, zod(categorySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { category_name } = form.data;

		try {
			await db.insert(category).values({
				id: crypto.randomUUID(),
				category_name
			});

			return { success: true };
		} catch (e) {
			if (e instanceof postgres.PostgresError && e.code === '23505') {
				return setError(form, 'category_name', 'Category already exists');
			}

			console.error('Database error:', e);
			return setError(form, '', 'Unable to add category');
		}
	},
	updateCategory: async (event) => {
		const form = await superValidate(event, zod(updateCategorySchema));

		if (!form.valid) {
			console.log('INVALID FORM');
			return fail(400, {
				form
			});
		}

		const { category_name, categoryId } = form.data;

		if (!categoryId || typeof categoryId !== 'string') {
			return new Response('Invalid category ID', { status: 400 });
		}

		try {
			const existingCategory = await db
				.select()
				.from(category)
				.where(eq(category.id, categoryId))
				.limit(1);

			if (existingCategory.length === 0) {
				return new Response('Category not found', { status: 404 });
			}

			await db
				.update(category)
				.set({
					category_name
				})
				.where(eq(category.id, categoryId));

			return new Response('Category updated successfully', { status: 200 });
		} catch (error) {
			console.error('Error updating category:', error);
			return new Response('Failed to update category', { status: 500 });
		}
	}
};
