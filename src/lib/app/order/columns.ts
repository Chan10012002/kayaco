import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';

export type Order = {
	id: string;
	customer_name: string;
	customer_email: string;
	totalAmount: string;
	status: 'Pending' | 'Processing' | 'Completed' | 'Delivered' | 'Cancelled';
	orderdate: Date;
	full_address: string;
	itemCount: number;
	mainProduct: string;
};

export const order: ColumnDef<Order>[] = [
	{
		accessorKey: 'id',
		header: 'Order ID',
		cell: ({ row }) => {
			return `#${row.original.id.slice(-8)}`;
		}
	},
	{
		accessorKey: 'customer_name',
		header: 'Customer Name'
	},
	{
		accessorKey: 'customer_email',
		header: 'Email'
	},
	{
		accessorKey: 'totalAmount',
		header: 'Total Amount',
		cell: ({ row }) => {
			const amount = parseFloat(row.original.totalAmount);
			return new Intl.NumberFormat('en-PH', {
				style: 'currency',
				currency: 'PHP'
			}).format(amount);
		}
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status;
			const statusColors = {
				'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
				'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
				'Completed': 'bg-green-100 text-green-800 border-green-200',
				'Delivered': 'bg-purple-100 text-purple-800 border-purple-200',
				'Cancelled': 'bg-red-100 text-red-800 border-red-200'
			};
			
			return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}">${status}</span>`;
		}
	},
	{
		accessorKey: 'itemCount',
		header: 'Items',
		cell: ({ row }) => {
			const count = row.original.itemCount;
			return `${count} item${count > 1 ? 's' : ''}`;
		}
	},
	{
		accessorKey: 'mainProduct',
		header: 'Products'
	},
	{
		accessorKey: 'orderdate',
		header: 'Order Date',
		cell: ({ row }) => {
			const date = new Date(row.original.orderdate);
			return date.toLocaleDateString('en-PH', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		}
	},
	{
		accessorKey: 'full_address',
		header: 'Shipping Address',
		cell: ({ row }) => {
			const address = row.original.full_address;
			return address.length > 30 ? `${address.substring(0, 30)}...` : address;
		}
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				orderId: row.original.id,
				status: row.original.status,
				customer_name: row.original.customer_name,
				totalAmount: row.original.totalAmount,
				orderdate: row.original.orderdate,
				full_address: row.original.full_address
			});
		}
	}
];