import { writable, get } from 'svelte/store';
import type { DiveLogEntry, DiveLogEntryCreateData } from '$lib/types/diveLog';
import { allSpecies } from './speciesStore'; // To get species names
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const DIVE_LOG_STORAGE_KEY = 'aquadex_diveLogEntries';

// Helper to get species name by ID
function getSpeciesNameById(id: string): string {
  const speciesList = get(allSpecies); // Get current value of allSpecies store
  const foundSpecies = speciesList.find(s => s.id === id);
  return foundSpecies ? foundSpecies.name : 'Unknown Species';
}

// Function to initialize the store from localStorage
function createDiveLogStore() {
  let initialEntries: DiveLogEntry[] = [];
  if (typeof localStorage !== 'undefined') {
    const storedEntries = localStorage.getItem(DIVE_LOG_STORAGE_KEY);
    if (storedEntries) {
      try {
        initialEntries = JSON.parse(storedEntries);
      } catch (e) {
        console.error("Error parsing dive log entries from localStorage", e);
        initialEntries = []; // Fallback to empty if parsing fails
      }
    }
  }

  const { subscribe, set, update } = writable<DiveLogEntry[]>(initialEntries);

  // Function to save to localStorage
  const saveToLocalStorage = (entries: DiveLogEntry[]) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DIVE_LOG_STORAGE_KEY, JSON.stringify(entries));
    }
  };

  subscribe(entries => {
    saveToLocalStorage(entries);
  });

  return {
    subscribe,
    addEntry: (entryData: DiveLogEntryCreateData) => {
      const newEntry: DiveLogEntry = {
        ...entryData,
        id: uuidv4(),
        speciesName: getSpeciesNameById(entryData.speciesId),
        timestamp: Date.now(),
      };
      update(entries => [newEntry, ...entries].sort((a,b) => b.timestamp - a.timestamp)); // Add and keep sorted
    },
    updateEntry: (updatedEntryData: DiveLogEntry) => {
      // If speciesId changed, update speciesName
      let speciesNameToUpdate = updatedEntryData.speciesName;
      const currentEntries = get({subscribe}); // get current value of the store
      const existingEntry = currentEntries.find(e => e.id === updatedEntryData.id);
      if (existingEntry && updatedEntryData.speciesId && existingEntry.speciesId !== updatedEntryData.speciesId) {
         speciesNameToUpdate = getSpeciesNameById(updatedEntryData.speciesId);
      }

      const finalEntry = {
        ...updatedEntryData,
        speciesName: speciesNameToUpdate,
        timestamp: Date.now() // Update timestamp on any edit
      };

      update(entries =>
        entries.map(entry => (entry.id === finalEntry.id ? finalEntry : entry))
               .sort((a,b) => b.timestamp - a.timestamp) // Re-sort
      );
    },
    deleteEntry: (id: string) => {
      update(entries => entries.filter(entry => entry.id !== id));
    },
    getEntryById: (id: string): DiveLogEntry | undefined => {
      const entries = get({subscribe}); // Get current value of the store for finding
      return entries.find(entry => entry.id === id);
    },
    set, // Mainly for resetting or debugging
  };
}

export const diveLogEntries = createDiveLogStore();

// Example: Adding a dummy entry if the log is empty (for testing)
// diveLogEntries.subscribe(entries => {
//   if (entries.length === 0 && typeof localStorage !== 'undefined' && !localStorage.getItem(DIVE_LOG_STORAGE_KEY + '_populated')) {
//     const sampleSpeciesList = get(allSpecies);
//     if (sampleSpeciesList.length > 0) {
//       diveLogEntries.addEntry({
//         speciesId: sampleSpeciesList[0].id,
//         date: '2023-10-15',
//         location: 'Great Barrier Reef',
//         notes: 'Saw a beautiful clownfish, first log!',
//         latitude: -16.5000,
//         longitude: 145.7500,
//       });
//       localStorage.setItem(DIVE_LOG_STORAGE_KEY + '_populated', 'true');
//     }
//   }
// })();
