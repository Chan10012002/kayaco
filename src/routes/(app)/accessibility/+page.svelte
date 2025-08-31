<script lang="ts">
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
		{ key: "Alt+M", function: "Sitemap" }
	];
</script>

<div id="main-content" class="p-8 max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold mb-6">Accessibility Features</h1>

	<p class="mb-8 text-gray-700 leading-relaxed">
		The KayaCo Online Market is committed to ensuring that our website is accessible to all users, 
		including people with disabilities. We continuously work to improve accessibility in line with 
		recognized standards and best practices.
	</p>

	<!-- Access Keys Table -->
	<div class="bg-gray-100 border border-gray-300 rounded-xl shadow-md overflow-hidden mb-10">
		<div class="bg-gray-300 p-4">
			<h2 class="text-xl font-semibold text-black">Keyboard Access Keys</h2>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm text-left text-black">
				<thead class="bg-gray-200 uppercase text-xs">
					<tr>
						<th class="px-6 py-3">Key Combination</th>
						<th class="px-6 py-3">Function</th>
					</tr>
				</thead>
				<tbody>
					{#each accessKeys as item, i}
						<tr class="border-b last:border-0 odd:bg-white even:bg-gray-5 transition">
							<td class="px-6 py-3 font-mono font-semibold">{item.key}</td>
							<td class="px-6 py-3">{item.function}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="p-4 text-sm text-gray-800 border-t bg-gray-200">
			Use <strong>TAB</strong> to move between links and <strong>ENTER</strong> to activate a selected link.
		</p>
	</div>

	<!-- Reporting Accessibility Problems -->
	<div class="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm text-black">
		<h2 class="text-2xl font-semibold mb-3">Reporting Accessibility Problems</h2>
		<p class="mb-4 leading-relaxed">
			We welcome your feedback on the accessibility of KayaCo as we work to improve.  
			Please let us know if our website or products do not work as you would expect them to.
		</p>

		<ul class="space-y-2">

			<li><strong>Email:</strong> kayaco1@gmail.com</li>
			<li><strong>Address:</strong> Ibayo, Balanga City, Bataan</li>
		</ul>

		<p class="mt-4 text-sm">
			This statement applies to content published within the KayaCo domain and subdomains, 
			for example <span class="font-medium">www.market.kayaco.com</span>.
		</p>
	</div>
</div>
