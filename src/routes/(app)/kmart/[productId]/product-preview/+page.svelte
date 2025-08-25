<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		ChevronLeft,
		 ChevronRight, 
		 Share2, 
		 Heart, 
		 MessageCircle,
		Star, 
		MapPin, 
		Package, 
		Shield, 
		User, 
		Minus, 	
		Plus, Image
	as ImageIcon} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { toast, Toaster } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	
	
	export let data: {
		products: { id: string; title: string; price: number; description: string; imageSrc: string; category: string }[],
		productId: string;
		paymentMethods: string[];
	};

	export const form = undefined;

	let { products, productId, paymentMethods } = data;
	let product = products.find(p => p.id === productId);

	let selectedVariant = 'Blue';
	let quantity = 1;
	let currentImageIndex = 0;
	let activeTab = 'Product Details';
	let isSubmitting = false;
	let isBuyingNow = false;

	let productImages = Array(6).fill(product?.imageSrc || '');

	// Handcrafted per-product details and helpers
	const normalize = (value: string): string => value.trim().toLowerCase();

	const handcraftedDescriptions: Record<string, string> = {
		'kuromi painting': `This hand‑painted Kuromi artwork is lovingly created by a PWD artist from Pilar, Bataan. 
		
		Each piece begins as a freehand sketch to capture personality and pose, followed by slow, layered applications of color to build depth and luminous tones. Fine liner brushes bring out expressive features and crisp outlines, then a clear protective finish preserves color and texture. Every painting is unique, reflecting the artist’s steady craftsmanship and story from Pilar.
		
		In Pilar, a group of persons with disabilities (PWDs) has turned their challenges into vibrant works of art. Through painting, they found not only a coping mechanism but also a new purpose—where every stroke tells a story of resilience, healing, and hope.

What began as a personal journey of self-expression soon grew into a movement of empowerment. Their handicrafts and paintings don’t just showcase skill; they carry emotions, dreams, and the unbreakable spirit of their creators.

Now, these PWD artists share their creations to inspire others—spreading the same energy, positivity, and passion that changed their lives for the better. Each canvas is more than art; it’s an invitation to feel, to connect, and to celebrate the limitless power of creativity.`,
		'mixed nuts': `Our small‑batch mixed nuts are prepared by PWD makers in Mariveles, Bataan. Nuts are hand‑sorted for consistency, gently roasted so natural oils bloom, and lightly seasoned to keep the flavor clean and balanced. After cooling to lock in crunch, the blend is hand‑tossed and sealed for freshness—simple, honest, and snack‑ready.`,
		'peanut butter': `Stone‑ground peanut butter made by PWD artisans from Limay, Bataan. Carefully selected peanuts are slow‑roasted, milled warm for a creamy body, and seasoned only with a pinch of salt—no unnecessary additives. Jars are sanitized, filled, and sealed by hand to keep the flavor pure. Natural oil separation is normal—stir and enjoy.`,
		'bead bracelet': `Bead bracelets handmade by PWD artisans from Bagac, Bataan. Beads are curated for color stories, hand‑threaded on durable cord or wire, and secured with reinforced finishes. Each piece is checked for comfort and fit, cleaned, and packed with care—wearable craft with a meaningful origin.`,
		'bead bracelets': `Bead bracelets handmade by PWD artisans from Bagac, Bataan. Beads are curated for color stories, hand‑threaded on durable cord or wire, and secured with reinforced finishes. Each piece is checked for comfort and fit, cleaned, and packed with care—wearable craft with a meaningful origin.`
	};

	function getHandcraftedDescription(title: string): string | null {
		const key = normalize(title);
		if (handcraftedDescriptions[key]) return handcraftedDescriptions[key];
		if (key.includes('kuromi') && key.includes('paint')) return handcraftedDescriptions['kuromi painting'];
		if (key.includes('mixed') && key.includes('nut')) return handcraftedDescriptions['mixed nuts'];
		if (key.includes('peanut') && key.includes('butter')) return handcraftedDescriptions['peanut butter'];
		if (key.includes('bracelet')) return handcraftedDescriptions['bead bracelets'];
		return null;
	}

	$: displayDescription = getHandcraftedDescription(product?.title || '') ?? (product?.description || 'Product description not available.');

	// Municipality badge per product
	const municipalityByProductTitle: Record<string, { name: string; logo: string }> = {
		'kuromi painting': { name: 'Pilar', logo: '/img/pilar.webp' },
		'mixed nuts': { name: 'Mariveles', logo: '/img/mariveles.webp' },
		'peanut butter': { name: 'Limay', logo: '/img/limay.webp' },
		'bead bracelet': { name: 'Bagac', logo: '/img/bagac.webp' },
		'bead bracelets': { name: 'Bagac', logo: '/img/bagac.webp' }
	};

	function getMunicipalityInfo(title: string): { name: string; logo: string } | null {
		const key = normalize(title);
		if (municipalityByProductTitle[key]) return municipalityByProductTitle[key];
		if (key.includes('kuromi') && key.includes('paint')) return municipalityByProductTitle['kuromi painting'];
		if (key.includes('mixed') && key.includes('nut')) return municipalityByProductTitle['mixed nuts'];
		if (key.includes('peanut') && key.includes('butter')) return municipalityByProductTitle['peanut butter'];
		if (key.includes('bracelet')) return municipalityByProductTitle['bead bracelets'];
		return null;
	}

	$: municipalityInfo = getMunicipalityInfo(product?.title || '');

	// Mock reviews per product
	type MockReview = { reviewer: string; rating: number; comment: string };
	const mockReviewsByTitle: Record<string, MockReview[]> = {
		'kuromi painting': [
			{ reviewer: 'Ana', rating: 5, comment: 'Beautifully done—rich color and thoughtful details.' },
			{ reviewer: 'Marco', rating: 5, comment: 'Exceeded expectations. Finish is clean and professional.' },
			{ reviewer: 'Lia', rating: 4, comment: 'Lovely texture. Arrived well‑packed.' }
		],
		'mixed nuts': [
			{ reviewer: 'Rene', rating: 5, comment: 'Fresh, crunchy, and lightly seasoned—perfect balance.' },
			{ reviewer: 'Kim', rating: 4, comment: 'You can taste the careful roasting. Great snack.' }
		],
		'peanut butter': [
			{ reviewer: 'Joy', rating: 5, comment: 'Creamy and deeply roasted flavor. Minimal ingredients.' },
			{ reviewer: 'Paolo', rating: 5, comment: 'Best I’ve had—stirs once and spreads perfectly.' },
			{ reviewer: 'Maya', rating: 4, comment: 'Natural and tasty. Not too sweet.' }
		],
		'bead bracelet': [
			{ reviewer: 'Kaye', rating: 5, comment: 'Elegant color combo and comfy fit.' },
			{ reviewer: 'Nate', rating: 4, comment: 'Thoughtful design and solid build.' }
		],
		'bead bracelets': [
			{ reviewer: 'Kaye', rating: 5, comment: 'Elegant color combo and comfy fit.' },
			{ reviewer: 'Nate', rating: 4, comment: 'Thoughtful design and solid build.' }
		]
	};

	function getMockReviews(title: string): MockReview[] {
		const key = normalize(title);
		if (mockReviewsByTitle[key]) return mockReviewsByTitle[key];
		if (key.includes('kuromi') && key.includes('paint')) return mockReviewsByTitle['kuromi painting'];
		if (key.includes('mixed') && key.includes('nut')) return mockReviewsByTitle['mixed nuts'];
		if (key.includes('peanut') && key.includes('butter')) return mockReviewsByTitle['peanut butter'];
		if (key.includes('bracelet')) return mockReviewsByTitle['bead bracelets'];
		return [];
	}

	$: mockReviews = getMockReviews(product?.title || '');

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

<div id="main-content" class="max-w-7xl mx-auto p-4 bg-white">
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

			<div class="flex items-center space-x-2">pnp
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

			<a 
	href="/tos"  
	class="flex items-center space-x-3 hover:underline hover:text-blue-500"
>
	<Shield class="w-5 h-5 text-blue-600" />
	<span class="text-sm text-blue-600">Return Policy • Warranty availability</span>
</a>

			
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
			<div class="space-y-6">
				<!-- Section Header -->
				<h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
					<Package class="w-5 h-5 text-blue-600" />
					Product Details
				</h3>
	
				<!-- Description -->
				<div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
					<p class="text-gray-700 leading-relaxed whitespace-pre-line">
						{displayDescription}
					</p>
				</div>
	
				<!-- Municipality Badge -->
				{#if municipalityInfo}
	<a 
	href="/location" 
		class="flex items-center gap-3 mt-4 p-3 rounded-lg border bg-blue-50 shadow-sm hover:bg-blue-100 transition"
	>
		<img
			src={municipalityInfo.logo}
			alt={`${municipalityInfo.name} logo`}
			class="h-10 w-10 rounded-full object-cover border"
		/>
		<div class="text-sm">
			<p class="font-medium text-blue-700">Handcrafted in {municipalityInfo.name}, Bataan</p>
			<p class="text-gray-600">Supporting local PWD artisans</p>
		</div>
	</a>
{/if}

	
				<!-- Extra Info Highlights -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
					<div class="flex items-start gap-3 p-4 rounded-lg border bg-gray-50">
						<Shield class="w-5 h-5 text-blue-600 mt-1" />
						<div>
							<p class="font-medium text-gray-900 text-sm">Quality Guaranteed</p>
							<p class="text-gray-600 text-xs">Crafted with care & attention to detail.</p>
						</div>
					</div>
					<div class="flex items-start gap-3 p-4 rounded-lg border bg-gray-50">
						<MapPin class="w-5 h-5 text-blue-600 mt-1" />
						<div>
							<p class="font-medium text-gray-900 text-sm">Local Impact</p>
							<p class="text-gray-600 text-xs">Directly supports communities in Bataan.</p>
						</div>
					</div>
					<div class="flex items-start gap-3 p-4 rounded-lg border bg-gray-50">
						<User class="w-5 h-5 text-blue-600 mt-1" />
						<div>
							<p class="font-medium text-gray-900 text-sm">Made by PWD Artists</p>
							<p class="text-gray-600 text-xs">Each piece tells a story of resilience.</p>
						</div>
					</div>
				</div>
			</div>
	
		{:else if activeTab === 'Reviews'}
			<div class="space-y-6">
				<h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
					<Star class="w-5 h-5 text-yellow-400" />
					Customer Reviews
				</h3>
	
				{#if mockReviews.length > 0}
					<ul class="space-y-4">
						{#each mockReviews as r}
							<li class="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
								<div class="flex items-center justify-between">
									<div class="font-medium text-gray-900">{r.reviewer}</div>
									<div class="flex text-yellow-400">
										{#each Array(r.rating) as _}
											<Star class="w-4 h-4 fill-current" />
										{/each}
										{#each Array(Math.max(0, 5 - r.rating)) as _}
											<Star class="w-4 h-4 text-gray-300" />
										{/each}
									</div>
								</div>
								<p class="mt-2 text-sm text-gray-700 leading-relaxed">{r.comment}</p>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
						<p class="text-gray-600">No reviews yet. Be the first to review this product!</p>
					</div>
				{/if}
			</div>
	
			{:else if activeTab === 'Media'}
			<div class="space-y-6">
				<h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
					<ImageIcon class="w-5 h-5 text-blue-600" />
					Product Media
				</h3>
	
				<div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
					<p class="text-gray-600">No uploads yet. Be the first to share product photos or videos!</p>
				</div>
			</div>
			{/if} 
		</div>  
	{/if} 
	</div> 
	

