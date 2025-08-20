<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { updateOrderSchema } from '$lib/zod-schema';
	import { toast } from 'svelte-sonner';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { invalidate } from '$app/navigation';
	import { Pencil, LoaderCircle } from '@lucide/svelte';
	import { buttonVariants, Button } from '$lib/components/ui/button';

	type Props = {
		orderId: string;
		status: 'Pending' | 'Processing' | 'Completed' | 'Delivered' | 'Cancelled';
		customer_name: string;
		totalAmount: string;
		orderdate: Date;
		full_address: string;
	};

	let { orderId, status, customer_name, totalAmount, orderdate, full_address }: Props = $props();

	const form = superForm(defaults(zod(updateOrderSchema)), {
		validators: zodClient(updateOrderSchema),
		resetForm: false,
		async onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Order cannot be updated.');
				console.log(result);
			} else {
				invalidate('refetch:orders');
				open = false;
				toast.success('Order updated successfully!');
			}
		}
	});

	const { form: formData, enhance, submit, submitting } = form;

	let open = $state(false);
	let currentStatus = $state(status);
	let currentTotalAmount = $state(totalAmount);
	let currentShippingAddress = $state(full_address);
	let currentNotes = $state('');

	const statusOptions = [
		{ value: 'Pending', label: 'Pending' },
		{ value: 'Processing', label: 'Processing' },
		{ value: 'Completed', label: 'Completed' },
		{ value: 'Delivered', label: 'Delivered' },
		{ value: 'Cancelled', label: 'Cancelled' }
	];
</script>

<div class="w-full space-y-4">
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}><Pencil /></Dialog.Trigger>

		<Dialog.Content class="space-y-4 max-w-2xl">
			<Dialog.Header>
				<Dialog.Title>Edit Order</Dialog.Title>
				<Dialog.Description>Update order details for {customer_name}</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="?/updateOrder" class="w-full space-y-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Form.Field {form} name="status">
						<Form.Control>
							{#snippet children({ props })}
								<Label>Order Status</Label>
								<Select.Root type="single" name="status" bind:value={currentStatus}>
									<Select.Trigger class="w-full">
										{currentStatus || 'Select status'}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											{#each statusOptions as option}
												<Select.Item value={option.value} label={option.label}>
													{option.label}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="totalAmount">
						<Form.Control>
							{#snippet children({ props })}
								<Label>Total Amount</Label>
								<Input 
									{...props}
									bind:value={currentTotalAmount}
									placeholder="0.00" 
									type="number" 
									step="0.01" 
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<div class="space-y-2">
						<Label>Customer Name</Label>
						<Input value={customer_name} disabled class="bg-gray-50" />
					</div>

					<div class="space-y-2">
						<Label>Order Date</Label>
						<Input 
							value={new Date(orderdate).toLocaleDateString('en-PH')} 
							disabled 
							class="bg-gray-50" 
						/>
					</div>

					<div class="md:col-span-2">
						<Form.Field {form} name="shippingAddress">
							<Form.Control>
								{#snippet children({ props })}
									<Label>Shipping Address</Label>
									<Textarea 
										{...props}
										bind:value={currentShippingAddress}
										placeholder="Enter shipping address" 
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>

					<div class="md:col-span-2">
						<Form.Field {form} name="notes">
							<Form.Control>
								{#snippet children({ props })}
									<Label>Order Notes (Optional)</Label>
									<Textarea 
										{...props}
										bind:value={currentNotes}
										placeholder="Add any notes about this order..." 
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>

				<Input type="hidden" name="orderId" value={orderId} />

				<Dialog.Footer class="mt-8 gap-4 md:gap-0">
					<Button variant="outline" disabled={$submitting} onclick={() => (open = false)}>
						Cancel
					</Button>
					<Form.Button class="bg-primary" disabled={$submitting} onclick={() => submit()}>
						{#if $submitting}
							<LoaderCircle class="mr-1 size-4 animate-spin" /> Updating Order...
						{:else}
							Update Order
						{/if}
					</Form.Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>