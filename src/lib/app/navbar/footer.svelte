<script lang="ts">
	import { FacebookIcon, MailIcon, InstagramIcon } from '@lucide/svelte';
</script>

<footer class="bg-blue-200 px-4 py-8 text-blue-900 sm:px-6 lg:px-24 lg:py-12">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-2 gap-4 text-center sm:gap-8 sm:text-left lg:grid-cols-4">
			<div>
				<h3 class="mb-2 text-base font-semibold lg:mb-4 lg:text-lg">Learn</h3>
				<ul class="space-y-1 text-xs lg:space-y-2 lg:text-base">
					<li><a href="/" class="transition-colors hover:text-blue-700 hover:underline">How to Order</a></li>
					<li><a href="/kmart/track-order" class="transition-colors hover:text-blue-700 hover:underline">Track your Order</a></li>
					<li><a href="/faq" class="transition-colors hover:text-blue-700 hover:underline">FAQs</a></li>
					<li><a href="/sitemap" class="transition-colors hover:text-blue-700 hover:underline">Sitemap</a></li>
				</ul>
			</div>

			<div>
				<h3 class="mb-2 text-base font-semibold lg:mb-4 lg:text-lg">More from KayaCo</h3>
				<ul class="space-y-1 text-xs lg:space-y-2 lg:text-base">
					<li><a href="/login" class="transition-colors hover:text-blue-700 hover:underline">Sign In</a></li>
					<li><a href="/location" class="transition-colors hover:text-blue-700 hover:underline">Locations</a></li>
					<li><a href="/about" class="transition-colors hover:text-blue-700 hover:underline">About Us</a></li>
					
				</ul>
			</div>

			<div class="flex flex-col items-center sm:items-start lg:items-start">
				<h3 class="mb-2 text-base font-semibold lg:mb-4 lg:text-lg">Partnered with</h3>
				<img src="/img/satamakaba-logo.png" alt="Satamakaba Logo" class="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
			</div>

			<div class="flex flex-col items-center sm:items-start lg:items-end">
				<h3 class="mb-2 text-base font-semibold lg:mb-4 lg:text-lg">Contact us</h3>
				<div class="flex space-x-2 lg:space-x-3">
					<a href="/" class="group transition-transform hover:scale-110" aria-label="Facebook">
						<FacebookIcon class="h-8 w-8 rounded-full bg-blue-900 p-1.5 text-white transition-colors group-hover:bg-blue-800 lg:h-10 lg:w-10 lg:p-2" />
					</a>
					<a href="/" class="group transition-transform hover:scale-110" aria-label="Email">
						<MailIcon class="h-8 w-8 rounded-full bg-blue-900 p-1.5 text-white transition-colors group-hover:bg-blue-800 lg:h-10 lg:w-10 lg:p-2" />
					</a>
					<a href="/" class="group transition-transform hover:scale-110" aria-label="Instagram">
						<InstagramIcon class="h-8 w-8 rounded-full bg-blue-900 p-1.5 text-white transition-colors group-hover:bg-blue-800 lg:h-10 lg:w-10 lg:p-2" />
					</a>
				</div>
			</div>
		</div>

		<div class="mt-6 border-t border-blue-300 pt-6 lg:mt-8 lg:pt-8">
			<div class="flex flex-col items-center space-y-3 text-center text-xs text-blue-800 sm:flex-row sm:justify-between sm:space-y-0 sm:text-left lg:text-sm">
				<span class="font-medium">ApcasTech | 2025</span>
				<div class="flex flex-wrap justify-center gap-x-3 gap-y-1 sm:justify-end">
					<a href="/tos" class="transition-colors hover:text-blue-600 hover:underline">Terms of Service</a>
					<span class="text-blue-400">|</span>
					<a href="/" class="transition-colors hover:text-blue-600 hover:underline">Privacy Policy</a>
					<span class="text-blue-400">|</span>
					<a href="/" class="transition-colors hover:text-blue-600 hover:underline">Refund Policy</a>
					<span class="text-blue-400">|</span>
					<a href="/accessibility" class="transition-colors hover:text-blue-600 hover:underline">Website Accessibility</a>
				</div>
			</div>
		</div>
	</div>
</footer>
