<script lang="ts">
	import { FacebookIcon, MailIcon, InstagramIcon } from '@lucide/svelte';
  </script>
  
  <footer id="page-bottom" class="bg-gradient-to-br from-gray-900 via-blue-950 to-emerald-900 text-gray-300 px-6 py-12 lg:px-24 lg:py-16 relative overflow-hidden">
	<!-- Subtle background accents -->
	<div class="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
	<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
  
	<div class="relative z-10 mx-auto max-w-7xl">
	  <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
		<!-- Learn -->
		<div>
		  <h3 class="mb-4 text-lg font-semibold text-white">Learn</h3>
		  <ul class="space-y-2 text-sm">
			<li><a href="/kmart/track-order" class="hover:text-emerald-400 transition-colors">Track your Order</a></li>
			<li><a href="/faq" class="hover:text-emerald-400 transition-colors">FAQs</a></li>
			<li><a href="/sitemap" class="hover:text-emerald-400 transition-colors">Sitemap</a></li>
		  </ul>
		</div>
  
		<!-- More -->
		<div>
		  <h3 class="mb-4 text-lg font-semibold text-white">More from KayaCo</h3>
		  <ul class="space-y-2 text-sm">
			<li><a href="/login" class="hover:text-emerald-400 transition-colors">Sign In</a></li>
			<li><a href="/location" class="hover:text-emerald-400 transition-colors">Locations</a></li>
			<li><a href="/about" class="hover:text-emerald-400 transition-colors">About Us</a></li>
		  </ul>
		</div>
  
		<!-- Partner -->
		<div>
		  <h3 class="mb-4 text-lg font-semibold text-white">Partnered with</h3>
		  <img src="/img/satamakaba-logo.png" alt="Satamakaba Logo" class="h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-white p-2 shadow-md" />
		</div>
  
	<!-- Contact -->
		<div class="flex flex-col items-center sm:items-start lg:items-end">
		  <h3 class="mb-4 text-lg font-semibold text-white">Contact Us</h3>
		  <div class="flex space-x-3">
			<a href="https://www.facebook.com/profile.php?id=61557218956953" target="_blank" rel="noopener noreferrer" class="group">
			  <FacebookIcon class="h-9 w-9 rounded-full bg-white/10 p-2 text-white group-hover:bg-emerald-500 group-hover:scale-110 transition-all" />
			</a>
			<a href="/" aria-label="Email" class="group">
			  <MailIcon class="h-9 w-9 rounded-full bg-white/10 p-2 text-white group-hover:bg-emerald-500 group-hover:scale-110 transition-all" />
			</a>
			<a href="/" aria-label="Instagram" class="group">
			  <InstagramIcon class="h-9 w-9 rounded-full bg-white/10 p-2 text-white group-hover:bg-emerald-500 group-hover:scale-110 transition-all" />
			</a>
		  </div>
		</div>
	  </div>
  
  
	  <!-- Divider -->
	  <div class="mt-10 border-t border-white/10 pt-6">
		<div class="flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
		  <span class="font-medium text-gray-400">© ApcasTech | 2025</span>
		  <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
			<a href="/tos" class="hover:text-emerald-400 transition-colors">Terms of Service</a>
			<a href="/privacypolicy" class="hover:text-emerald-400 transition-colors">Privacy Policy</a>
			<a href="/returnpolicy" class="hover:text-emerald-400 transition-colors">Refund Policy</a>
			<a href="/accessibility" class="hover:text-emerald-400 transition-colors">Accessibility</a>
		  </div>
		</div>
	  </div>
	</div>
  </footer>
  
