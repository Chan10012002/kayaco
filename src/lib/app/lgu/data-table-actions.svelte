<script lang="ts">
	import { Trash2Icon, LoaderCircle } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	// import UpdateLgu from './update-Lgu.svelte';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import { invalidate } from '$app/navigation';

	let { lguId, f_name } = $props();

	let alertDialogOpen = $state(false);
	let isLoading = $state(false);
	let open = $state(false);

	async function deleteLgu(lguId: string) {
		isLoading = true;
		const response = await fetch('/api/delete/lgu', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ lguId })
		});

		if (response.ok) {
			invalidate('refetch:lgu');
			toast.success('Lgu deleted successfully!');

			alertDialogOpen = false;
		} else {
			const errorMessage = await response.text();
			toast.error('Cant be deleted');
		}
		isLoading = false;
	}
</script>

<div class="flex justify-end text-end">
	{#if isLoading}
		<LoaderCircle class="mr-2 animate-spin" />
	{:else}
		<!-- <UpdateLgu
			{categoryId}
			{lguId}
			{Lgu_name}
			{description}
			{price}
			{quantity}
			{image_url}
		/> -->
	{/if}

	<Separator orientation="vertical" />

	<AlertDialog.Root bind:open={alertDialogOpen}>
		<AlertDialog.Trigger>
			<Button variant="ghost">
				<Trash2Icon class=" text-red-500" />
			</Button>
		</AlertDialog.Trigger>

		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title class="text-start text-xl font-semibold">
					Delete this Lgu?
				</AlertDialog.Title>
				<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
			</AlertDialog.Header>

			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => (alertDialogOpen = false)}>Cancel</AlertDialog.Cancel>
				<Button class="bg-red-400 text-white hover:bg-red-500 " onclick={() => deleteLgu(lguId)}>
					{#if isLoading}
						<LoaderCircle class="mr-2 animate-spin" /> Deleting...
					{:else}
						Delete Lgu
					{/if}
				</Button>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
