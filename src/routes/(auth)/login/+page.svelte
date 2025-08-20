<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { loginSchema } from '$lib/zod-schema';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { writable } from 'svelte/store';
	import { Eye, EyeOff } from '@lucide/svelte';

	const showPassword = writable(false);

	const form = superForm(defaults(zod(loginSchema)), {
		validators: zodClient(loginSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Wrong email or password.');
			} else if (result.type === 'success') {
				toast.success('Login successful!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<div class="container relative mt-12 flex-col items-center justify-center lg:mt-24 border rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md p-6 max-w-5xl">
	<div class="flex flex-col-reverse lg:flex-row h-full w-full items-center justify-center">
		<div class="flex w-full max-w-md flex-col justify-center mx-auto space-y-6 lg:mx-0 lg:w-1/2">
			<form method="POST" use:enhance action="?/login">
				<div class="space-y-6 text-center">
					<div class="space-y-2">
						<div class="text-4xl font-bold">Login</div>
						<div class="text-muted-foreground">Enter your account details</div>
					</div>
					<div class="space-y-4">
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Input {...props} bind:value={$formData.email} placeholder="Email" />
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
												on:click={() => showPassword.set(!$showPassword)}
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
					</div>
					<Form.Button class="w-full bg-blue-500 hover:bg-blue-400">Login</Form.Button>
					<Button variant="outline" class="w-full" href="/register">Register</Button>
				</div>
			</form>
		</div>
		<div class="hidden lg:flex lg:w-1/2 h-full items-center justify-end pl-8">
			<div class="w-full h-[500px] max-w-lg rounded-2xl overflow-hidden border border-gray-200 shadow-lg flex items-center">
				<img 
					src="/img/k-mart.jpg" 
					alt="orange" 
					class="object-cover w-full h-full"
				/>
			</div>
		</div>
	</div>
</div>
