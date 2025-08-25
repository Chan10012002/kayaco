<script lang="ts">
	import Navbar from '$lib/app/navbar/navbar.svelte';
	import { ModeWatcher } from "mode-watcher";
	import FontAccessibility from '$lib/accessibility/FontAccessibility.svelte';
	let { children } = $props();
</script>
<ModeWatcher />
<FontAccessibility/>
<Navbar />
{@render children()}
