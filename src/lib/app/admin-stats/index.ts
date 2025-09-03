export type AdminStats = {
  lguCount: number;
  productCount: number;
  orderCount: number;
};

export async function getAdminStats(fetchImpl: typeof fetch = fetch): Promise<AdminStats> {
  const res = await fetchImpl('/api/admin/stats');
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  const data = await res.json();
  return {
    lguCount: Number(data?.lguCount ?? 0),
    productCount: Number(data?.productCount ?? 0),  
    orderCount: Number(data?.orderCount ?? 0)
  };
}


