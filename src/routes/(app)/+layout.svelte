<script lang="ts">
	import Navbar from '$lib/app/navbar/navbar.svelte';
	import Footer from '$lib/app/navbar/footer.svelte';
	import { ModeWatcher } from "mode-watcher";
	import FontAccessibility from '$lib/accessibility/FontAccessibility.svelte';
	let { children, data } = $props();
</script>
<ModeWatcher />
<FontAccessibility/>
<Navbar user={data.user} />
{@render children()}
<Footer />
