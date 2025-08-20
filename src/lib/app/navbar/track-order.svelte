<script lang="ts">
	import { ShoppingCart, Package2, Truck, MapPin, Home } from '@lucide/svelte';

	interface TrackingStep {
		active: boolean;
		icon: 'cart' | 'package' | 'truck' | 'location' | 'home';
		label: string;
		date: string;
	}
	
	export let trackingSteps: TrackingStep[] = [];
	export let trackingId: string = '';
	export let currentStatus: string = '';
	
	const iconMap = {
		cart: ShoppingCart,
		package: Package2,
		truck: Truck,
		location: MapPin,
		home: Home
	} as const;
</script>

<div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-8 border border-blue-100 shadow-sm">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
		<div class="mb-4 sm:mb-0">
			<h2 class="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Track Your Order</h2>
			<span class="text-xs sm:text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
				Tracking ID {trackingId}
			</span>
		</div>
		<div class="text-left sm:text-right">
			<p class="text-xs sm:text-sm text-gray-500 mb-1">Current Status</p>
			<p class="text-base sm:text-lg font-semibold text-blue-600">{currentStatus}</p>
		</div>
	</div>

	<!-- Progress Steps -->
	<div class="flex items-start justify-between relative overflow-x-auto pb-4 pt-2">
		{#each trackingSteps as step, i}
			<div class="flex flex-col items-center relative z-10 flex-1 min-w-[70px] sm:min-w-0">
				<!-- Added padding container to prevent clipping -->
				<div class="relative p-2">
					<div class="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-3 transition-all duration-300 {
						step.active 
							? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500 shadow-lg transform scale-105 sm:scale-110' 
							: 'bg-white border-gray-300 shadow-sm'
					}">
						<svelte:component 
							this={iconMap[step.icon]} 
							class="w-6 h-6 sm:w-8 sm:h-8 {step.active ? 'text-white' : 'text-gray-400'}" 
						/>
					</div>
				</div>

				<!-- Labels -->
				<div class="text-center mt-1 max-w-28">
					<p class="text-xs sm:text-sm font-semibold mb-1 {step.active ? 'text-gray-900' : 'text-gray-400'}">{step.label}</p>
					<p class="text-[10px] sm:text-xs px-2 py-1 rounded-md {step.active ? 'text-blue-700 bg-blue-100' : 'text-gray-400 bg-gray-100'}">{step.date}</p>
				</div>
			</div>

			<!-- Progress Bar -->
			{#if i < trackingSteps.length - 1}
				<div class="flex-1 h-1.5 mx-2 sm:mx-6 relative bg-gray-200 rounded-full mt-8 sm:mt-10">
					<div class="absolute top-0 left-0 h-1.5 rounded-full transition-all duration-700 ease-in-out {
						step.active && trackingSteps[i + 1].active 
							? 'bg-gradient-to-r from-blue-500 to-blue-600 w-full shadow-sm' 
							: step.active && !trackingSteps[i + 1].active
							? 'bg-gradient-to-r from-blue-500 to-blue-300 w-1/2'
							: 'w-0'
					}"></div>
				</div>
			{/if}
		{/each}
	</div>
</div>