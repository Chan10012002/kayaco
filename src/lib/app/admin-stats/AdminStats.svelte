<script lang="ts">
  import { onMount } from 'svelte';
  import { getAdminStats } from './index';
  import { Users, Package, Receipt } from 'lucide-svelte';

  export let className: string = '';
  export let lguCount: number | undefined = undefined;
  export let productCount: number | undefined = undefined;
  export let orderCount: number | undefined = undefined;

  let internal = { lguCount: 0, productCount: 0, orderCount: 0 };
  let hasFetched = false;

  onMount(async () => {
    if (
      lguCount === undefined ||
      productCount === undefined ||
      orderCount === undefined
    ) {
      try {
        internal = await getAdminStats();
      } finally {
        hasFetched = true;
      }
    }
  });
</script>

<div class={`w-full grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 ${className}`}>
  <!-- LGU Card -->
  <div class="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted/40 p-4 shadow-sm transition hover:shadow-md">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.08),transparent_35%)]"></div>
    <div class="flex items-start gap-3">
      <div class="rounded-md bg-primary/10 p-2 text-primary">
        <Users size={20} aria-hidden="true" />
      </div>
      <div class="flex-1">
        <div class="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total LGU Accounts</div>
        {#if lguCount === undefined && !hasFetched}
          <div class="mt-2 h-7 w-20 animate-pulse rounded-md bg-muted"></div>
        {:else}
          <div class="mt-1 text-3xl font-semibold tabular-nums">{lguCount ?? internal.lguCount}</div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Products Card -->
  <div class="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted/40 p-4 shadow-sm transition hover:shadow-md">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,hsl(var(--emerald)/0.08),transparent_35%)]"></div>
    <div class="flex items-start gap-3">
      <div class="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
        <Package size={20} aria-hidden="true" />
      </div>
      <div class="flex-1">
        <div class="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Products</div>
        {#if productCount === undefined && !hasFetched}
          <div class="mt-2 h-7 w-24 animate-pulse rounded-md bg-muted"></div>
        {:else}
          <div class="mt-1 text-3xl font-semibold tabular-nums">{productCount ?? internal.productCount}</div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Orders Card -->
  <div class="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted/40 p-4 shadow-sm transition hover:shadow-md">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--amber)/0.10),transparent_35%)]"></div>
    <div class="flex items-start gap-3">
      <div class="rounded-md bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
        <Receipt size={20} aria-hidden="true" />
      </div>
      <div class="flex-1">
        <div class="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Orders</div>
        {#if orderCount === undefined && !hasFetched}
          <div class="mt-2 h-7 w-16 animate-pulse rounded-md bg-muted"></div>
        {:else}
          <div class="mt-1 text-3xl font-semibold tabular-nums">{orderCount ?? internal.orderCount}</div>
        {/if}
      </div>
    </div>
  </div>

  <slot />
  </div>


