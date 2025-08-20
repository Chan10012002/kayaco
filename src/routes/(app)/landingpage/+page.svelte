<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Store, MoveRight, Briefcase, GraduationCap, Star } from '@lucide/svelte';
	import * as Carousel from '$lib/components/ui/carousel';

	const carouselImg = [
		{
			src: '/img/satamakaba1.jpg'
		},
		{
			src: '/img/satamakaba2.jpg'
		},
		{
			src: '/img/satamakaba3.jpg'
		},
		{
			src: '/img/satamakaba4.jpg'
		}
	];

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

	let { data } = $props();

	let { products } = data;
</script>

<main class="min-h-screen">
	<!-- Hero Section -->
	<section class="px-4 py-8 text-center md:px-8 lg:px-32 md:py-16">
		<div class="mx-auto max-w-4xl space-y-6">
			<Button
				href="/login"
				class="mx-auto inline-flex items-center gap-2 rounded-full border-2 border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
			>
				🚀 Try kayaco now
			</Button>

			<h1 class="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-5xl lg:text-6xl">
				Your Path to Growth and 
				<span class="block">Opportunity. Kayaco Kayamo</span>
			</h1>

			<p class="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base md:text-lg">
				Empowering persons with disabilities through education, employment, and enterprise with KayaCo.
			</p>

			<div class="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
				<Button class="h-11 bg-blue-600 px-6 font-medium text-white hover:bg-blue-700" href="/register">
					Get Started
				</Button>
				<Button href="/kmart" variant="ghost" class="h-11 px-6 font-medium text-gray-700 hover:bg-gray-100">
					Check Market Place 
					<MoveRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	</section>

	<!-- Carousel Section -->
	<section class="px-4 py-8 md:px-8 lg:px-32">
		<div class="mx-auto max-w-6xl">
			<Carousel.Root class="w-full">
				<Carousel.Content>
					{#each carouselImg as img, i (i)}
						<Carousel.Item>
							<div class="px-2">
								<img 
									src={img.src} 
									alt="Carousel image {i + 1}" 
									class="h-56 w-full rounded-2xl object-cover shadow-lg sm:h-72 md:h-96 lg:h-[500px]" 
								/>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous class="left-4" />
				<Carousel.Next class="right-4" />
			</Carousel.Root>
		</div>
	</section>

	<!-- Top Products Section -->
	<section class="px-4 py-12 md:px-8 lg:px-32 md:py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-8 text-center">
				<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Top Products</h2>
				<p class="mt-2 text-gray-600">View the top products for each municipality</p>
			</div>

			<!-- Municipalities -->
			<div class="mb-12">
				<Carousel.Root opts={{ align: 'start' }} class="w-full">
					<Carousel.Content>
						{#each Array(Math.ceil(municipality.length / 6)) as _, i (i)}
							<Carousel.Item>
								<div class="flex flex-wrap justify-center gap-2 sm:gap-3">
									{#each municipality.slice(i * 6, i * 6 + 6) as place}
										<div class="flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm">
											<img 
												src={place.src} 
												alt={place.municipality} 
												class="h-6 w-6 rounded-full object-cover" 
											/>
											<span class="text-sm font-medium text-gray-700">{place.municipality}</span>
										</div>
									{/each}
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous class="left-2" />
					<Carousel.Next class="right-2" />
				</Carousel.Root>
			</div>

			<!-- Products Grid -->
			<div class="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
				{#each products.slice(0, 6) as product}
					<div class="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
						<div class="aspect-[4/3] overflow-hidden">
							<img 
								src={product.imageSrc} 
								alt={product.title} 
								class="h-full w-full object-cover transition-transform group-hover:scale-105" 
							/>
						</div>
						<div class="p-3 sm:p-4">
							<h3 class="text-sm font-semibold text-gray-900 sm:text-base">{product.title}</h3>
							<p class="mt-1 text-xs text-gray-600 sm:text-sm">{product.category}</p>
							<div class="mt-2 flex items-center justify-between sm:mt-3">
								<span class="text-sm font-bold text-green-600 sm:text-lg">₱{product.price}</span>
								<span class="text-xs text-gray-500 sm:text-sm">Stock: {product.quantity}</span>
							</div>
							<Button href="/kmart" class="mt-3 w-full bg-gray-900 text-xs text-white hover:bg-gray-800 sm:mt-4 sm:text-sm">
								View Product
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Key Features Section -->
	<section class="bg-gray-50 px-4 py-12 md:px-8 lg:px-32 md:py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-12 text-center">
				<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Key Features</h2>
				<p class="mt-2 text-gray-600">Discover what KayaCo can do for you</p>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<a 
					href="/" 
					class="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 sm:p-6"
				>
					<div class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 sm:h-12 sm:w-12 sm:mb-4">
						<GraduationCap class="h-5 w-5 sm:h-6 sm:w-6" />
					</div>
					<h3 class="text-base font-semibold text-gray-900 sm:text-lg">Kaya Connect</h3>
					<p class="mt-1 text-sm text-gray-600 sm:mt-2">Job opportunities tailored for PWDs with inclusive employers.</p>
					<div class="mt-3 flex items-center text-xs font-medium text-blue-600 group-hover:text-blue-700 sm:mt-4 sm:text-sm">
						Learn more
						<MoveRight class="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
					</div>
				</a>

				<a 
					href="/kmart" 
					class="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 sm:p-6"
				>
					<div class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 sm:h-12 sm:w-12 sm:mb-4">
						<Store class="h-5 w-5 sm:h-6 sm:w-6" />
					</div>
					<h3 class="text-base font-semibold text-gray-900 sm:text-lg">K Mart</h3>
					<p class="mt-1 text-sm text-gray-600 sm:mt-2">Unique products crafted with care by talented PWDs.</p>
					<div class="mt-3 flex items-center text-xs font-medium text-green-600 group-hover:text-green-700 sm:mt-4 sm:text-sm">
						Explore products
						<MoveRight class="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
					</div>
				</a>

				<a 
					href="/courses" 
					class="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 sm:p-6"
				>
					<div class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 sm:h-12 sm:w-12 sm:mb-4">
						<Briefcase class="h-5 w-5 sm:h-6 sm:w-6" />
					</div>
					<h3 class="text-base font-semibold text-gray-900 sm:text-lg">K Pability</h3>
					<p class="mt-1 text-sm text-gray-600 sm:mt-2">Accessible learning courses designed for everyone to use.</p>
					<div class="mt-3 flex items-center text-xs font-medium text-purple-600 group-hover:text-purple-700 sm:mt-4 sm:text-sm">
						Start learning
						<MoveRight class="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- Testimonial Section -->
	<section class="px-4 py-12 md:px-8 lg:px-32 md:py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-12 text-center">
				<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">What People Say</h2>
				<p class="mt-2 text-gray-600">Hear from our community members</p>
			</div>

			<div class="mx-auto max-w-4xl">
				<div class="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
					<div class="text-center">
						<div class="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
							<img
								src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
								alt="Christian L. Obispo"
								class="h-full w-full object-cover"
							/>
						</div>
						
						<div class="mb-4 flex justify-center">
							{#each Array(4) as _}
								<Star class="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5" />
							{/each}
							<Star class="h-4 w-4 text-gray-300 sm:h-5 sm:w-5" />
						</div>
						
						<blockquote class="mb-4 text-sm leading-relaxed text-gray-800 sm:text-base md:text-lg">
							"KayaCo has been a game-changer for our students. The platform provides genuine opportunities and builds real confidence in our community."
						</blockquote>
						
						<div>
							<div class="text-sm font-semibold text-gray-900 sm:text-base">Christian L. Obispo</div>
							<div class="text-xs text-gray-600 sm:text-sm">APCAS, Instructor</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

</main>