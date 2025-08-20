<script lang="ts">
  interface Municipality {
    name: string;
    location: string;
    description: string;
    products: string[];
  }

  const municipalities: Municipality[] = [
    {
      name: "Balanga City",
      location: "Central Bataan",
      description: "The capital of Bataan and a hub for education, commerce, and governance.",
      products: ["Processed Milkfish", "Mangoes", "Tourism Services"]
    },
    {
      name: "Abucay",
      location: "North of Balanga",
      description: "Known for historical churches, arrowroot cookies, and agricultural produce.",
      products: ["Arrowroot Cookies", "Furniture", "Rice"]
    },
    {
      name: "Bagac",
      location: "Southwest Bataan (coastal)",
      description: "Famous for heritage tourism, beaches, and handwoven crafts.",
      products: ["Handwoven Products", "Resorts", "Dried Fish"]
    },
    {
      name: "Dinalupihan",
      location: "Northwestern Bataan",
      description: "Bataan’s only landlocked town, rich in agriculture and local trade.",
      products: ["Corn", "Vegetables", "Livestock"]
    },
    {
      name: "Hermosa",
      location: "North-central Bataan",
      description: "Features fertile lands and thriving orchid and furniture industries.",
      products: ["Orchids", "Furniture", "Bananas"]
    },
    {
      name: "Limay",
      location: "Southeast Bataan",
      description: "An industrial town with a mix of fishing communities and energy plants.",
      products: ["Petroleum", "Cement", "Marine Products"]
    },
    {
      name: "Mariveles",
      location: "Southernmost Bataan",
      description: "Home to the Freeport Area of Bataan, vital to manufacturing and exports.",
      products: ["Electronics", "Garments", "Fish Sauce"]
    },
    {
      name: "Morong",
      location: "Southwest Bataan",
      description: "Popular for eco-tourism and the historic Bataan Nuclear Power Plant.",
      products: ["Tourism", "Marine Food", "Handicrafts"]
    },
    {
      name: "Orani",
      location: "North of Balanga",
      description: "A lively farming and fishing town known for its seafood and markets.",
      products: ["Crabs", "Prawns", "Vegetables"]
    },
    {
      name: "Orion",
      location: "Southeast Bataan",
      description: "A developing residential town with strong furniture and fish trades.",
      products: ["Salted Eggs", "Tuyo", "Furniture"]
    },
    {
      name: "Pilar",
      location: "Central Bataan",
      description: "Home to Mount Samat Shrine and known for mangoes and rice.",
      products: ["Rice", "Mangoes", "Tourism (Mt. Samat)"]
    },
    {
      name: "Samal",
      location: "Eastern Bataan",
      description: "Noted for bamboo crafts, bananas, and root crop farming.",
      products: ["Bamboo Crafts", "Bananas", "Root Crops"]
    }
  ];
</script>

<div class="max-w-6xl mx-auto px-6 py-16">
  <h1 class="text-center mb-12 text-3xl font-bold text-gray-900">
    Municipalities of Bataan
  </h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each municipalities as muni}
      <div
        class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
      >
        <h2 class="text-lg font-semibold text-blue-600 mb-2">{muni.name}</h2>
        <p class="text-gray-700 text-sm mb-1">
          <strong>Location:</strong> {muni.location}
        </p>
        <p class="text-gray-600 text-sm mb-3">{muni.description}</p>
        <p class="text-gray-800 font-medium mb-1">Products:</p>
        <ul class="list-disc list-inside text-gray-600 text-sm space-y-1">
          {#each muni.products as product}
            <li>{product}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

