<script lang="ts">
	import Navbar from '$lib/app/navbar/navbar.svelte';
	import Footer from '$lib/app/navbar/footer.svelte';
	import { ModeWatcher } from "mode-watcher";
	import FontAccessibility from '$lib/accessibility/FontAccessibility.svelte';
	let { children } = $props();
</script>
<ModeWatcher />
<FontAccessibility/>
<Navbar />
{@render children()}
<Footer />
