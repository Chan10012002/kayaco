import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { lguSchema } from '$lib/zod-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import db from '$lib/server/db/index.js';
import postgres from 'postgres';
import { user } from '$lib/server/db/schema.js';
import { createClient } from '@supabase/supabase-js';
import { eq } from 'drizzle-orm';

let supabase: ReturnType<typeof createClient> | null = null;
let supabaseUrl: string | undefined;
let supabaseKey: string | undefined;

function getSupabase() {
	if (!supabase) {
		supabaseUrl = process.env.SUPABASE_URL;
		supabaseKey = process.env.SUPABASE_SERVICE_KEY;
		if (!supabaseUrl || !supabaseKey) {
			return null;
		}
		supabase = createClient(supabaseUrl, supabaseKey);
	}
	return supabase;
}

export const load: PageServerLoad = async ({ depends }) => {
	depends('refetch:lgu');
	const lguUsers = await db
		.select({
			id: user.id,
			email: user.email,
			f_name: user.f_name,
			l_name: user.l_name,
			image_url: user.image_url
		})
		.from(user)
		.where(eq(user.role, 'lgu'));
	return {
		loginForm: await superValidate(zod(lguSchema)),
		lguUsers
	};
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(lguSchema));

		if (!form.valid) {
			console.log('INVALID FORM');
			return fail(400, {
				form
			});
		}

		const { f_name, l_name, email, PhoneNo, password, confirmPassword, image_url } = form.data;

		const userId = crypto.randomUUID();

		if (password !== confirmPassword) {
			return setError(form, 'confirmPassword', 'Passwords do not match');
		}

		const hashedPassword = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const productThumbnailFolder = 'product-photos/';
		let imgUrl = null;
		if (image_url && image_url.size > 0) {
			const supabaseClient = getSupabase();
			if (!supabaseClient || !supabaseUrl) {
				return setError(form, 'image_url', 'Image upload service is not configured');
			}
			const fileName = `${productThumbnailFolder}${Date.now()}-${image_url.name}`;
			const { data, error } = await supabaseClient.storage
				.from('kayaco')
				.upload(fileName, image_url, { cacheControl: '3600', upsert: false });

			if (error) {
				return setError(form, 'image_url', 'Error uploading image');
			}

			imgUrl = `${supabaseUrl}/storage/v1/object/public/kayaco/${data.path}`;
		}

		try {
			await db.insert(user).values({
				id: userId,
				f_name,
				l_name,
				email,
				phone: PhoneNo,
				hashedPassword,
				role: 'lgu',
				image_url: imgUrl ?? null
			});

		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				if (e.constraint_name === 'auth_user_email_unique') {
					return setError(form, 'email', 'Email already taken');
				}
			}
			console.error(e);
			return setError(form, '', 'Unable to create account');
		}
	}
};
