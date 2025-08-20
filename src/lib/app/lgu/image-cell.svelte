<script lang="ts">
	let { imageUrl, productName } = $props<{
		imageUrl: string | null;
		productName: string;
	}>();

	let imageError = $state(false);
	let imageLoading = $state(true);

	function handleImageLoad() {
		imageLoading = false;
	}

	function handleImageError() {
		imageError = true;
		imageLoading = false;
	}
</script>

<div class="flex h-12 w-12 items-center justify-center">
	{#if imageError}
		<div class="flex h-12 w-12 items-center justify-center rounded-md border bg-gray-100">
			<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</div>
	{:else}
		{#if imageLoading}
			<div class="h-12 w-12 animate-pulse rounded-md border bg-gray-100"></div>
		{/if}
		<img
			src={imageUrl}
			alt={productName}
			class="h-12 w-12 rounded-md border object-cover shadow-sm {imageLoading ? 'hidden' : ''}"
			loading="lazy"
			onload={handleImageLoad}
			onerror={handleImageError}
		/>
	{/if}
</div>
