<script lang="ts">
  import Boxreveal from "$lib/app/boxreveal/boxreveal.svelte";
</script>

	<section class="px-4 py-8 md:px-8 lg:px-32 md:py-16">
	  <div class="mx-auto max-w-1x2">
		<Boxreveal boxColor={"#5046e6"} duration={0.5}>
			<h1 class="text-5xl font-bold mb-6 text-[#020106]">Sitemap</h1>
		</Boxreveal>
		<div class="mt-8 flex flex-col gap-8 md:flex-row md:gap-16">
			<ul class="flex flex-wrap gap-4 text-lg md:flex-col md:gap-4">
				<li>
					<a href="/" class="text-blue-700 hover:underline font-medium">Home</a>
				</li>
				<li>
					<a href="/register" class="text-blue-700 hover:underline font-medium">Register</a>
				</li>
				<li>
					<a href="/login" class="text-blue-700 hover:underline font-medium">Login</a>
				</li>
				<li>
					<a href="/ayo" class="text-blue-700 hover:underline font-medium">About KayaCo</a>
				</li>
				<li>
					<a href="/kmart" class="text-blue-700 hover:underline font-medium">K Mart (Marketplace)</a>
				</li>
				<li>
					<a href="/connect" class="text-blue-700 hover:underline font-medium">Kaya Connect (Jobs)</a>
				</li>
				<li>
					<a href="/learn" class="text-blue-700 hover:underline font-medium">K Pability (Learning)</a>
				</li>
				<li>
					<a href="/profile" class="text-blue-700 hover:underline font-medium">Profile</a>
				</li>
				<li>
					<a href="/sitemap" class="text-blue-700 hover:underline font-medium">Sitemap</a>
				</li>
			</ul>
			<div class="md:mt-0">
				<h2 class="text-2xl font-semibold mb-2">Other Resources</h2>
				<ul class="flex flex-wrap gap-2 text-base md:flex-col md:gap-2">
					<li>
						<a href="/faq" class="text-blue-600 hover:underline">FAQ</a>
					</li>
					<li>
						<a href="/contact" class="text-blue-600 hover:underline">Contact</a>
					</li>
					<li>
						<a href="/terms" class="text-blue-600 hover:underline">Terms of Service</a>
					</li>
					<li>
						<a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>
					</li>
				</ul>
			</div>
		</div>
	  </div>
	</section>