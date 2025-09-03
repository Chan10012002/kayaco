<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { lguSchema } from '$lib/zod-schema';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { writable } from 'svelte/store';
	import { Eye, EyeOff, Package, LoaderCircle } from '@lucide/svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import DataTable from '$lib/app/table/data-table.svelte';
	import { lgu } from '$lib/app/lgu/columns';
	import { invalidate } from '$app/navigation';

	const showConfirmPassword = writable(false);
	const showPassword = writable(false);

	const form = superForm(defaults(zod(lguSchema)), {
		validators: zodClient(lguSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Registration Unsuccessful.');
				console.log(result);
			} else if (result.type === 'success') {
				invalidate('refetch:lgu');
				open = false;
				toast.success('Lgu created successfully!');
			}
		}
	});

	let open = $state(false);

	let { data } = $props();

	let { lguUsers } = $derived(data);

	const { form: formData, enhance, submitting, submit } = form;
</script>

<div class="space-y-6 px-12">
	<!-- Header Section -->
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="rounded-lg border border-blue-500/30 bg-blue-500/20 p-2">
				<Package class="h-6 w-6 text-blue-400" />
			</div>
			<div class="">
				<h1 class="text-2xl font-bold text-black">Lgus</h1>
				<p class="text-black">Manage municipalities</p>
			</div>
		</div>
	</div>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add Lgu</Dialog.Trigger>

		<Dialog.Content class="space-y-4">
			<Dialog.Header>
				<Dialog.Title>Add Lgu</Dialog.Title>
				<Dialog.Description>Enter the Lgu info below</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="?/register" enctype="multipart/form-data">
				<div class="space-y-6 text-center">
					<Form.Field {form} name="f_name">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.f_name} placeholder="First Name" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="l_name">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.l_name} placeholder="Last Name" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.email} placeholder="Email" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="PhoneNo">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.PhoneNo} placeholder="Phone Number" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<div class="relative space-y-1.5">
									<div class="flex items-center">
										<Input
											{...props}
											class="w-full rounded-md bg-white/10 px-4 py-6 pr-10 text-black placeholder-white/70 transition duration-300"
											placeholder="Password"
											type={$showPassword ? 'text' : 'password'}
											bind:value={$formData.password}
										/>
										<button
											type="button"
											class="absolute right-2 z-10 text-gray-300 hover:text-white"
											onclick={() => showPassword.set(!$showPassword)}
										>
											{#if $showPassword}
												<Eye size={20} class="text-black" />
											{:else}
												<EyeOff size={20} class="text-black" />
											{/if}
										</button>
									</div>

									<Form.FieldErrors />
								</div>
							{/snippet}
						</Form.Control>
					</Form.Field>

					<Form.Field {form} name="confirmPassword">
						<Form.Control>
							{#snippet children({ props })}
								<div class="relative space-y-1.5">
									<div class="flex items-center">
										<Input
											{...props}
											class="w-full rounded-md bg-white/10 px-4 py-6 pr-10 text-black placeholder-white/70 transition duration-300"
											placeholder="Confirm Password"
											type={$showConfirmPassword ? 'text' : 'password'}
											bind:value={$formData.confirmPassword}
										/>
										<button
											type="button"
											class="absolute right-2 z-10 text-gray-300 hover:text-white"
											onclick={() => showConfirmPassword.set(!$showConfirmPassword)}
										>
											{#if $showConfirmPassword}
												<Eye size={20} class="text-black" />
											{:else}
												<EyeOff size={20} class="text-black" />
											{/if}
										</button>
									</div>
									<Form.FieldErrors />
								</div>
							{/snippet}
						</Form.Control>
					</Form.Field>

					<Form.Field {form} name="image_url">
						<Form.Control>
							{#snippet children({ props })}
								<Input
									placeholder="Enter Lgu Image"
									type="file"
									{...props}
									bind:value={$formData.image_url}
								/>
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
								<LoaderCircle class="mr-1 size-4 animate-spin" /> Creating Lgu...
							{:else}
								Create Lgu
							{/if}
						</Form.Button>
					</Dialog.Footer>
				</div>
			</form>
		</Dialog.Content>
	</Dialog.Root>

	<div>
		<DataTable filterKey="f_name" columns={lgu} data={lguUsers} />
	</div>
</div>
