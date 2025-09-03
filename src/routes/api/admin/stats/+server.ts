import type { RequestHandler } from './$types';
import db from '$lib/server/db';
import { user, product, orders } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
  try {
    const [{ value: lguCount }] = await db
      .select({ value: sql<number>`count(${user.id})` })
      .from(user)
      .where(eq(user.role, 'lgu'))
      .execute();

    const [{ value: productCount }] = await db
      .select({ value: sql<number>`count(${product.id})` })
      .from(product)
      .execute();

    const [{ value: orderCount }] = await db
      .select({ value: sql<number>`count(${orders.id})` })
      .from(orders)
      .execute();

    return new Response(
      JSON.stringify({
        lguCount: Number(lguCount ?? 0),
        productCount: Number(productCount ?? 0),
        orderCount: Number(orderCount ?? 0)
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to fetch admin stats' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};


