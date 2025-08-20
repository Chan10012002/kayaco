<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input';
	import { updateCategorySchema } from '$lib/zod-schema';
	import { toast } from 'svelte-sonner';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { invalidate } from '$app/navigation';
	import { Pencil, LoaderCircle } from '@lucide/svelte';
	import { buttonVariants, Button } from '$lib/components/ui/button';

	type Props = {
		categoryId: string;
		category_name: string;
	};

	let { categoryId, category_name }: Props = $props();

	const form = superForm(defaults(zod(updateCategorySchema)), {
		validators: zodClient(updateCategorySchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Category cannot be updated.');
				console.log(result);
			} else {
				invalidate('refetch:category');
				open = false;
				toast.success('Category updated successfully!');
			}
		}
	});

	const { form: formData, enhance, submit, submitting } = form;

	let open = $state(false);
</script>

<div class="w-full space-y-4">
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}><Pencil /></Dialog.Trigger>

		<Dialog.Content class="space-y-4">
			<Dialog.Header>
				<Dialog.Title>Edit Category</Dialog.Title>
				<Dialog.Description>Enter the category name below.</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="?/updateCategory">
				<Form.Field {form} name="category_name">
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} bind:value={category_name} placeholder="First Name" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Input type="hidden" name="categoryId" value={categoryId} />
				<Dialog.Footer class="mt-8 gap-4 md:gap-0">
					<Button variant="outline" disabled={$submitting} onclick={() => (open = false)}>
						Cancel
					</Button>
					<Form.Button class=" bg-primary" disabled={$submitting} onclick={() => submit()}>
						{#if $submitting}
							<LoaderCircle class="mr-1 size-4 animate-spin" /> Updating Category...
						{:else}
							Update Category
						{/if}
					</Form.Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>
