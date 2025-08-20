import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';

export type Category = {
	id: string;
	category_name: string;
};

export const category: ColumnDef<Category>[] = [
	{
		accessorKey: 'category_name',
		header: 'Category Name'
	},

	{
		accessorKey: 'id',
		header: '',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				categoryId: row.original.id,
				category_name: row.original.category_name
			});
		}
	}
];
