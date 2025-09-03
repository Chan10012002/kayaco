<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { ChartBarStacked, PackageSearch, ListChecks, HousePlus, LucideLogOut } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button';

	let open = false;
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href="/lgu/product" {...props}>
									<PackageSearch />
									<span>Products</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>

					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href="/lgu/order" {...props}>
									<ListChecks/>
									<span>Orders</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>

					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<button type="button" {...props} onclick={() => (open = true)}>
									<LucideLogOut />
									<span>Logout</span>
								</button>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>

<Dialog.Root bind:open>
	<Dialog.Content class="space-y-4">
		<Dialog.Header>
			<Dialog.Title>Confirm Logout</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to log out of your account?
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer class="flex justify-end gap-4">
			<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>

			<form method="POST" action="/api/logout">
				<Button type="submit" class="bg-red-600 text-white hover:bg-red-700">
					Logout
				</Button>
			</form>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>