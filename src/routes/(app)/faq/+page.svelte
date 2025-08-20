<script lang="ts">
    import { slide } from 'svelte/transition';
	let faqs = [
		{
			question: "What is this KayaCo online market about?",
			answer:"Our online market is a digital platform where you can browse, order, and receive a variety of products."
		},
		{
			question: "How do I place an order?",
			answer: [
				"1. Browse our categories or use the search bar.",
				"2. Add items to your cart.",
				"3. Proceed to checkout.",
				"4. Fill in your shipping details and payment method.",
				"5. Click “Place Order.”"
			]
		},
		{
			question: "What payment methods are accepted?",
			answer: [
				"1. Cash on Delivery (COD)",
				"2. Paymongo Portal"
				
			]
		},
		{
			question: "Is Cash on Delivery (COD) available?",
			answer:"Yes, COD is available for select locations and items. You’ll see the option at checkout if eligible."
			
		},
		{
			question: " How long does delivery take?",

			answer:"Standard delivery takes 2–5 business days, depending on your location. Express or same-day delivery may be available in select areas."
			
		},
		{
			question: "Can I track my order?",
			answer:"Yes! Once your order is confirmed, you will see the tracking link in the track-order page."
			
		},
		{
			question: " Can I cancel or modify my order?",

			answer:"You may cancel or modify your order within 1 hour of placing it. After that, it may already be processed or shipped."
			
		},
		 {
      question: "Who can shop on this platform?",
      answer: "Anyone can shop on the platform. Supporting PWD entrepreneurs helps promote inclusion and livelihood opportunities."
    },
	 {
      question: "Are the products made by PWDs?",
      answer: "Yes, most products listed are crafted, produced, or sold by persons with disabilities or PWD-owned small businesses."
    },
	 {
      question: "Is the website accessible for screen readers and assistive tools?",
      answer: "Yes, the platform follows accessibility standards and is compatible with screen readers, keyboard navigation, and other assistive technologies."
    },
	];

	let openIndex: number | null = null;

    function toggle(index: number): void {
	openIndex = openIndex === index ? null : index;
    }

    function isArray(val: unknown): val is unknown[] {
	return Array.isArray(val);
    }
</script>

<section class="max-w-5xl mx-auto p-4 pb-28 pt-20 text-justify">
	<h1 class="text-3xl font-bold mb-6">What is KayaCo?</h1>
	<p>With today’s technology, it’s easier than ever for persons with disabilities (PWDs) to showcase and sell their products or services from home. At KayaCo, we provide an inclusive online platform that empowers PWD entrepreneurs to earn a living and reach more customers.</p>
	<br>
	<p>All products and services are directly offered by PWD sellers — whether full-time or part-time. Sellers keep almost all of their earnings, with only a minimal commission deducted to support platform maintenance.</p>
	<br>
	<p>Before we get started, please read the FAQ section below.</p><br>
	<h1 class="text-3xl font-bold mb-6 pt-10">Frequently Asked Questions</h1>
	<div class="space-y-4">
		{#each faqs as faq, i}
			<div class="border rounded-xl overflow-hidden">
				<button
					class="w-full text-left p-4 bg-blue-100 hover:bg-blue-200 transition font-semibold"
					on:click={() => toggle(i)}
				>
					{faq.question}
				</button>
				{#if openIndex === i}
					<div class="p-4 bg-white text-gray-700 border-t"
                    transition:slide
                    >
						{#if isArray(faq.answer)}
							<ul class="list-disc list-inside space-y-1">
								{#each faq.answer as step}
									<li>{step}</li>
								{/each}
							</ul>
						{:else}
							<p>{faq.answer}</p>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

