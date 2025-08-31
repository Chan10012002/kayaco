<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ShoppingCart, MapPin } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	export let product: {
		id: string;
		title: string;
		category: string;
		description: string;
		imageSrc: string;
		cardClass: string;
		badgeColor: string;
		price: string | number;
		quantity: number;
		lguId: string;
		f_name: string | null;
	};

	let isSubmitting = false;
</script>

<div
	class={`group relative flex flex-col w-full h-full min-h-[440px] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 motion-safe:hover:scale-[1.02] border border-blue-50 ${product.cardClass}`}
>
	<!-- Municipality -->
	<div class="absolute top-3 left-3 z-10">
		<span class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-white/80 text-blue-700 shadow ring-1 ring-blue-200/60 backdrop-blur-md">
			<MapPin class="w-4 h-4 text-emerald-500" />
			<span class="font-medium">{product.f_name}</span>
		</span>
	</div>

	<!-- Image Container with Gradient Overlay -->
	<div class="relative overflow-hidden h-56 w-full bg-gradient-to-br from-blue-50 to-blue-100">
		<img
			src={product.imageSrc}
			alt={product.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
	</div>

	<!-- Card Content -->
	<div class="flex flex-col justify-between flex-grow p-5">
		<div class="space-y-3">
			<!-- Product Title -->
			<div>
				<h3 class="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors duration-200">
					{product.title}
				</h3>
			</div>

			<!-- Description -->
			<p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
				{product.description}
			</p>

			<!-- Price-->
			<div class="space-y-2">
				<div class="flex items-baseline justify-between">
					<span class="text-2xl font-bold text-green-600">
						₱{Number(product.price)
							.toLocaleString('en-PH', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
					</span>
				</div>
				
				<!-- Stock Status -->
				<div class="flex items-center gap-2">
					<span 
						class={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
							product.quantity > 10 
								? 'text-emerald-700 bg-emerald-100' 
								: product.quantity > 0 
									? 'text-amber-700 bg-amber-100' 
									: 'text-red-700 bg-red-100'
						}`}
					>
						{product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
					</span>
					<span class="text-xs text-gray-500">({product.quantity} available)</span>
				</div>
			</div>
		</div>

		<!-- Add to Cart Section -->
		<div class="mt-5 pt-4 border-t border-gray-100">
			<form
				method="POST"
				action="?/addToCart"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update, result }) => {
						if (result?.type === 'success') {
							toast.success('Product added to cart successfully!');
							await invalidate(() => true);
						}
						if (result?.type === 'failure') {
							toast.error('Something went wrong.');
						}
						await update();
						isSubmitting = false;
					};
				}}
			>
				<input type="hidden" name="productId" value={product.id} />
				<input type="hidden" name="variant" value="Default" />
				<input type="hidden" name="quantity" value="1" />

				<Button
					type="submit"
					disabled={isSubmitting || product.quantity === 0}
					class={`w-full rounded-lg px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 ${
						product.quantity === 0
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-0.5'
					} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
					variant="secondary"
				>
					<ShoppingCart class="mr-2 inline h-5 w-5" />
					{isSubmitting 
						? 'Adding...' 
						: product.quantity === 0 
							? 'Out of Stock' 
							: 'Add to Cart'
					}
				</Button>
			</form>
		</div>
	</div>
</div>