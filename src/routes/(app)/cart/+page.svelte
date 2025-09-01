<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { X } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast, Toaster } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	export let data: {
		cartItems: any;
		paymentMethods: string[];
		userAddresses: any[]; // Add this to your data type
	};
	let isBuyingNow = false;
	let { paymentMethods, userAddresses } = data;
	$: cartItems = data.cartItems;
	$: total = cartItems
		.reduce((sum: number, item: { price: any; quantity: number; }) => sum + Number(item.price) * item.quantity, 0)
		.toFixed(2);
	
	function updateLocalQuantity(cartId: string, newQuantity: number) {
		cartItems = cartItems.map((item: { cartId: string; }) => 
			item.cartId === cartId ? { ...item, quantity: newQuantity } : item
		);
	}
	
	async function updateQuantity(cartId: string, newQuantity: number) {
		if (newQuantity < 1) return;
		const originalItems = [...cartItems];
		updateLocalQuantity(cartId, newQuantity);
		try {
			const formData = new FormData();
			formData.append('cartId', cartId);
			formData.append('quantity', newQuantity.toString());

			const res = await fetch('?/updateQuantity', {
				method: 'POST',
				body: formData
			});
			if (res.ok) {
				await invalidateAll();
			} else {
				cartItems = originalItems;
				console.error('Failed to update quantity');
			}
		} catch (error) {
			cartItems = originalItems;
			console.error('Error updating quantity:', error);
		}
	}
</script>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8 max-w-5xl">
		<div class="bg-white rounded-2xl shadow-xl overflow-hidden">
			<div class="p-6 sm:p-8">
				<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

				{#if cartItems.length === 0}
					<div class="text-center py-12">
						<p class="text-gray-500 text-lg">Your cart is empty.</p>
						<Button 
							href="/kmart"
							class="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
						>
							Continue Shopping
						</Button>
					</div>
				{:else}
					<div class="space-y-4">
						{#each cartItems as item (item.cartId)}
							<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
								<div class="flex items-center gap-4 flex-1 min-w-0">
									<img
										src={item.image ?? '/placeholder.jpg'}
										alt={item.name ?? 'Unnamed Product'}
										class="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover border flex-shrink-0"
									/>
									<div class="min-w-0 flex-1">
										<h4 class="text-base sm:text-lg font-medium text-gray-800 truncate">{item.name ?? 'Unnamed Product'}</h4>
										<p class="text-sm text-gray-500">₱{Number(item.price).toFixed(2)}</p>
									</div>
								</div>

								<div class="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto">
									<div class="flex items-center space-x-2">
										<Button
											class="rounded-md bg-gray-200 text-black px-2 py-1 text-sm hover:bg-gray-300 transition-colors"
											onclick={() => updateQuantity(item.cartId, item.quantity - 1)}
											aria-label="Decrease quantity"
										>
											-
										</Button>
										<Input
											type="number"
											class="w-16 rounded-md border px-2 py-1 text-center text-gray-800"
											value={item.quantity}
											min="1"
											readonly
										/>
										<Button
											class="rounded-md bg-gray-200 text-black px-2 py-1 text-sm hover:bg-gray-300 transition-colors"
											onclick={() => updateQuantity(item.cartId, item.quantity + 1)}
											aria-label="Increase quantity"
										>
											+
										</Button>
									</div>
									<form 
										method="POST" 
										action="?/deleteItem"
										use:enhance={() => {
											return async ({ result }) => {
												if (result.type === 'success') {
													await invalidateAll();
												}
											};
										}}
									>
										<input type="hidden" name="cartId" value={item.cartId} />
										<Button
											class="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 transition-colors"
											type="submit"
										>
											<X class="h-4 w-4" />
										</Button>
									</form>
								</div>
							</div>
						{/each}
					</div>

					<div class="mt-8 pt-6 border-t border-gray-200">
						<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div class="text-xl font-bold text-gray-800">
								Total: ₱{total}
							</div>

							<div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
								<Dialog.Root>
									<Dialog.Trigger class="w-full sm:w-auto">
										<Button
											type="button"
											variant="outline"
											class="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
										>
											Checkout
										</Button>
									</Dialog.Trigger>

									<Dialog.Content>
										<Dialog.Header>
											<Dialog.Title>Checkout</Dialog.Title>
											<Dialog.Description>
												Select your shipping address and payment method to complete your order.
											</Dialog.Description>
										</Dialog.Header>
										<form
											method="POST"
											action="?/placeOrder"
											use:enhance={() => {
												isBuyingNow = true;
												return async ({ update, result }) => {
													await update();
													if (result?.type === 'success') {
														toast.success('Order placed successfully!');
														await goto('/kmart/track-order');
													} else {
														toast.error('Something went wrong.');
													}
													isBuyingNow = false;
												};
											}}
											class="space-y-4 mt-4"
										>
											<div>
												<label
													for="addressId"
													class="text-sm font-medium text-gray-700 mb-1 block"
												>
													Shipping Address
												</label>
												{#if userAddresses.length === 0}
													<p class="text-sm text-red-600 mb-2">
														No addresses found. Please add an address first.
													</p>
													<Button
														type="button"
														variant="outline"
														class="w-full"
														onclick={() => goto('/profile/addresses')}
													>
														Add Address
													</Button>
												{:else}
													<select
														name="addressId"
														required
														class="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
													>
														<option value="">Select an address</option>
														{#each userAddresses as address}
															<option value={address.id}>
																{address.house_num} {address.street}, {address.city}, {address.province} {address.zip}
															</option>
														{/each}
													</select>
												{/if}
											</div>
											
											<div>
												<label
													for="paymentMethod"
													class="text-sm font-medium text-gray-700 mb-1 block"
												>
													Payment Method
												</label>
												<select
													name="paymentMethod"
													required
													class="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												>
													<option value="">Select payment method</option>
													{#each paymentMethods as method}
														<option value={method}>{method}</option>
													{/each}
												</select>
											</div>
											<Button
												type="submit"
												disabled={isBuyingNow || userAddresses.length === 0}
												class="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
											>
												{isBuyingNow ? 'Processing...' : 'Place Order'}
											</Button>
										</form>
									</Dialog.Content>
								</Dialog.Root>
								<form 
									method="POST" 
									action="?/clearCart"
									use:enhance={() => {
										return async ({ result }) => {
											if (result.type === 'success') {
												await invalidateAll();
											}
										};
									}}
								>
									<Button
										class="w-full sm:w-auto rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700 transition-colors"
										type="submit"
									>
										Clear Cart
									</Button>
								</form>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>