<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input';
	import { buttonVariants, Button } from '$lib/components/ui/button';
	import { categorySchema } from '$lib/zod-schema';
	import { toast } from 'svelte-sonner';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import DataTable from '$lib/app/table/data-table.svelte';
	import { category } from '$lib/app/category/columns';
	import { invalidate } from '$app/navigation';
	import { LoaderCircle } from '@lucide/svelte';

	const form = superForm(defaults(zod(categorySchema)), {
		validators: zodClient(categorySchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Category cannot be added.');
				console.log(result);
			} else if (result.type === 'success') {
				invalidate('refetch:category');
				open = false;
				toast.success('Category added successfully!');
			}
		}
	});

	const { form: formData, enhance, submitting, submit } = form;

	let open = $state(false);

	let { data } = $props();

	let categoryDetails = $derived(data.categoryDetails);
</script>

<div class="w-full space-y-4 px-12">
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add Category</Dialog.Trigger>

		<Dialog.Content class="space-y-4">
			<Dialog.Header>
				<Dialog.Title>Add Category</Dialog.Title>
				<Dialog.Description>Enter the category name below.</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="?/addCategory">
				<Form.Field {form} name="category_name">
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} bind:value={$formData.category_name} placeholder="First Name" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Dialog.Footer class="mt-8 gap-4 md:gap-0">
					<Button variant="outline" disabled={$submitting} onclick={() => (open = false)}>
						Cancel
					</Button>
					<Form.Button class=" bg-primary" disabled={$submitting} onclick={() => submit()}>
						{#if $submitting}
							<LoaderCircle class="mr-1 size-4 animate-spin" /> Adding Category...
						{:else}
							Add Category
						{/if}
					</Form.Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>

	<div>
		<DataTable filterKey="category_name" columns={category} data={categoryDetails} />
	</div>
</div>
