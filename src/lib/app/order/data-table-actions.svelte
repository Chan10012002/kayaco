<script lang="ts">
	import { Trash2Icon, LoaderCircle, Eye, Edit } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import UpdateOrder from './update-order.svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import { invalidate } from '$app/navigation';

	type Props = {
		orderId: string;
		status: 'Pending' | 'Processing' | 'Completed' | 'Delivered' | 'Cancelled';
		customer_name: string;
		totalAmount: string;
		orderdate: Date;
		full_address: string;
	};

	let { orderId, status, customer_name, totalAmount, orderdate, full_address }: Props = $props();

	let alertDialogOpen = $state(false);
	let isLoading = $state(false);

	async function deleteOrder(orderId: string) {
		isLoading = true;
		try {
			const response = await fetch('/api/delete/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ orderId })
			});

			if (response.ok) {
				invalidate('refetch:orders');
				toast.success('Order deleted successfully!');
				alertDialogOpen = false;
			} else {
				const errorMessage = await response.text();
				toast.error('Order cannot be deleted');
			}
		} catch (error) {
			console.error('Error deleting order:', error);
			toast.error('An error occurred while deleting the order');
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex justify-end text-end">
	{#if isLoading}
		<LoaderCircle class="mr-2 animate-spin" />
	{:else}
		<Button variant="ghost" onclick={() => window.location.href = `/admin/orders/${orderId}`}>
			<Eye class="text-blue-500" />
		</Button>

		<Separator orientation="vertical" />

		<UpdateOrder
			{orderId}
			{status}
			{customer_name}
			{totalAmount}
			{orderdate}
			{full_address}
		/>

		<Separator orientation="vertical" />

		<AlertDialog.Root bind:open={alertDialogOpen}>
			<AlertDialog.Trigger>
				<Button variant="ghost">
					<Trash2Icon class="text-red-500" />
				</Button>
			</AlertDialog.Trigger>

			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title class="text-start text-xl font-semibold">
						Delete this order?
					</AlertDialog.Title>
					<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
				</AlertDialog.Header>

				<AlertDialog.Footer>
					<AlertDialog.Cancel onclick={() => (alertDialogOpen = false)}>Cancel</AlertDialog.Cancel>
					<Button
						class="bg-red-400 text-white hover:bg-red-500"
						onclick={() => deleteOrder(orderId)}
						disabled={isLoading}
					>
						{#if isLoading}
							<LoaderCircle class="mr-2 animate-spin" /> Deleting...
						{:else}
							Delete Order
						{/if}
					</Button>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}
</div>