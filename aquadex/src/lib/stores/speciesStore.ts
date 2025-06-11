import { writable } from 'svelte/store';
import type { MarineCreature } from '$lib/types/species';
import { sampleSpecies } from '$lib/data/sampleSpecies';

// Initialize the store with the sample data
const createSpeciesStore = () => {
  const { subscribe, set, update } = writable<MarineCreature[]>(sampleSpecies);

  return {
    subscribe,
    // Example: Function to add a new creature (can be expanded later)
    addCreature: (creature: MarineCreature) => {
      update(species => [...species, creature]);
    },
    // Example: Function to find a creature by ID
    getCreatureById: (id: string) => {
      let creature: MarineCreature | undefined;
      subscribe(species => { // Need to subscribe to get current value
        creature = species.find(s => s.id === id);
      })(); // Unsubscribe immediately after getting the value
      return creature;
    },
    set, // Allow replacing all species if needed
  };
};

export const allSpecies = createSpeciesStore();

// You could also export derived stores for filtered lists, etc.
// For example, a store that only contains creatures from a specific region:
// import { derived } from 'svelte/store';
// import { Region } from '$lib/types/species';
// export const pacificNorthSpecies = derived(
//   allSpecies,
//   $allSpecies => $allSpecies.filter(species => species.region.includes(Region.PACIFIC_NORTH))
// );
