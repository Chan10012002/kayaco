<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		ChevronLeft, ChevronRight, Share2, Heart, MessageCircle,
		Star, MapPin, Package, Shield, User, Minus, Plus
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { toast, Toaster } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	
	export let data: {
		products: { id: string; title: string; price: number; description: string; imageSrc: string; category: string }[],
		productId: string;
		paymentMethods: string[];
	};

	export let form;

	let { products, productId, paymentMethods } = data;
	let product = products.find(p => p.id === productId);

	let selectedVariant = 'Blue';
	let quantity = 1;
	let currentImageIndex = 0;
	let activeTab = 'Product Details';
	let isSubmitting = false;
	let isBuyingNow = false;

	let productImages = Array(6).fill(product?.imageSrc || '');

	const changeQuantity = (delta: number) => {
		quantity = Math.max(1, quantity + delta);
	};

	const selectVariant = (variant: string) => {
		selectedVariant = variant;
	};

	const changeImage = (index: number) => {
		currentImageIndex = index;
	};

	const nextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % productImages.length;
	};

	const prevImage = () => {
		currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
	};

	const setActiveTab = (tab: string) => {
		activeTab = tab;
	};
</script>

<div class="max-w-7xl mx-auto p-4 bg-white">
	<Toaster />

	{#if product}
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<div class="space-y-4">
			<div class="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
				<img src={productImages[currentImageIndex]} alt={product?.title || 'Product'} class="w-full h-full object-cover" />
				<Button variant="secondary" size="icon" onclick={prevImage} class="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full shadow-md bg-blue-600 hover:bg-blue-400 text-white">
					<ChevronLeft class="w-5 h-5" />
				</Button>
				<Button variant="secondary" size="icon" onclick={nextImage} class="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full shadow-md bg-blue-600 hover:bg-blue-400 text-white">
					<ChevronRight class="w-5 h-5" />
				</Button>
			</div>
			<div class="flex space-x-2 overflow-x-auto">
				{#each productImages as image, index}
					<Button variant="ghost" onclick={() => changeImage(index)} class="flex-shrink-0 w-16 h-16 p-0 border-2 rounded-lg overflow-hidden transition-all {currentImageIndex === index ? 'border-blue-600' : 'border-gray-200 hover:border-blue-400'}">
						<img src={image} alt="Product thumbnail" class="w-full h-full object-cover" />
					</Button>
				{/each}
			</div>
		</div>
		<div class="space-y-6">
			<h1 class="text-2xl font-medium text-gray-900 leading-tight">{product?.title || 'Product Title'}</h1>

			<div class="flex items-center space-x-2">
				<div class="flex text-yellow-400">{#each Array(5) as _}<Star class="w-4 h-4 fill-current" />{/each}</div>
				<span class="text-sm font-medium text-gray-900">4.9</span>
				<span class="text-sm text-gray-600">Rating Count</span>
			</div>

			<div class="text-sm text-gray-600">
				<span class="font-medium">Category:</span> 
				<span class="text-blue-600 hover:underline cursor-pointer">{product.category}</span>
			</div>

			<div class="flex items-baseline space-x-2">
				<span class="text-3xl font-bold text-blue-600">₱{product?.price || '0'}</span>
				<span class="text-lg text-gray-400 line-through">₱1999.00</span>
				<span class="bg-blue-600 text-white text-sm px-2 py-1 rounded">-n%</span>
			</div>

			<div class="flex items-center space-x-2">
				<span class="text-sm text-gray-600">Promotions:</span>
				<span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">n% OFF</span>
			</div>
			<div class="space-y-3">
				<div class="flex items-start space-x-3">
					<MapPin class="w-5 h-5 mt-0.5 text-blue-600" />
					<div class="flex-1 text-sm text-gray-900">
						Shipping Location
						<Button variant="link" class="text-blue-600 hover:underline ml-1 p-0 h-auto">CHANGE</Button>
					</div>
				</div>
				<div class="flex items-start space-x-3">
					<Package class="w-5 h-5 mt-0.5 text-blue-600" />
					<div class="flex-1 text-sm text-gray-900">
						Date of delivery
						<div class="text-gray-600">Shipping fee</div>
					</div>
				</div>
			</div>

			<div class="flex items-center space-x-3">
				<Shield class="w-5 h-5 text-blue-600" />
				<span class="text-sm text-gray-600">Return Policy • Warranty availablity</span>
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium text-gray-700">Variant:</div>
				<div class="flex space-x-2">
					{#each ['Blue', 'White', 'Pink'] as variant}
						<Button variant={selectedVariant === variant ? "default" : "outline"} size="sm" onclick={() => selectVariant(variant)} class={selectedVariant === variant ? "bg-blue-600 hover:bg-blue-400 text-white" : "border-blue-400 text-blue-600 hover:bg-blue-50"}>
							{variant}
						</Button>
					{/each}
				</div>
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium text-gray-700">Quantity:</div>
				<div class="flex items-center space-x-3">
					<Button variant="outline" size="icon" onclick={() => changeQuantity(-1)} disabled={quantity <= 1} class="w-8 h-8 border-blue-400 text-blue-600 hover:bg-blue-50">
						<Minus class="w-4 h-4" />
					</Button>
					<span class="w-12 text-center font-medium">{quantity}</span>
					<Button variant="outline" size="icon" onclick={() => changeQuantity(1)} class="w-8 h-8 border-blue-400 text-blue-600 hover:bg-blue-50">
						<Plus class="w-4 h-4" />
					</Button>
				</div>
			</div>

			<div class="flex space-x-3">
				<div class="flex-1">
					<Dialog.Root>
					<Dialog.Trigger class="w-full">
						<Button
						type="button"
						variant="outline"
						class="w-full border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
						Buy Now
						</Button>
					</Dialog.Trigger>

					<Dialog.Content>
						<Dialog.Header>
						<Dialog.Title>Select Payment Method</Dialog.Title>
						<Dialog.Description>
							Choose your preferred payment option to continue.
						</Dialog.Description>
						</Dialog.Header>

						<form
						method="POST"
						action="?/buyNow"
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
						<input type="hidden" name="productId" value={productId} />
						<input type="hidden" name="variant" value={selectedVariant} />
						<input type="hidden" name="quantity" value={quantity} />

						<div>
							<label
							for="paymentMethod"
							class="text-sm font-medium text-gray-700 mb-1 block"
							>Payment Method</label
							>
							<select name="paymentMethod" required class="w-full ...">
								{#each paymentMethods as method}
									<option value={method}>{method}</option>
								{/each}
							</select>
						</div>
						<Button
							type="submit"
							disabled={isBuyingNow}
							class="w-full bg-blue-600 hover:bg-blue-400 text-white disabled:opacity-50"
						>
							{isBuyingNow ? 'Processing...' : 'Proceed'}
						</Button>
						</form>
					</Dialog.Content>
					</Dialog.Root>
				</div>
				<form
					method="POST"
					action="?/addToCart"
					use:enhance={() => {
					isSubmitting = true;
					return async ({ update, result }) => {
						await update();
						if (result?.type === 'success')
						toast.success('Product added to cart successfully!');
						if (result?.type === 'failure')
						toast.error('Something went wrong.');
						isSubmitting = false;
					};
					}}
					class="flex-1"
				>
					<input type="hidden" name="variant" value={selectedVariant} />
					<input type="hidden" name="quantity" value={quantity} />
					<Button
					type="submit"
					disabled={isSubmitting}
					class="w-full bg-blue-600 hover:bg-blue-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
					>
					{isSubmitting ? 'Adding...' : 'Add to Cart'}
					</Button>
				</form>
				</div>


			<div class="flex items-center justify-center space-x-6 pt-4">
				<Button variant="ghost" size="sm" class="flex items-center space-x-1 text-blue-600 hover:bg-blue-50">
					<Share2 class="w-5 h-5" />
					<span class="text-sm">Share</span>
				</Button>
				<Button variant="ghost" size="sm" class="flex items-center space-x-1 text-blue-600 hover:bg-blue-50">
					<Heart class="w-5 h-5" />
					<span class="text-sm">Like</span>
				</Button>
			</div>
		</div>
	</div>
	<div class="mt-8 bg-gray-50 rounded-lg p-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
					<User class="w-6 h-6 text-blue-600" />
				</div>
				<div>
					<div class="font-medium text-gray-900">Seller's Username</div>
					<div class="flex items-center space-x-4 text-sm text-gray-600">
						<span class="flex items-center"><span class="text-green-600 mr-1">●</span>Badges:</span>
						{#each ['orange', 'purple', 'green'] as color}
							<span class="bg-{color}-100 text-{color}-800 px-2 py-1 rounded text-xs">Seller's Badge</span>
						{/each}
					</div>
				</div>
			</div>
			<div class="flex space-x-3">
				<Button variant="outline" size="sm" class="flex items-center space-x-2 border-blue-400 text-blue-600 hover:bg-blue-50">
					<MessageCircle class="w-4 h-4" /><span>Chat</span>
				</Button>
				<Button size="sm" class="bg-blue-600 hover:bg-blue-400 text-white">GO TO STORE</Button>
			</div>
		</div>
	</div>
	<div class="mt-8">
		<div class="border-b border-gray-200">
			<nav class="flex space-x-8">
				{#each ['Product Details', 'Reviews', 'Media'] as tab}
					<Button 
						variant="ghost" 
						onclick={() => setActiveTab(tab)}
						class="{activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'} hover:bg-blue-50 py-2 px-1 text-sm font-medium rounded-none"
					>
						{tab}
					</Button>
				{/each}
			</nav>
		</div>
	</div>

	<div class="mt-6">
		{#if activeTab === 'Product Details'}
			<div class="space-y-4">
				<h3 class="text-lg font-medium text-gray-900">Product Details</h3>
				<div class="prose max-w-none">
					<p class="text-gray-700">{product?.description || 'Product description not available.'}</p>
				</div>
			</div>
		{:else if activeTab === 'Reviews'}
			<div class="space-y-4">
				<h3 class="text-lg font-medium text-gray-900">Customer Reviews</h3>
				<div class="bg-gray-50 rounded-lg p-4">
					<p class="text-gray-600">No reviews yet. Be the first to review this product!</p>
				</div>
			</div>
		{:else if activeTab === 'Media'}
			<div class="space-y-4">
				<h3 class="text-lg font-medium text-gray-900">Product Media</h3>
				<div class="bg-gray-50 rounded-lg p-4">
					<p class="text-gray-600">No uploads yet. Be the first to review this product!</p>
				</div>
			</div>
		{/if}
	</div>
	{:else}
	<div class="text-center py-8">
		<p class="text-gray-600">Product not found.</p>
	</div>
	{/if}
</div>