import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import ProductImageCell from './image-cell.svelte';
import DataTableActions from './data-table-actions.svelte';

export type Lgu = {
	id: string;
	f_name: string;
	image_url: string | null;
};

export const lgu: ColumnDef<Lgu>[] = [
	{
		accessorKey: 'f_name',
		header: 'Municipality'
	},
	{
		accessorKey: 'image_url',
		header: 'Image',
		cell: ({ row }) => {
			return renderComponent(ProductImageCell, {
				imageUrl: row.original.image_url,
				productName: row.original.f_name
			});
		}
	},

	{
		accessorKey: 'id',
		header: '',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				lguId: row.original.id,
				f_name: row.original.f_name
			});
		}
	},
	
];
