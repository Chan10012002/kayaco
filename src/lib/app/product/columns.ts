import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import ProductImageCell from './image-cell.svelte';
import DataTableActions from './data-table-actions.svelte';

export type Product = {
	id: string;
	categoryId: string;
	product_name: string;
	description: string;
	price: string;
	quantity: number;
	image_url: string | null;
	lguId: string;
};

export const product: ColumnDef<Product>[] = [
	{
		accessorKey: 'product_name',
		header: 'Product Name'
	},
	{
		accessorKey: 'description',
		header: 'Description'
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'));
			return new Intl.NumberFormat('en-PH', {
				style: 'currency',
				currency: 'PHP'
			}).format(price);
		}
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: ({ row }) => {
			const quantity = row.getValue('quantity') as number;
			return quantity.toString();
		}
	},
	{
		accessorKey: 'image_url',
		header: 'Image',
		cell: ({ row }) => {
			return renderComponent(ProductImageCell, {
				imageUrl: row.original.image_url,
				productName: row.original.product_name
			});
		}
	},

	{
		accessorKey: 'id',
		header: '',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				productId: row.original.id,
				product_name: row.original.product_name,
				// image_url: row.original.image_url,
				categoryId: row.original.categoryId,
				quantity: row.original.quantity,
				price: row.original.price,
				description: row.original.description,
				lguId: row.original.lguId
			});
		}
	}
];
