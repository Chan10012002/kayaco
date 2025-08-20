<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { invalidate } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { updateProductSchema } from '$lib/zod-schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient, zod } from 'sveltekit-superforms/adapters';
	import { Label } from '$lib/components/ui/label';
	import { LoaderCircle, Pencil } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { defaults } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';

	type Props = {
		productId: string;
		categoryId: string;
		product_name: string;
		description: string;
		lguId: string;
		price: string;
		quantity: number;
		image_url: string | null;
	};

	let {
		productId,
		categoryId,
		product_name,
		description,
		price,
		quantity,
		image_url,
		lguId
	}: Props = $props();

	const form = superForm(defaults(zod(updateProductSchema)), {
		validators: zodClient(updateProductSchema),
		resetForm: false,
		async onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Failed to create product.');
			} else {
				toast.success('Product created successfully!');
				open = false;
				invalidate('refetch:product');
			}
		}
	});

	const { form: formData, enhance, submitting, submit } = form;

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}><Pencil /></Dialog.Trigger>

	<Dialog.Content class="space-y-4">
		<Dialog.Header>
			<Dialog.Title>Edit Product</Dialog.Title>
			<Dialog.Description>Enter the product info below</Dialog.Description>
		</Dialog.Header>

		<form
			method="POST"
			action="?/updateProduct"
			use:enhance
			class="w-full gap-y-12 space-y-6"
			enctype="multipart/form-data"
		>
			<div class="space-y-4">
				<Form.Field {form} name="categoryId">
					<Form.Control>
						{#snippet children({ props })}
							<Select.Root type="single" name="categoryId" bind:value={categoryId}>
								<Select.Trigger class="w-full rounded border border-gray-300 p-2">
									{#if categoryId}
										{#each $page.data.categories as cat (cat.id)}
											{#if cat.id === categoryId}
												{cat.category_name}
											{/if}
										{/each}
									{:else}
										Select a category
									{/if}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each $page.data.categories as cat (cat.id)}
											<Select.Item value={cat.id} label={cat.category_name}>
												{cat.category_name}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="lguId">
					<Form.Control>
						{#snippet children({ props })}
							<Select.Root type="single" name="lguId" bind:value={lguId}>
								<Select.Trigger class="w-full rounded border border-gray-300 p-2">
									{#if lguId}
										{#each $page.data.municipality as cat (cat.id)}
											{#if cat.id === lguId}
												{cat.f_name}
											{/if}
										{/each}
									{:else}
										Select a municipality
									{/if}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each $page.data.municipality as cat (cat.id)}
											<Select.Item value={cat.id} label={cat.f_name}>
												{cat.f_name}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="product_name">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								placeholder="Enter Product Name"
								type="text"
								{...props}
								bind:value={product_name}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								placeholder="Enter Product Description"
								type="text"
								{...props}
								bind:value={description}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="price">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								placeholder="Enter Product Price"
								type="number"
								{...props}
								bind:value={price}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="quantity">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								placeholder="Enter Product Quantity"
								type="number"
								{...props}
								bind:value={quantity}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="image_url">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								placeholder="Enter Product Image"
								type="file"
								{...props}
								bind:value={image_url}
								accept="image/*"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Input name="productId" value={productId} />

			<Dialog.Footer class="mt-8 gap-4 md:gap-0">
				<Button variant="outline" disabled={$submitting} onclick={() => (open = false)}>
					Cancel
				</Button>
				<Form.Button class=" bg-primary" disabled={$submitting} onclick={() => submit()}>
					{#if $submitting}
						<LoaderCircle class="mr-1 size-4 animate-spin" /> Updating Product...
					{:else}
						Update Product
					{/if}
				</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
