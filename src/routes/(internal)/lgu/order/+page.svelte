<script lang="ts">
	import { ShoppingCart } from '@lucide/svelte';
	import DataTable from '$lib/app/table/data-table.svelte';
	import { order } from '$lib/app/order/columns';
  
	type PageData = {
		orders: Array<{
			shippingAddressId: any;
			id: string;
			customer_name: string;
			customer_email: string;
			totalAmount: string;
			status: 'Pending' | 'Processing' | 'Completed' | 'Delivered' | 'Cancelled';
			orderdate: Date;
			full_address: string;
			items: Array<{
				id: string;
				productId: string;
				quantity: number;
				totalAmount: string;
				product_name: string;
				unit_price: string;
			}>;
		}>;
	};

	let { data }: { data: PageData } = $props();
	let { orders } = data;

	const transformedOrders = orders.map((order) => ({
        id: order.id,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        totalAmount: order.totalAmount,
        status: order.status,
        orderdate: order.orderdate,
        full_address: order.full_address,
        itemCount: order.items?.length || 0,
        mainProduct: order.items?.[0]?.product_name || 'Multiple items',
        shippingAddressId: order.shippingAddressId
    }));


	const totalOrders = $derived(orders.length);
	const pendingOrders = $derived(orders.filter(o => o.status === 'Pending').length);
	const processingOrders = $derived(orders.filter(o => o.status === 'Processing').length);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
				<ShoppingCart class="w-6 h-6 text-green-400" />
			</div>
			<div>
				<h1 class="text-2xl font-bold text-black">Order Management</h1>
				<p class="text-black">View and manage customer orders</p>
			</div>
		</div>
		
		<div class="flex gap-4">
			<div class="text-center">
				<div class="text-2xl font-bold text-green-600">{totalOrders}</div>
				<div class="text-sm text-gray-600">Total Orders</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-blue-600">{pendingOrders}</div>
				<div class="text-sm text-gray-600">Pending</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-orange-600">{processingOrders}</div>
				<div class="text-sm text-gray-600">Processing</div>
			</div>
		</div>
	</div>

	<div>
		<DataTable filterKey="customer_name" columns={order} data={transformedOrders} />
	</div>

	{#if orders.length === 0}
		<div class="text-center py-12">
			<ShoppingCart class="w-16 h-16 text-gray-400 mx-auto mb-4" />
			<h3 class="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
			<p class="text-gray-500">Orders will appear here once customers start placing them.</p>
		</div>
	{/if}
</div>