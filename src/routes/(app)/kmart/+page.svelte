<script lang="ts">
	import ProductCard from '$lib/app/navbar/product-card.svelte';
	import type { PageData } from './$types';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { ChevronDown, MapPinned, Truck, Filter, X } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import { goto } from '$app/navigation';
	import { invalidateAll } from '$app/navigation';
	

	export let data: PageData;
	const { categories, products, cartItems } = data;

	let searchTerm = '';
	let selectedCategory: string | null = null;
	let priceMin: number | null = null;
	let priceMax: number | null = null;
	let showMobileFilters = false;

	$: filteredProducts = products.filter(({ title, category, price }) => {
		const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory ? category === selectedCategory : true;
		const priceNumber = Number(price);
		const matchesMin = priceMin !== null ? priceNumber >= priceMin : true;
		const matchesMax = priceMax !== null ? priceNumber <= priceMax : true;
		return matchesSearch && matchesCategory && matchesMin && matchesMax;
	});

	$: filteredProductsWithoutCategory = filteredProducts.map(({ category, ...rest }) => rest);

	function selectCategory(catName: string | null) {
		selectedCategory = selectedCategory === catName ? null : catName;
	}

	function onMinInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		priceMin = value === '' ? null : Number(value);
	}

	function onMaxInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		priceMax = value === '' ? null : Number(value);
	}

	function navigateToProduct(productId: string, event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		const isAddToCartButton = target.closest('form') || target.closest('button[type="submit"]');
		if (!isAddToCartButton) {
			goto(`/kmart/${productId}/product-preview`);
		}
	}

	// Add this function to handle add to cart and update mini cart
	async function handleAddToCart(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		
		try {
			const res = await fetch(form.action, {
				method: 'POST',
				body: formData
			});
			
			if (res.ok) {
				await invalidateAll(); 
			} else {
				console.error('Failed to add item to cart');
			}
		} catch (error) {
			console.error('Error adding item to cart:', error);
		}
	}

	function toggleMobileFilters() {
		showMobileFilters = !showMobileFilters;
	}

</script>

<div class="mt-6 sm:mt-12 space-y-6 sm:space-y-10 px-2 pb-20 sm:px-4 md:px-8 lg:px-16">
	<!-- Mobile Header Section -->
	<div class="lg:hidden px-2 space-y-3">
		<!-- Search Bar -->
		<Input
			type="text"
			bind:value={searchTerm}
			placeholder="Search products..."
			class="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none"
		/>
		
		<!-- Mobile Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-2">
			<Button
				onclick={toggleMobileFilters}
				class="flex items-center gap-2 flex-1 justify-center rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-gray-200"
			>
				<Filter size={16}/> Filters & Cart
			</Button>
			
			<Button
				href="kmart/track-order"
				class="flex items-center justify-center gap-2 flex-1 rounded-md bg-blue-600 px-4 py-3 text-sm text-white hover:bg-blue-400"
			>
				<MapPinned size={16}/> Track Order
			</Button>

			<Dialog.Root>
				<Dialog.Trigger>
					<button
						class="flex items-center justify-center gap-2 flex-1 rounded-md bg-blue-600 px-4 py-3 text-sm text-white hover:bg-blue-400 w-full font-medium"
					>
						<Truck size={16}/> Shipping Info
					</button>
				</Dialog.Trigger>
				<Dialog.Content class="w-full max-w-md rounded-xl bg-white p-4 sm:p-6 shadow-lg mx-4">
					<Dialog.Title class="text-lg font-semibold mb-4">Shipping Information</Dialog.Title>
					<form class="space-y-4">
						<div>
							<label for="full-name" class="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
							<Input type="text" placeholder="Juan Dela Cruz" required />
						</div>
						<div>
							<label for="phone" class="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
							<Input type="tel" placeholder="09xxxxxxxxx" required />
						</div>
						<div>
							<label for="address" class="mb-1 block text-sm font-medium text-gray-700">Address</label>
							<Input type="text" placeholder="123 Main St, Barangay, City" required />
						</div>
						<div class="flex justify-end pt-4">
							<Dialog.Close>
								<Button type="submit" class="bg-blue-600 hover:bg-blue-400 text-white">
									Submit
								</Button>
							</Dialog.Close>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>

	<!-- Mobile Filters Overlay -->
	{#if showMobileFilters}
		<div 
			class="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden" 
			onclick={toggleMobileFilters}
			role="button"
			tabindex="0"
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggleMobileFilters();
				}
			}}
			aria-label="Close filters"
		></div>
		<div class="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white p-4 shadow-lg lg:hidden overflow-y-auto">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-lg font-semibold">Filters</h2>
				<Button onclick={toggleMobileFilters} class="p-2 hover:bg-gray-100 rounded-md">
					<X size={20} />
				</Button>
			</div>
			
			<!-- Mobile Mini Cart -->
			<div class="w-full space-y-4 rounded-xl border bg-white p-4 shadow mb-6">
				<h2 class="text-lg font-semibold">Mini Cart</h2>
				{#if cartItems.length > 0}
					<ul class="space-y-2">
						{#each cartItems as item}
							<li class="flex items-center justify-between border-b pb-1 text-sm">
								<div class="flex items-center gap-2">
									<img src={item.imageSrc} alt={item.productName} class="h-8 w-8 rounded object-cover" />
									<span class="truncate">{item.productName}</span>
								</div>
								<span class="text-green-600 whitespace-nowrap">₱{(+item.price).toFixed(2)}</span>
							</li>
						{/each}
					</ul>
					<div class="text-right font-semibold">
						Total: ₱
						{cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}
					</div>
					<Button class="w-full rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-400" href="/cart">
						Checkout
					</Button>
				{:else}
					<p class="text-sm text-gray-500">Your cart is empty.</p>
				{/if}
			</div>

			<!-- Mobile Filter Options -->
			<div class="space-y-6">
				<div>
					<label for="price-min-mobile" class="mb-2 block text-sm font-medium text-gray-700">Price Range</label>
					<div class="flex gap-2">
						<Input
							id="price-min-mobile"
							type="number"
							min="0"
							placeholder="Min"
							oninput={onMinInput}
							class="w-full rounded-md border p-3 text-sm"
						/>
						<Input
							id="price-max-mobile"
							type="number"
							min="0"
							placeholder="Max"
							oninput={onMaxInput}
							class="w-full rounded-md border p-3 text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="shipped-from-mobile" class="mb-2 block text-sm font-medium text-gray-700">Shipped From</label>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={buttonVariants({ variant: 'outline', class: 'w-full justify-between text-start p-3' })}>
							All <ChevronDown />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-full">
							<DropdownMenu.Group class="w-full">
								<DropdownMenu.Item>All</DropdownMenu.Item>
								<DropdownMenu.Item>Balanga</DropdownMenu.Item>
								<DropdownMenu.Item>Pilar</DropdownMenu.Item>
								<DropdownMenu.Item>Limay</DropdownMenu.Item>
								<DropdownMenu.Item>Mariveles</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>

				<div>
					<label for="rating-mobile" class="mb-2 block text-sm font-medium text-gray-700">Minimum Rating</label>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={buttonVariants({ variant: 'outline', class: 'w-full justify-between text-start p-3' })}>
							All <ChevronDown />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-full">
							<DropdownMenu.Group class="w-full">
								<DropdownMenu.Item>⭐1 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐2 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐3 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐4 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐5 and up</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-col gap-6 sm:gap-10 px-2 sm:px-4 lg:flex-row lg:px-0">
		<!-- Desktop Sidebar -->
		<aside class="hidden lg:block lg:w-1/5 space-y-6">
			<div class="flex justify-center">
				<Input
					type="text"
					bind:value={searchTerm}
					placeholder="Search products..."
					class="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none"
				/>
			</div>

			<div class="w-full space-y-4 rounded-xl border bg-white p-4 shadow">
				<h2 class="text-lg font-semibold">Mini Cart</h2>
				{#if cartItems.length > 0}
					<ul class="space-y-2">
						{#each cartItems as item}
							<li class="flex items-center justify-between border-b pb-1 text-sm">
								<div class="flex items-center gap-2">
									<img src={item.imageSrc} alt={item.productName} class="h-8 w-8 rounded object-cover" />
									<span>{item.productName}</span>
								</div>
								<span class="text-green-600">₱{(+item.price).toFixed(2)}</span>
							</li>
						{/each}
					</ul>
					<div class="text-right font-semibold">
						Total: ₱
						{cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}
					</div>
					<Button class="w-full rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-400" href="/cart">
						Checkout
					</Button>
				{:else}
					<p class="text-sm text-gray-500">Your cart is empty.</p>
				{/if}
			</div>

			<h3 class="text-lg font-bold">Filters</h3>

			<div>
				<label for="price-min" class="mb-1 block text-sm font-medium text-gray-700">Price Range</label>
				<div class="flex gap-2">
					<Input
						id="price-min"
						type="number"
						min="0"
						placeholder="Min"
						oninput={onMinInput}
						class="w-full rounded-md border p-2 text-sm"
					/>
					<Input
						id="price-max"
						type="number"
						min="0"
						placeholder="Max"
						oninput={onMaxInput}
						class="w-full rounded-md border p-2 text-sm"
					/>
				</div>
			</div>

			<div>
				<label for="shipped-from" class="mb-1 block text-sm font-medium text-gray-700">Shipped From</label>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class={buttonVariants({ variant: 'outline', class: 'w-full justify-between text-start' })}>
						All <ChevronDown />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="flex lg:w-[350px]">
						<DropdownMenu.Group class="w-full">
							<DropdownMenu.Item>All</DropdownMenu.Item>
							<DropdownMenu.Item>Balanga</DropdownMenu.Item>
							<DropdownMenu.Item>Pilar</DropdownMenu.Item>
							<DropdownMenu.Item>Limay</DropdownMenu.Item>
							<DropdownMenu.Item>Mariveles</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<div class="mt-4">
					<label for="rating" class="mb-1 block text-sm font-medium text-gray-700">Minimum Rating</label>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={buttonVariants({ variant: 'outline', class: 'w-full justify-between text-start' })}>
							All <ChevronDown />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="flex lg:w-[350px]">
							<DropdownMenu.Group class="w-full">
								<DropdownMenu.Item>⭐1 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐2 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐3 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐4 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐5 and up</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
			<div class="mt-4">
  			<label class="block text-sm font-medium text-gray-700">Sort by</label>
  			<DropdownMenu.Root>
    		<DropdownMenu.Trigger
     		 class={buttonVariants({ variant: 'outline', class: 'w-full justify-between text-start' })}>
      		Relevance <ChevronDown />
    			</DropdownMenu.Trigger>
    			<DropdownMenu.Content class="flex lg:w-[350px]">
      		<DropdownMenu.Group class="w-full">
        <DropdownMenu.Item>Relevance</DropdownMenu.Item>
        <DropdownMenu.Item>Latest</DropdownMenu.Item>
        <DropdownMenu.Item>Top Sales</DropdownMenu.Item>
     	 </DropdownMenu.Group>
   	 	</DropdownMenu.Content>
  		</DropdownMenu.Root>
		</div>
</aside>

		<div class="flex-1 space-y-4">
			<!-- Desktop Action Buttons -->
			<div class="mb-4 hidden lg:flex lg:items-center lg:justify-between gap-3">
				<h2 class="text-xl font-bold">Categories</h2>
				<div class="flex gap-2">
					<Button
						href="kmart/track-order"
						class="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-400"
					>
						<MapPinned size={16}/> Track Your Order
					</Button>

					<Dialog.Root>
						<Dialog.Trigger>
							<Button
								class="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-400"
							>
								<Truck size={16}/> Shipping Info
							</Button>
						</Dialog.Trigger>
						<Dialog.Content class="w-full max-w-md rounded-xl bg-white p-4 sm:p-6 shadow-lg mx-4">
							<Dialog.Title class="text-lg font-semibold mb-4">Shipping Information</Dialog.Title>
							<form class="space-y-4">
								<div>
									<label for="full-name" class="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
									<Input type="text" placeholder="Juan Dela Cruz" required />
								</div>
								<div>
									<label for="phone" class="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
									<Input type="tel" placeholder="09xxxxxxxxx" required />
								</div>
								<div>
									<label for="address" class="mb-1 block text-sm font-medium text-gray-700">Address</label>
									<Input type="text" placeholder="123 Main St, Barangay, City" required />
								</div>
								<div class="flex justify-end pt-4">
									<Dialog.Close>
										<Button type="submit" class="bg-blue-600 hover:bg-blue-400 text-white">
											Submit
										</Button>
									</Dialog.Close>
								</div>
							</form>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>

			<!-- Mobile Categories Title -->
			<div class="mb-4 lg:hidden">
				<h2 class="text-lg font-bold">Categories</h2>
			</div>

			<!-- Categories Grid -->
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				<Button
					type="button"
					onclick={() => selectCategory(null)}
					class="rounded-md border px-2 sm:px-4 py-2 text-center text-xs sm:text-sm font-medium
						focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
						{selectedCategory === null
							? 'bg-blue-600 hover:bg-blue-400 text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
				>
					All
				</Button>
				{#each categories as category}
					<Button
						type="button"
						onclick={() => selectCategory(category.category_name)}
						class="rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm text-center transition-colors
							{selectedCategory === category.category_name
								? 'bg-blue-600 hover:bg-blue-400 text-white'
								: 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
					>
						{category.category_name}
					</Button>
				{/each}
			</div>

			<!-- Products Section -->
			<h2 class="mb-4 pt-6 sm:pt-8 text-lg sm:text-xl font-bold">Products</h2>
			<div class="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
				{#each filteredProductsWithoutCategory as product}
					<div 
						class="cursor-pointer rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
						onclick={(e) => navigateToProduct(product.id, e)}
						role="button"
						tabindex="0"
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								navigateToProduct(product.id, e);
							}
						}}
					>
						<ProductCard {product} {handleAddToCart} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
