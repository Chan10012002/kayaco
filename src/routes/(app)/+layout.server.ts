import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals.user as { email: string; id: string; role: string } | null;
	if (user) {
		switch (user.role) {
			case 'lgu':
				throw redirect(302, '/lgu/product');
			case 'admin':
				throw redirect(302, '/admin/lgu');
			case 'user':
				throw redirect(302, '/landingpage');
			default:
				throw redirect(302, '/login');
		}
	}
	return {};
};
