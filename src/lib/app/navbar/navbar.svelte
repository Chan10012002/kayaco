<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Search, User, LogOut, ShoppingCart } from '@lucide/svelte';
	import { invalidateAll } from '$app/navigation';
	
	let { user } = $props<{ user: { id: string; email: string } | null }>();
	let isOpen = $state(false);

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const closeMenu = () => {
		isOpen = false;
	};

	const handleLogout = async () => {
		try {
			await fetch('/api/logout', { method: 'POST' });
			await invalidateAll();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const links = [
		{ name: 'Home', href: '/landingpage' },
		{ name: 'Mart', href: '/kmart' },
		{ name: 'Accessibility', href: '/accessibility' },
		{ name: 'About us', href: '/about' },
		{ name: 'Courses', href: '/courses' }
	];
</script>

<nav id="main-menu" class="border-b border-gray-200 bg-white">
	<div class="px-4 sm:px-6 lg:px-24">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-12">
				<img src="/logo/logo.png" alt="logo" class="hidden h-8 w-24 lg:block" />
				<img src="/logo/logo.png" alt="logo" class="h-6 w-18 sm:h-7 sm:w-20 md:hidden" />

				<div class="hidden items-center space-x-8 md:flex">
					{#each links as link}
						<a
							href={link.href}
							class="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-500"
						>
							{link.name}
						</a>
					{/each}
					<div class="relative flex items-center ml-2">
						<input
							type="text"
							placeholder="Search..."
							class="pl-8 pr-2 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition w-48 md:w-64 bg-gray-50"
							style="font-size: 0.92rem;"
						/>
						<span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
							<Search class="w-4 h-4 text-blue-600"/>
						</span>
					</div>
				</div>
			</div>

			<div class="hidden items-center space-x-3 md:flex">
				{#if user}
					<div class="flex items-center space-x-4">
						<a 
							href="/cart" 
							class="relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
						>
							<div class="relative">
								<ShoppingCart class="w-5 h-5" />
							</div>
							<span class="hidden lg:inline">Cart</span>
						</a>

						<!-- User Profile Section -->
						<div class="flex items-center space-x-3">
							<div class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
								<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
									<User class="w-4 h-4 text-white" />
								</div>
								<div class="hidden lg:block">
									<div class="text-sm font-medium text-gray-900">
										{user.email.split('@')[0]}
									</div>
									<div class="text-xs text-gray-500">
										{user.email}
									</div>
								</div>
							</div>
							
							<!-- Logout Button -->
							<Button 
								onclick={handleLogout} 
								variant="outline" 
								class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
							>
								<LogOut class="w-4 h-4" />
								<span class="hidden lg:inline">Logout</span>
							</Button>
						</div>
					</div>
				{:else}
					<Button href="/login" variant="outline" class="px-4 py-2">Login</Button>
					<Button href="/register" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 transition-colors duration-200">Register</Button>
				{/if}
			</div>

			<!-- Mobile View -->
			<div class="flex items-center md:hidden">
				<button 
					onclick={toggleMenu} 
					class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label="Toggle menu"
				>
					{#if isOpen}
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>

		{#if isOpen}
			<div class="border-t border-gray-100 bg-white pb-4 pt-2 md:hidden">
				<div class="space-y-1">
					{#each links as link}
						<a
							href={link.href}
							onclick={closeMenu}
							class="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
						>
							{link.name}
						</a>
					{/each}
				</div>
				
				<div class="mt-4 space-y-2 border-t border-gray-100 pt-4">
					{#if user}
						<div class="px-3 py-2">
							<div class="flex items-center space-x-2 text-sm text-gray-700">
								<User class="w-4 h-4" />
								<span>{user.email}</span>
							</div>
						</div>
						<a
							href="/cart"
							onclick={closeMenu}
							class="block rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							Cart
						</a>
						<button
							onclick={() => { handleLogout(); closeMenu(); }}
							class="w-full rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-red-700"
						>
							Logout
						</button>
					{:else}
						<a
							href="/login"
							onclick={closeMenu}
							class="block rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
						>
							Login
						</a>
						<a
							href="/register"
							onclick={closeMenu}
							class="block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
						>
							Register
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>
