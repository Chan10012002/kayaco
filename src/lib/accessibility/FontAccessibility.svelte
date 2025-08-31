<script lang="ts">
	import { onMount } from 'svelte';
	import SunIcon from "@lucide/svelte/icons/sun";
	import PersonStanding from "@lucide/svelte/icons/person-standing";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import { toggleMode } from "mode-watcher";
	import Button from '$lib/components/ui/button/button.svelte';


	let fontScale = 1;
	let isActive = true; 
	let originalFontSizes = new Map();

	let isPanelOpen = false;

	onMount(() => {
		applyFontScaling();
		// Listen for access keys
		window.addEventListener("keydown", handleAccessKeys);
		return () => {
			window.removeEventListener("keydown", handleAccessKeys);
		};
	});

	function getAllTextElements() {
	const root = document.body;
	return Array.from(root.querySelectorAll('*')).filter(el => {
		const style = getComputedStyle(el);
		return style.fontSize && el.textContent?.trim();
		});
	}

	function applyFontScaling() {
		if (!isActive) return;
		getAllTextElements().forEach(el => {
			const htmlEl = el as HTMLElement;
			if (!originalFontSizes.has(htmlEl)) {
				originalFontSizes.set(htmlEl, getComputedStyle(htmlEl).fontSize);
			}
			const baseSize = parseFloat(originalFontSizes.get(htmlEl)!);
			htmlEl.style.fontSize = `${baseSize * fontScale}px`;
		});
	}

	function resetFontSizes() {
		originalFontSizes.forEach((size, el) => (el as HTMLElement).style.fontSize = size);
		originalFontSizes.clear();
	}

	function increaseFont() {
		fontScale = Math.min(fontScale + 0.1, 2);
		applyFontScaling();
	}

	function decreaseFont() {
		fontScale = Math.max(fontScale - 0.1, 0.8);
		applyFontScaling();
	}

	function resetFont() {
		fontScale = 1;
		if (isActive) applyFontScaling();
	}

	function toggleAccessibility() {
		isActive = !isActive;
		isActive ? applyFontScaling() : resetFontSizes();
	}

	function scrollToId(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			el.focus?.();
		}
	}

	// Handle access keys (Alt + key)
	function handleAccessKeys(e: KeyboardEvent) {
		if (!e.altKey) return;

		const key = e.key.toLowerCase();
		switch (key) {
			case "0":
				window.location.href = "/accessibility";
				break;
			case "1":
				window.location.href = "/"; // Home Page
				break;
			case "3":
				scrollToId("main-content");
				break;
			case "4":
				scrollToId("main-menu");
				break;
			case "5":
				scrollToId("page-bottom");
				break;
			case "6":
				decreaseFont();
				break;
			case "7":
				resetFont();
				break;
			case "8":
				increaseFont();
				break;
			case "m":
				window.location.href = "/sitemap"; // Change as needed
				break;
		}
	}
</script>

<!-- Toggle Button-->
<Button
	class="fixed z-50 top-64 left-0 rounded-r-2xl rounded-l-none bg-blue-600 text-white shadow-lg px-8 py-6 text-2xl"	
	style="border-top-right-radius: 1.5rem; border-bottom-right-radius: 1.5rem;"
	onclick={() => isPanelOpen = !isPanelOpen}
	aria-label={isPanelOpen ? "Close Accessibility Panel" : "Open Accessibility Panel"}
>
	<span class="sr-only">{isPanelOpen ? "Close Accessibility Panel" : "Open Accessibility Panel"}</span>
	<PersonStanding class="h-16 w-16 inline stroke-[3] stroke-current"/>
</Button>

<!-- Side Panel -->
<div
	class="fixed top-0 left-0 z-50 h-full w-80 max-w-full bg-white/95 dark:bg-gray-900/95 shadow-2xl border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out flex flex-col gap-3 p-6"
	style="transform: translateX({isPanelOpen ? '0' : '-100%'});"
	aria-hidden={!isPanelOpen}
	tabindex="-1"
>
	<div class="flex items-center justify-between mb-2">
		<h2 class="text-lg font-bold">Accessibility</h2>
		<Button
			variant="ghost"
			size="icon"
			onclick={() => isPanelOpen = false}
			aria-label="Close Accessibility Panel"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</Button>
	</div>

	<Button
		class="w-full text-sm font-semibold rounded-lg transition-colors duration-200"
		onclick={toggleAccessibility}
		variant={isActive ? 'default' : 'outline'}
		aria-pressed={isActive}
	>
		{isActive ? 'Disable' : 'Enable'} Text+
	</Button>

	<Button
		onclick={toggleMode}
		variant="ghost"
		size="icon"
		class="relative self-center"
		aria-label="Toggle theme"
	>
		<SunIcon class="h-5 w-5 transition-transform dark:-rotate-90 dark:scale-0" />
		<MoonIcon class="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
	</Button>

	{#if isActive}
		<div class="flex justify-between items-center gap-1 mt-2">
			<Button onclick={decreaseFont} disabled={fontScale <= 0.8} aria-label="Decrease font size" variant="secondary" size="sm">A-</Button>
			<Button onclick={resetFont} aria-label="Reset font size" variant="secondary" size="sm">A</Button>
			<Button onclick={increaseFont} disabled={fontScale >= 2} aria-label="Increase font size" variant="secondary" size="sm">A+</Button>
		</div>

		<p class="text-center text-xs text-gray-600 dark:text-gray-400 mt-1">
			Font Scale: {Math.round(fontScale * 100)}%
		</p>

		<!-- Skip Links -->
		<div class="flex flex-col gap-1 mt-2">
			<Button onclick={() => scrollToId('main-menu')} class="text-sm dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-2 py-1">Skip to Menu</Button>
			<Button onclick={() => scrollToId('main-content')} class="text-sm dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-2 py-1">Skip to Content</Button>
			<Button onclick={() => scrollToId('page-bottom')} class="text-sm dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-2 py-1">Skip to Bottom</Button>
		</div>
	{/if}
</div>

<style>
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	/* Hide panel visually when closed, but keep for transition */
	div[aria-hidden="true"] {
		pointer-events: none;
	}
</style>