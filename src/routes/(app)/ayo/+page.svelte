<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Store, MoveRight, Briefcase, GraduationCap, Star } from '@lucide/svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import BoxReveal from "$lib/app/boxreveal/boxreveal.svelte";
	
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
	<!-- Hero Section -->
	<section class="px-4 py-8 md:px-8 lg:px-32 md:py-16">
	<div class="mx-auto max-w-7xl">
		<!-- Combined container for text and carousel -->
		<div class="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
			
			<!-- Text Content - Left Side -->
			<div class="flex-1 lg:max-w-xl space-y-6">
				<BoxReveal boxColor={"#2563eb"} duration={0.5}>
					<p class="text-[3.5rem] font-bold">
					Your path to <span class="text-[#2563eb]">Inclusion</span> Starts here<span class="text-[#2563eb]">.</span>
					</p>
				</BoxReveal>
				<BoxReveal boxColor={"#2563eb"} duration={0.5}>
					<h2 class="mt-[.5rem] sm:text-base md:text-lg text-left text-gray-600">
					An Online Space for{" "}
					<span class="text-[#2563eb]">People With Disabilities</span>
					</h2>
				</BoxReveal>
				<BoxReveal boxColor={"#2563eb"} duration={0.5}>
					<div class="text-sm text-gray-600 sm:text-base md:text-lg text-left">
					<p>
						Empowering persons with disabilities through education, employment, and enterprise with KayaCo.
						<span class="font-semibold text-[#2563eb]"> point1</span>,
						<span class="font-semibold text-[#2563eb]"> point1</span>,
						<span class="font-semibold text-[#2563eb]"> point1</span>, and
						<span class="font-semibold text-[#2563eb]"> point1</span>
						. <br />
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
					</p>
					</div>
				</BoxReveal>
				<BoxReveal boxColor={"#2563eb"} duration={0.5}>
				<div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
					<Button class="h-11 bg-blue-600 px-6 font-medium text-white hover:bg-blue-700" href="/register">
						Get Started
					</Button>
					<Button href="/kmart" variant="ghost" class="h-11 px-6 font-medium text-gray-700 hover:bg-gray-100">
						Check Market Place 
						<MoveRight class="ml-2 h-4 w-4" />
					</Button>
				</div>
				</BoxReveal>
			</div>

			<!-- Carousel - Right Side -->
			<BoxReveal boxColor={"#2563eb"} duration={0.5}>
			<div class="flex-1 lg:max-w-2xl">
				<Carousel.Root class="w-full">
					<Carousel.Content>
						{#each carouselImg as img, i (i)}
							<Carousel.Item>
								<div class="px-2">
									<img 
										src={img.src} 
										alt="Carousel image {i + 1}" 
										class="h-56 w-full rounded-2xl object-cover shadow-lg sm:h-72 md:h-80 lg:h-96 xl:h-[500px]" 
									/>
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous class="left-4" />
					<Carousel.Next class="right-4" />
				</Carousel.Root>
			</div>
			</BoxReveal>
		</div>
	</div>
</section>

	<!-- Top Products Section -->
	<section class="px-4 py-12 md:px-8 lg:px-32 md:py-20">
		<section class="mx-auto max-w-7xl">
			<div class="mb-8 text-center">
				<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Featured Products</h2>
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
                    <div class="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md hover:border-transparent hover:ring-0 hover:outline-none hover:[box-shadow:0_0_24px_4px_#3b82f6,0_0_0_0_rgba(0,0,0,0)]">
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
		</section>
	</section>
	<!-- Key Features Section -->
<section class="bg-gray-50 px-4 py-12 md:px-8 lg:px-32 md:py-20">
  <div class="mx-auto max-w-7xl">
    <!-- Section Heading -->
    <div class="mb-12 text-center">
      <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        Key Features
      </h2>
      <p class="mt-2 text-gray-600">Discover what KayaCo can do for you</p>
    </div>

    <!-- Grid of Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      
      <!-- Kaya Connect -->
      <div class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
        <div class="flex items-center justify-center h-48 bg-blue-50">
          <!-- Example SVG illustration -->
          <svg class="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zM18 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3z"/>
            <path d="M6 21v-2a4 4 0 014-4h0a4 4 0 014 4v2M14 21v-2a4 4 0 014-4h0a4 4 0 014 4v2"/>
          </svg>
        </div>
        <div class="p-6 flex flex-col flex-1">
          <span class="text-xs font-medium uppercase text-gray-500">Employment</span>
          <h3 class="mt-2 text-lg font-semibold text-gray-900">Kaya Connect</h3>
          <p class="mt-2 text-sm text-gray-600 flex-1">
            Job opportunities tailored for PWDs with inclusive employers.
          </p>
          <a href="/" class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- K Mart -->
      <div class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
        <div class="flex items-center justify-center h-48 bg-green-50">
          <!-- Example SVG illustration -->
          <svg class="w-24 h-24 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 5h18M3 10h18M3 15h18M3 20h18"/>
          </svg>
        </div>
        <div class="p-6 flex flex-col flex-1">
          <span class="text-xs font-medium uppercase text-gray-500">E-Commerce</span>
          <h3 class="mt-2 text-lg font-semibold text-gray-900">K Mart</h3>
          <p class="mt-2 text-sm text-gray-600 flex-1">
            Unique products crafted with care by talented PWDs.
          </p>
          <a href="/kmart" class="mt-4 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
            Explore products
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- K Pability -->
      <div class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
        <div class="flex items-center justify-center h-48 bg-purple-50">
          <!-- Example SVG illustration -->
          <svg class="w-24 h-24 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 20h9M12 4h9M3 12h18"/>
          </svg>
        </div>
        <div class="p-6 flex flex-col flex-1">
          <span class="text-xs font-medium uppercase text-gray-500">Education</span>
          <h3 class="mt-2 text-lg font-semibold text-gray-900">K Pability</h3>
          <p class="mt-2 text-sm text-gray-600 flex-1">
            Accessible learning courses designed for everyone to use.
          </p>
          <a href="/courses" class="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
            Start learning
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>
	<!-- Testimonial Section -->
<section class="px-4 py-12 md:px-8 lg:px-32 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
				What Our <span class="text-blue-600">Community</span> Says
			</h2>
			<p class="text-gray-600 max-w-2xl mx-auto">
				Real stories from people transformed by KayaCo's inclusive platform
			</p>
		</div>

		<!-- Testimonials Carousel -->
		<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
	<Carousel.Content class="-ml-2 md:-ml-4">
		{#each testimonials as testimonial}
			<Carousel.Item class="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
				<div
					class={`group h-full rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${testimonial.classes.border}`}
				>
					<div class="flex items-start gap-4 mb-4">
						<div
							class={`relative h-12 w-12 overflow-hidden rounded-full ring-2 ${testimonial.classes.ring}`}
						>
							<img src={testimonial.img} alt={testimonial.name} class="h-full w-full object-cover" />
							<div
								class={`absolute inset-0 rounded-full bg-gradient-to-t ${testimonial.classes.gradient} to-transparent`}
							></div>
						</div>
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-2">
								<h4 class="font-semibold text-gray-900">{testimonial.name}</h4>
								<div class="h-1 w-1 rounded-full bg-gray-300"></div>
								<span class="text-sm text-gray-600">{testimonial.role}</span>
							</div>
							<div class="flex items-center gap-1">
								{#each Array(testimonial.stars) as _}
									<Star class="h-3 w-3 fill-yellow-400 text-yellow-400" />
								{/each}
								{#each Array(5 - testimonial.stars) as _}
									<Star class="h-3 w-3 text-gray-300" />
								{/each}
							</div>
						</div>
					</div>
					<blockquote class="text-gray-700 leading-relaxed mb-4">
						"{testimonial.quote}"
					</blockquote>
					<div class={`text-sm font-medium ${testimonial.classes.text}`}>
						{testimonial.tag}
					</div>
				</div>
			</Carousel.Item>
				{/each}
			</Carousel.Content>
			
			<!-- Navigation -->
			<div class="flex items-center justify-center gap-4 mt-8">
				<Carousel.Previous class="static translate-y-0 h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200" />
				<Carousel.Next class="static translate-y-0 h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200" />
			</div>
		</Carousel.Root>

	</div>
</section>

</main>