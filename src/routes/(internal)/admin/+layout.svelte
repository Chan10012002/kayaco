<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/app/sidebar/app-sidebar.svelte';
	import AdminStats from '$lib/app/admin-stats/AdminStats.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<Sidebar.Trigger />
		<AdminStats />
		{@render children?.()}
	</main>
</Sidebar.Provider>
