<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="w-full px-6 md:px-20 py-10 space-y-10">
	<!-- Hero Section -->
	<section class="px-4 py-12 md:px-8 lg:px-32 bg-gray-50">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl font-bold mb-6 text-[#1E3A8A]">About Us</h1>
                <p class="text-lg leading-relaxed text-[#111827]">
                    We are dedicated to building a platform that connects people, empowers communities, 
                    and creates opportunities for everyone. Our mission is to make services more accessible 
                    and fair, ensuring that both workers and customers benefit equally.
                </p>
         </div>
</section>

	<!-- Mission & Vision -->
	<section class="bg-gray-50 py-10">
		<div class="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div class="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition min-h-[200px]">
				<h3 class="text-lg font-semibold text-[#1E3A8A]">Our Mission</h3>
				<p class="mt-2 text-md text-[#111827]">
					To empower persons with disabilities by creating inclusive job opportunities, 
					promoting skills development, and building a supportive community that values 
					diversity and equal access.
				</p>
			</div>
			<div class="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition min-h-[200px]">
				<h3 class="text-lg font-semibold text-[#1E3A8A]">Our Vision</h3>
				<p class="mt-2 text-md text-[#111827]">
					To become the leading platform for inclusive employment in the Philippines, 
					where every person with a disability has the tools, opportunities, and 
					support to thrive in their chosen career.
				</p>
			</div>
		</div>
	</section>

	<!-- Core Values -->
	<section class="bg-gray-50 py-10">
		<div class="mx-auto max-w-6xl text-center mb-8">
			<h2 class="text-2xl font-bold sm:text-3xl text-[#1E3A8A]">Our Core Values</h2>
			<p class="mt-2 text-[#111827]">The principles that guide KayaCo in serving the community</p>
		</div>
		<div class="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each [
				{ title: 'Compassion', text: 'We put people first, treating everyone with empathy and respect.' },
				{ title: 'Inclusivity', text: 'Building opportunities where everyone—especially PWDs—belongs.' },
				{ title: 'Integrity', text: 'We uphold transparency, honesty, and accountability in all we do.' },
				{ title: 'Innovation', text: 'Continuously finding creative solutions to empower communities.' },
				{ title: 'Excellence', text: 'We strive to deliver high-quality service and meaningful results.' },
				{ title: 'Community', text: 'Working hand in hand with people to create lasting impact.' }
			] as value}
				<div class="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
					<h3 class="text-base font-semibold text-[#1E3A8A]">{value.title}</h3>
					<p class="mt-1 text-sm text-[#111827]">{value.text}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Call to Action -->
	<section class="max-w-5xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between">
		<div class="mb-6 md:mb-0">
			<h2 class="text-2xl font-semibold text-[#1E3A8A]">Be Part of Our Journey</h2>
			<p class="mt-2 text-[#111827]">
				Whether you’re looking to showcase your skills or find trusted services, 
				you’re welcome to join us in reshaping how communities work together.
			</p>
		</div>
		<Button class="bg-[#1E3A8A] text-white hover:bg-blue-900 px-6 py-3 rounded-xl shadow-md">
			Join Us
		</Button>
	</section>
</div>