<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ShoppingCart } from '@lucide/svelte';
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
	};

	let isSubmitting = false;
</script>

<div
	class={`group relative flex w-full max-w-xs flex-col rounded-2xl p-4 text-sm shadow transition-transform hover:scale-105 ${product.cardClass}`}
>
	<img
		src={product.imageSrc}
		alt={product.title}
		class="mb-3 h-40 w-full rounded-xl object-cover"
	/>

	<h2 class="mt-1 text-lg font-bold text-gray-800">{product.title}</h2>
	<p class="leading-snug text-gray-700">{product.description}</p>

	<div class="mt-2 flex flex-col gap-1 text-sm text-gray-600">
		<span class="text-base font-semibold text-green-600">
			{Number(product.price)
				.toLocaleString('en-PH', {
					style: 'currency',
					currency: 'PHP',
					minimumFractionDigits: 2
				})
				.replace('PHP', '')
				.trim()}
		</span>
		<span class="text-gray-600">Available: {product.quantity}</span>
	</div>

	<div class="mt-3">
		<form method="POST" action="?/addToCart" use:enhance={() => {
			isSubmitting = true;
			return async ({ update, result }) => {
				if (result?.type === 'success') {
					toast.success('Product added to cart successfully!');
					// Force re-run the load function
					await invalidate(() => true);
				}
				if (result?.type === 'failure') {
					toast.error('Something went wrong.');
				}
				await update();
				isSubmitting = false;
			};
		}}>
			<input type="hidden" name="productId" value={product.id} />
			<input type="hidden" name="variant" value="Default" />
			<input type="hidden" name="quantity" value="1" />

			<Button
				type="submit"
				disabled={isSubmitting}
				class="w-full rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
				variant="secondary"
			>
				<ShoppingCart class="mr-1 inline h-5 w-5" />
				{isSubmitting ? 'Adding...' : 'Add to Cart'}
			</Button>
		</form>
	</div>
</div>