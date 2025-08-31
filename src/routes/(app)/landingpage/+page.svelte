<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Store, MoveRight, Briefcase, GraduationCap, Star, Play, Users, Award, Heart, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from '@lucide/svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import BoxReveal from "$lib/app/boxreveal/boxreveal.svelte";
    import { Card } from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { CardContent } from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let isPlaying = $state(false);
	let isMuted = $state(false);
	let isFullscreen = $state(false);
	let videoElement: HTMLVideoElement | null = null;

	onMount(() => {
		videoElement = document.getElementById('landingpage-carousel-video') as HTMLVideoElement;
		if (videoElement) {
			videoElement.addEventListener('play', () => isPlaying = true);
			videoElement.addEventListener('pause', () => isPlaying = false);
			videoElement.addEventListener('volumechange', () => isMuted = videoElement!.muted);
			document.addEventListener('fullscreenchange', () => {
				if (videoElement) {
					isFullscreen = !!document.fullscreenElement && document.fullscreenElement === videoElement;
				}
			});
		}
	});

	function toggleVideo() {
		if (!videoElement) {
			videoElement = document.getElementById('landingpage-carousel-video') as HTMLVideoElement;
		}
		if (videoElement) {
			if (videoElement.paused) {
				videoElement.play();
				videoElement.muted = isMuted;
			} else {
				videoElement.pause();
			}
		}
	}

	function toggleMute() {
		if (!videoElement) {
			videoElement = document.getElementById('landingpage-carousel-video') as HTMLVideoElement;
		}
		if (videoElement) {
			videoElement.muted = !videoElement.muted;
			isMuted = videoElement.muted;
		}
	}

	function toggleFullscreen() {
		if (!videoElement) {
			videoElement = document.getElementById('landingpage-carousel-video') as HTMLVideoElement;
		}
		if (videoElement) {
			if (!document.fullscreenElement) {
				videoElement.requestFullscreen();
			} else if (document.fullscreenElement === videoElement) {
				document.exitFullscreen();
			}
		}
	}

	const municipality = [
		{
			municipality: 'Limay',
			src: '/img/limay.webp'
		},
		{
			municipality: 'Balanga',
			src: '/img/balanga.webp'
		},
		{
			municipality: 'Samal',
			src: '/img/samal.webp'
		},
		{
			municipality: 'Mariveles',
			src: '/img/mariveles.webp'
		},
		{
			municipality: 'Bagac',
			src: '/img/bagac.webp'
		},
		{
			municipality: 'Morong',
			src: '/img/morong.webp'
		},
		{
			municipality: 'Hermosa',
			src: '/img/hermosa.webp'
		},
		{
			municipality: 'Orion',
			src: '/img/orion.webp'
		},
		{
			municipality: 'Pilar',
			src: '/img/pilar.webp'
		},
		{
			municipality: 'Abucay',
			src: '/img/abucay.webp'
		},
		{
			municipality: 'Dinalupihan',
			src: '/img/dinalupihan.webp'
		},
		{
			municipality: 'Orani',
			src: '/img/orani.webp'
		}
	];

    const testimonials = [
		{
			name: "Christian L. Obispo",
			role: "APCAS Instructor",
			quote:
				"KayaCo has been a game-changer for our students. The platform provides genuine opportunities and builds real confidence.",
			tag: "Education Impact",
			stars: 5,
			img: "/img/k-mart.jpg",
			classes: {
				border: "hover:border-blue-200",
				ring: "ring-blue-100",
				gradient: "from-blue-600/20",
				text: "text-blue-600",
			},
		},
		{
			name: "Marcus Rodriguez",
			role: "K Mart Seller",
			quote:
				"Through K Mart, I've turned my woodworking passion into a thriving business. The support here is incredible.",
			tag: "Business Success",
			stars: 5,
			img: "/img/k-mart.jpg",
			classes: {
				border: "hover:border-green-200",
				ring: "ring-green-100",
				gradient: "from-green-600/20",
				text: "text-green-600",
			},
		},
		{
			name: "Sarah Chen",
			role: "K Pability Graduate",
			quote:
				"The accessible courses helped me develop new skills. Now I'm working in tech and loving every minute!",
			tag: "Career Growth",
			stars: 5,
			img: "/img/k-mart.jpg",
			classes: {
				border: "hover:border-purple-200",
				ring: "ring-purple-100",
				gradient: "from-purple-600/20",
				text: "text-purple-600",
			},
		},
		{
			name: "David Park",
			role: "Kaya Connect User",
			quote:
				"Kaya Connect matched me with an amazing employer who values my abilities. I finally found where I belong.",
			tag: "Employment Success",
			stars: 4,
			img: "/img/k-mart.jpg",
			classes: {
				border: "hover:border-orange-200",
				ring: "ring-orange-100",
				gradient: "from-orange-600/20",
				text: "text-orange-600",
			},
		},
	];	

	let { data } = $props();
	let { products } = data;

</script>

<main class="min-h-screen">
	
	<!-- Enhanced Hero Section -->
<section id="main-content" class="relative px-6 py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse"></div>
		<div class="absolute top-40 right-20 w-24 h-24 bg-indigo-300/30 rounded-full blur-xl animate-pulse delay-1000"></div>
		<div class="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-200/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
		<div class="absolute top-1/2 right-10 w-16 h-16 bg-emerald-300/20 rounded-full blur-lg animate-bounce delay-3000"></div>
		<div class="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-300/15 rounded-full blur-xl animate-pulse delay-4000"></div>
	</div>

	<div class="max-w-7xl mx-auto relative z-10">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<div class="max-w-2xl">
				<div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-200/50 backdrop-blur-sm">
					<span class="animate-pulse mr-2">🤝</span>
					Affiliated with SATAMAKABA
				</div>
				<h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
					Your path to 
					<span class="relative">
						<span class="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text animate-gradient-x">
							Inclusion
						</span>
						<svg class="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
							<path d="M2 6 C20 2 40 10 60 6 C80 2 100 10 120 6 C140 2 160 10 180 6"
								  stroke="url(#gradient)" stroke-width="3" fill="none" class="animate-pulse"/>
							<defs>
								<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" style="stop-color:#3B82F6"/>
									<stop offset="50%" style="stop-color:#8B5CF6"/>
									<stop offset="100%" style="stop-color:#EC4899"/>
								</linearGradient>
							</defs>
						</svg>
					</span>
					starts here.
				</h1>
				<p class="text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed">
					An Online Space for 
					<span class="text-blue-600 font-semibold relative">
						People With Disabilities
						<span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
					</span>
				</p>
				<p class="text-gray-600 text-lg mb-12 leading-relaxed">
					Empowering persons with disabilities through education, employment, and enterprise. 
					Join people who have found their path to success and discovered their true potential.
				</p>
				
				<div class="flex flex-col sm:flex-row gap-4 mb-8">
					<a href="/login"
						class="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
						<span class="relative z-10 flex items-center justify-center gap-2">
							Get Started Today
							<MoveRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</span>
						<div class="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</a>
					<button
						class="group border-2 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/80 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
						onclick={() => {
							if (!videoElement) {
								videoElement = document.getElementById('landingpage-carousel-video') as HTMLVideoElement;
							}
							if (videoElement) {
								videoElement.play();
								videoElement.muted = isMuted;
							}
						}}
					>
						<Play class="w-5 h-5 group-hover:scale-110 transition-transform" />
						Watch Our Story
					</button>
				</div>
			</div>

			<div class="relative">
				<div class="relative">
					<div class="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-70 animate-pulse"></div>
					<div class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group">
						<video
							bind:this={videoElement}
							class="w-full h-full object-cover"
							src="vid/carousel.mp4"
							poster="/img/thumbnail.png"
							controls={false}
							autoplay={false}
							playsinline
							muted={isMuted}
							loop
							id="landingpage-carousel-video"
						></video>
						
						<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
						
						<div class="absolute inset-0 flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pb-6">
							<div class="flex gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
								<Button
									class="p-3 rounded-full hover:scale-110 transition-transform"
									onclick={toggleVideo}
									aria-label={isPlaying ? "Pause video" : "Play video"}
								>
									{#if isPlaying}
										<Pause class="w-6 h-6 text-blue-600" />
									{:else}
										<Play class="w-6 h-6 text-blue-600" />
									{/if}
								</Button>
								<Button
									class="p-3 rounded-full hover:scale-110 transition-transform"
									onclick={toggleMute}
									aria-label={isMuted ? "Unmute video" : "Mute video"}
								>
									{#if isMuted}
										<VolumeX class="w-6 h-6 text-blue-600" />
									{:else}
										<Volume2 class="w-6 h-6 text-blue-600" />
									{/if}
								</Button>
								<Button
									class="p-3 rounded-full hover:scale-110 transition-transform"
									onclick={toggleFullscreen}
									aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
								>
									{#if isFullscreen}
										<Minimize2 class="w-6 h-6 text-blue-600" />
									{:else}
										<Maximize2 class="w-6 h-6 text-blue-600" />
									{/if}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="relative px-6 py-20 bg-gradient-to-b from-white to-gray-50">
	<div class="max-w-7xl mx-auto mb-16">
		<div class="text-center">
			<div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-200/50">
				⚙️ Our Core Services
			</div>
			<h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
				Empowering Through <span class="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Three Pillars</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				We believe everyone deserves equal opportunities. Our platform provides the tools, support, and community needed to thrive in today's world.
			</p>
		</div>
	</div>

	<div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      
            <!-- Kaya Connect -->
            <div class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:-translate-y-2">
              <div class="flex items-center justify-center h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div class="relative z-10 p-6">
                  <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Users class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div class="p-6 flex flex-col flex-1">
                <span class="text-xs font-bold uppercase text-blue-500 tracking-wider">Employment</span>
                <h3 class="mt-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Kaya-Connect</h3>
                <p class="mt-3 text-gray-600 flex-1 leading-relaxed">
                  Connect with inclusive employers who truly value diverse talents and create meaningful career opportunities tailored for everyone.
                </p>
                <a href="/courses" class="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:gap-2 transition-all">
                  Learn more
                  <MoveRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
      
            <!-- K Mart -->
            <div class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-green-200 transition-all duration-500 hover:-translate-y-2">
              <div class="flex items-center justify-center h-48 bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div class="relative z-10 p-6">
                  <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Store class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div class="p-6 flex flex-col flex-1">
                <span class="text-xs font-bold uppercase text-green-500 tracking-wider">E-Commerce</span>
                <h3 class="mt-2 text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">K-Mart</h3>
                <p class="mt-3 text-gray-600 flex-1 leading-relaxed">
                  Showcase and sell unique products crafted with passion and skill by our talented community members from across the Philippines.
                </p>
                <a href="/kmart" class="mt-6 inline-flex items-center text-green-600 hover:text-green-700 font-semibold group-hover:gap-2 transition-all">
                  Explore products
                  <MoveRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
      
            <!-- K Pability -->
            <div class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-purple-200 transition-all duration-500 hover:-translate-y-2">
              <div class="flex items-center justify-center h-48 bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div class="relative z-10 p-6">
                  <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <GraduationCap class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div class="p-6 flex flex-col flex-1">
                <span class="text-xs font-bold uppercase text-purple-500 tracking-wider">Education</span>
                <h3 class="mt-2 text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">K-Pability</h3>
                <p class="mt-3 text-gray-600 flex-1 leading-relaxed">
                  Access comprehensive, accessible learning courses designed with universal principles to help everyone develop new skills and capabilities.
                </p>
                <a href="/courses" class="mt-6 inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold group-hover:gap-2 transition-all">
                  Start learning
                  <MoveRight class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
      
          </div>

		<div class="text-center mt-16">
			<div class="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				<Users class="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
				<span class="relative z-10">Join Our Community Today</span>
				<MoveRight class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
			</div>
		</div>
	</div>
</section>

<!-- Product Creation Process Section -->
<section class="px-6 py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full text-sm font-medium mb-6 border border-emerald-200/50">
          🌱 Inclusive Crafting
        </div>
        <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
          How Our <span class="text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text">Products Are Made</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          From peanut butter to t-shirts, discover the inspiring process behind handcrafted products —
          all made with dedication by <span class="font-semibold text-emerald-700">People with Disabilities</span>.
        </p>
      </div>
  
      <!-- Products Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each [
          { name: "Peanut Butter", img: "/img/peanut.jpg", steps: "Roasting, grinding, and packaging natural peanuts." },
          { name: "Walis", img: "/img/walis.jpg", steps: "Harvesting grass, binding, and finishing traditional Filipino brooms." },
          { name: "Bead Bracelets", img: "/img/bracelet.jpg", steps: "Designing, threading, and polishing unique handmade beads." },
          { name: "Paintings", img: "/img/painting.jpg", steps: "Sketching, painting, and framing creative artworks." },
          { name: "Mixed Nuts", img: "/img/mixed nuts.jpg", steps: "Sorting, roasting, and sealing nutritious snacks." },
          { name: "Printed Mugs", img: "/img/mugs.jpg", steps: "Design printing, heat press, and careful packaging." },
          { name: "T-Shirt Printing", img: "/img/tshirt.jpg", steps: "Layout, printing, and quality-checking custom shirts." },
          { name: "Dishwashing Liquid", img: "/img/dishwashing.jpg", steps: "Mixing, bottling, and labeling eco-friendly soap." }
        ] as product, i}
          <Card class="rounded-3xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden flex flex-col h-full">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img src={product.img} alt={product.name} class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <div class="absolute top-3 left-3">
                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                  Made by PWDs
                </span>
              </div>
            </div>
            <CardContent class="p-6 flex flex-col flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p class="text-gray-600 text-sm mb-4 flex-1">{product.steps}</p>
              <div class="mt-auto">
                <Button 
                  class="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg"
                  style={product.name === "Peanut Butter" ? "margin-top:0 !important;" : ""}
                >
                  Support Their Craft
                </Button>
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
  </section>

<!-- Featured Products Section -->
<section class="px-6 py-20 bg-gradient-to-br from-white to-gray-50">
    <div class="mx-auto max-w-7xl">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium mb-6 border border-green-200/50">
          <Store class="w-4 h-4 mr-2" />
          Featured Marketplace
        </div>
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
          Crafted with <span class="text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">Passion</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Products proudly made by <span class="font-semibold text-emerald-700">People with Disabilities</span> across our municipalities.
        </p>
      </div>
  
      <!-- Municipalities Carousel -->
      <div class="mb-12">
        <Carousel.Root opts={{ align: "start" }} class="w-full">
          <Carousel.Content>
            {#each Array(Math.ceil(municipality.length / 6)) as _, i (i)}
              <Carousel.Item>
                <div class="flex flex-wrap justify-center gap-3">
                  {#each municipality.slice(i * 6, i * 6 + 6) as place}
                    <div class="group flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm hover:shadow-lg hover:border-green-300 hover:bg-green-50 transition-all duration-300 cursor-pointer">
                      <div class="relative">
                        <img
                          src={place.src}
                          alt={place.municipality}
                          class="h-8 w-8 rounded-full object-cover ring-2 ring-white group-hover:ring-green-300 transition-all"
                        />
                      </div>
                      <span class="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                        {place.municipality}
                      </span>
                    </div>
                  {/each}
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous class="left-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-green-400" />
          <Carousel.Next class="right-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-green-400" />
        </Carousel.Root>
      </div>
  
      <!-- Products Grid -->
      <div class="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
        {#each products.slice(0, 8) as product}
          <Card class="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <!-- Product Image -->
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                src={product.imageSrc}
                alt={product.title}
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <Badge variant="outline" class="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700">
                  {product.category}
                </Badge>
              </div>
              <!-- Overlay Action -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button size="icon" variant="secondary" class="rounded-full shadow-lg">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 
                         4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </Button>
              </div>
            </div>
  
            <!-- Product Content -->
            <CardContent class="p-5">
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                {product.title}
              </h3>
              <p class="text-xs text-gray-500 mb-3">{product.category}</p>
              <div class="flex items-center justify-between mb-4">
                <span class="text-lg font-bold text-green-600">₱{product.price}</span>
                <div class="text-right">
                  <span class="text-xs text-gray-500 block">Stock</span>
                  <span class="text-sm font-medium text-gray-700">{product.quantity}</span>
                </div>
              </div>
              <Button href="/kmart" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 font-semibold rounded-xl shadow-md hover:shadow-lg">
                View Product
              </Button>
            </CardContent>
          </Card>
        {/each}
      </div>
  
      <!-- View All CTA -->
      <div class="text-center mt-12">
        <Button href="/kmart" class="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <Store class="w-5 h-5 mr-2" />
          Explore All Products
        </Button>
      </div>
    </div>
  </section>
  

<section class="px-4 py-12 md:px-8 lg:px-32 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-20 right-20 w-56 h-56 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
	</div>
	
	<div class="mx-auto max-w-7xl relative z-10">
		<div class="mb-16 text-center">
			<div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-medium mb-6 border border-amber-200/50">
				<Star class="w-4 h-4 mr-2 fill-amber-500" />
				Community's Voices
			</div>
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
				What Our <span class="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Community</span> Says
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Real stories of transformation, growth, and success from people who found their path through KayaCo's inclusive platform
			</p>
		</div>

		<!-- Enhanced Testimonials Carousel -->
		<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
	<Carousel.Content class="-ml-2 md:-ml-4">
		{#each testimonials as testimonial}
			<Carousel.Item class="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
				<div
					class={`group h-full rounded-3xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${testimonial.classes.border} relative overflow-hidden`}
				>
					<!-- Background decoration -->
					<div class={`absolute top-0 right-0 w-24 h-24 ${testimonial.classes.gradient} to-transparent rounded-full -translate-y-12 translate-x-12 opacity-20`}></div>
					
					<div class="flex items-start gap-4 mb-6 relative z-10">
						<div
							class={`relative h-14 w-14 overflow-hidden rounded-full ring-4 ${testimonial.classes.ring} group-hover:scale-110 transition-transform duration-300`}
						>
							<img src={testimonial.img} alt={testimonial.name} class="h-full w-full object-cover" />
							<div
								class={`absolute inset-0 rounded-full bg-gradient-to-t ${testimonial.classes.gradient} to-transparent opacity-30`}
							></div>
						</div>
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-2">
								<h4 class="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
								<div class="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
								<span class="text-sm text-gray-600 font-medium">{testimonial.role}</span>
							</div>
							<div class="flex items-center gap-1 mb-3">
								{#each Array(testimonial.stars) as _}
									<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
								{/each}
								{#each Array(5 - testimonial.stars) as _}
									<Star class="h-4 w-4 text-gray-300" />
								{/each}
							</div>
						</div>
					</div>
					<blockquote class="text-gray-700 leading-relaxed mb-6 text-lg font-medium italic relative z-10">
						"{testimonial.quote}"
					</blockquote>
					<div class={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${testimonial.classes.text} bg-gradient-to-r ${testimonial.classes.gradient} to-transparent relative z-10`}>
						<Award class="w-4 h-4 mr-2" />
						{testimonial.tag}
					</div>
				</div>
			</Carousel.Item>
				{/each}
			</Carousel.Content>
			
			<!-- Enhanced Navigation -->
			<div class="flex items-center justify-center gap-4 mt-12">
				<Carousel.Previous class="static translate-y-0 h-12 w-12 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl" />
				
				<Carousel.Next class="static translate-y-0 h-12 w-12 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl" />
			</div>
		</Carousel.Root>

	</div>
</section>

</main>

<style>
	@keyframes gradient-x {
		0%, 100% {
			background-size: 200% 200%;
			background-position: left center;
		}
		50% {
			background-size: 200% 200%;
			background-position: right center;
		}
	}
	
	.animate-gradient-x {
		animation: gradient-x 3s ease infinite;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>