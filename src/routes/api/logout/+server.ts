import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, locals }) => {
	const sessionToken = cookies.get(auth.sessionCookieName);
	
	if (sessionToken && locals.session) {
		await auth.invalidateSession(locals.session.id);
	}
	
	auth.deleteSessionTokenCookie({ cookies } as any);
	
	throw redirect(302, '/');
};

