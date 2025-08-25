<script>
	// Access Keys Table
	let accessKeys = [
		{ key: "Alt+0", function: "Accessibility Statement (this page)" },
		{ key: "Alt+1", function: "Home Page" },
		{ key: "Alt+3", function: "Skip to Content" },
		{ key: "Alt+4", function: "Skip to Menu" },
		{ key: "Alt+5", function: "Skip to Bottom" },
		{ key: "Alt+6", function: "Decrease Font Size" },
		{ key: "Alt+7", function: "Return to Default Font Size" },
		{ key: "Alt+8", function: "Increase Font Size" },
		{ key: "Alt+C", function: "Contact Information" },
		{ key: "Alt+M", function: "Sitemap" }
	];

	// Browser Shortcuts Table
	let browserKeys = [
		{ browser: "Internet Explorer", keys: "ALT + access key + ENTER" },
		{ browser: "Mozilla Firefox", keys: "ALT + SHIFT + access key" },
		{ browser: "Google Chrome / Netscape / Safari", keys: "ALT + access key" },
		{ browser: "Opera", keys: "SHIFT + ESC + access key" }
	];

	// Accordion Sections
	let sections = [
		{
			title: "Access Keys",
			open: true
		},
		{
			title: "Reserved Keys",
			open: false
		},
		{
			title: "Related Resources",
			open: false
		}
	];

	/**
	 * @param {number} index
	 */
	function toggleSection(index) {
		sections[index].open = !sections[index].open;
	}
</script>

<div  id="main-content" class="p-8 max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold mb-2">Accessibility Features</h1>
	

	<p class="mb-4">
		The KayaCo Online Market aims to provide a website that delivers essential information to all people, 
		regardless of their technology or abilities. We are committed to improving the accessibility and usability 
		of our website in accordance with established standards and guidelines.
	</p>
	

	<!-- Accordion -->
	<div class="mt-6">
		{#each sections as section, i}
			<div class="border-b py-2">
				<button
					on:click={() => toggleSection(i)}
					class="flex items-center w-full text-left text-blue-600 hover:underline"
				>
					<span class="mr-2 transform transition-transform duration-200"
						class:rotate-90={section.open}></span>
					{section.title}
				</button>

				{#if section.open}
					<div class="mt-2 ml-6">
						{#if section.title === "Access Keys"}
							<table class="w-full border border-gray-300 mb-6">
								<thead class="bg-gray-200">
									<tr>
										<th class="p-2 border">Access Keys</th>
										<th class="p-2 border">Functions</th>
									</tr>
								</thead>
								<tbody>
									{#each accessKeys as item, i}
										<tr class="odd:bg-white even:bg-gray-50">
											<td class="p-2 border text-center font-mono">{item.key}</td>
											<td class="p-2 border">{item.function}</td>
										</tr>
									{/each}
								</tbody>
							</table>
							<p class="mb-6 text-sm text-gray-700">
								The TAB key can be used to move from one link into another and Enter key to go to the selected link.
							</p>
						{/if}

						{#if section.title === "Reserved Keys"}
							<p class="text-gray-700 mb-4">
								Some keys are reserved for browser or system use and cannot be reassigned.  
								Example: <strong>ALT+F4</strong> (close window).
							</p>
						{/if}

						{#if section.title === "Related Resources"}
							<ul class="list-disc ml-6 text-gray-700">
								<li><a href="/" class="text-blue-600 underline">PWAG Accessibility Guidelines</a></li>
								<li><a href="/" class="text-blue-600 underline">WCAG Standards</a></li>
								<li><a href="/" class="text-blue-600 underline">Section 508</a></li>
							</ul>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Browser Keys Table -->
	<h2 class="text-2xl font-semibold mt-8 mb-4">For Windows</h2>
	<table class="w-full border border-gray-300">
		<thead class="bg-gray-200">
			<tr>
				<th class="p-2 border">Browser</th>
				<th class="p-2 border">Access Key</th>
			</tr>
		</thead>
		<tbody>
			{#each browserKeys as item, i}
				<tr class="odd:bg-white even:bg-gray-50">
					<td class="p-2 border">{item.browser}</td>
					<td class="p-2 border font-mono">{item.keys}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	button span {
		display: inline-block;
	}
</style>