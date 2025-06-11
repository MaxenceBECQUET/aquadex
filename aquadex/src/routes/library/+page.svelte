<script lang="ts">
  import { allSpecies } from '$lib/stores/speciesStore';
  import CreatureCard from '$lib/components/species/CreatureCard.svelte';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { Region } from '$lib/types/species'; // For populating region filter
  import type { MarineCreature } from '$lib/types/species';
  import { Search, X } from 'lucide-svelte';

  let speciesList: MarineCreature[] = [];
  allSpecies.subscribe(value => {
    speciesList = value;
  });

  let searchTerm = '';
  let selectedRegion: Region | '' = '';

  // Placeholder for filtered results
  $: filteredSpecies = speciesList.filter(species => {
    const matchesSearchTerm = searchTerm === '' ||
      species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === '' || species.region.includes(selectedRegion);

    return matchesSearchTerm && matchesRegion;
  });

  function clearFilters() {
    searchTerm = '';
    selectedRegion = '';
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Marine Life Library</h1>

  <!-- Filters Section -->
  <div class="mb-8 p-6 bg-muted/50 rounded-xl shadow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
      <div class="space-y-1">
        <Label htmlFor="searchName" class="text-foreground/80">Search by Name</Label>
        <div class="relative">
          <Input type="text" id="searchName" placeholder="e.g., Clownfish, Manta Ray..." bind:value={searchTerm} class="pl-10" />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <Label htmlFor="filterRegion" class="text-foreground/80">Filter by Region</Label>
        <select id="filterRegion" bind:value={selectedRegion} class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="">All Regions</option>
          {#each Object.values(Region) as region}
            <option value={region}>{region}</option>
          {/each}
        </select>
      </div>

      <div>
        <Button variant="secondary" on:click={clearFilters} class="w-full md:w-auto">
          <X class="h-4 w-4 mr-2" /> Clear Filters
        </Button>
      </div>
    </div>
  </div>

  <!-- Grid of Creatures -->
  {#if filteredSpecies.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"> {/* Adjusted gap */}
      {#each filteredSpecies as creature (creature.id)}
        <CreatureCard {creature} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-12">
      <p class="text-xl text-muted-foreground mb-2">No creatures found matching your criteria.</p>
      <p class="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
    </div>
  {/if}
</div>
