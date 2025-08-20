<!-- <script lang="ts">
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";

  const shippingAddress = {
    name: "Juan Dela Cruz",
    address: "1234 Mabini St",
    city: "Manila",
    province: "Metro Manila",
    zip: "1000",
    country: "Philippines",
  };

  const paymentMethod = {
    type: "Visa",
    maskedNumber: "**** **** 4242",
  };

  const products = [
    { name: "KayaCo Shirt", quantity: 2, price: 299.00, image: "/images/shirt.png" },
    { name: "KayaCo Tote Bag", quantity: 1, price: 199.00, image: "/images/totebag.png" },
  ];

  const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 80.00;
  const total = subtotal + shipping;
</script>

<div class="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
  
  <div class="space-y-4">
    <Card>
      <CardContent class="p-4">
        <h2 class="text-lg font-semibold">Shipping Address</h2>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.zip}</p>
        <p>{shippingAddress.country}</p>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-4">
        <h2 class="text-lg font-semibold">Payment Method</h2>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-blue-500 text-white text-sm font-medium px-2 py-1 rounded">{paymentMethod.type}</span>
          <span>{paymentMethod.maskedNumber}</span>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-4">
        <h2 class="text-lg font-semibold">Billing Address</h2>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.zip}</p>
        <p>{shippingAddress.country}</p>
      </CardContent>
    </Card>
  </div>

 
  <div class="space-y-4">
    <Card>
      <CardContent class="p-4">
        <h2 class="text-lg font-semibold">Order Summary</h2>

        {#each products as item}
          <div class="flex justify-between items-center gap-4">
            <div class="flex items-center gap-3">
              <img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded" />
              <div class="text-sm">
                <p class="font-medium">{item.name}</p>
                <p class="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span class="text-sm font-semibold">₱{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        {/each}

        <div class="flex justify-between mt-4">
          <span>Subtotal</span>
          <span>₱{subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between">
          <span>Shipping</span>
          <span>₱{shipping.toFixed(2)}</span>
        </div>
        <div class="flex justify-between font-semibold border-t pt-2 mt-2">
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>

    <Button class="w-full bg-blue-600 text-white hover:bg-blue-700">Place Order</Button>
  </div>
</div>

<style>
  h2 {
    color: #1e293b;
  }
</style> -->
