import { writable, get } from 'svelte/store';
import type { Badge } from '$lib/types/badges';
import { BadgeCode } from '$lib/types/badges';
import { allBadgeMetadata } from '$lib/data/badges';
import { diveLogEntries } from './diveLogStore';
import type { DiveLogEntry } from '$lib/types/diveLog';
import { allSpecies as allSpeciesStore } from './speciesStore'; // Renamed to avoid conflict
import type { MarineCreature } from '$lib/types/species';
import { Region, HabitatType } from '$lib/types/species';

const AWARDED_BADGES_STORAGE_KEY = 'aquadex_awardedBadges';

function createAwardedBadgesStore() {
  let initialBadges: Badge[] = [];
  if (typeof localStorage !== 'undefined') {
    const storedBadges = localStorage.getItem(AWARDED_BADGES_STORAGE_KEY);
    if (storedBadges) {
      try {
        initialBadges = JSON.parse(storedBadges);
      } catch (e) {
        console.error("Error parsing awarded badges from localStorage", e);
      }
    }
  }

  const { subscribe, set, update } = writable<Badge[]>(initialBadges);

  const saveToLocalStorage = (badges: Badge[]) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(AWARDED_BADGES_STORAGE_KEY, JSON.stringify(badges));
    }
  };

  subscribe(badges => {
    saveToLocalStorage(badges);
  });

  function hasBadge(code: BadgeCode): boolean {
    return get({subscribe}).some(b => b.code === code);
  }

  function awardBadge(code: BadgeCode, details?: string) {
    if (hasBadge(code)) return;

    const badgeMeta = allBadgeMetadata.find(b => b.code === code);
    if (badgeMeta) {
      const newBadge: Badge = {
        ...badgeMeta,
        achievedDate: new Date().toISOString(),
        details,
      };
      update(badges => {
        const newBadgeList = [...badges, newBadge].sort((a,b) => new Date(b.achievedDate!).getTime() - new Date(a.achievedDate!).getTime());
        return newBadgeList;
      });
      console.log(`Badge awarded: ${badgeMeta.name}`, newBadge); // For debugging
      // Could add a toast notification here in the future
    }
  }

  function checkAndAwardBadges() {
    const logEntries = get(diveLogEntries);
    const marineSpeciesMap = new Map<string, MarineCreature>();
    get(allSpeciesStore).forEach(s => marineSpeciesMap.set(s.id, s));

    if (logEntries.length === 0) return; // No logs, no badges yet

    // FIRST_OBSERVATION
    if (logEntries.length >= 1 && !hasBadge(BadgeCode.FIRST_OBSERVATION)) {
      awardBadge(BadgeCode.FIRST_OBSERVATION, `First log: ${logEntries[0].speciesName} on ${new Date(logEntries[0].date).toLocaleDateString()}`);
    }

    // FIVE_SPECIES_OBSERVED
    const uniqueSpeciesIds = new Set(logEntries.map(entry => entry.speciesId));
    if (uniqueSpeciesIds.size >= 5 && !hasBadge(BadgeCode.FIVE_SPECIES_OBSERVED)) {
      awardBadge(BadgeCode.FIVE_SPECIES_OBSERVED, `Observed ${uniqueSpeciesIds.size} unique species.`);
    }

    let firstMammalLog: DiveLogEntry | undefined;
    let firstReptileLog: DiveLogEntry | undefined;
    let endangeredSpeciesLog: DiveLogEntry | undefined;
    let deepDiveLog: DiveLogEntry | undefined;
    let arcticLog: DiveLogEntry | undefined;
    const coralReefSpecies = new Set<string>();

    for (const entry of logEntries) {
      const species = marineSpeciesMap.get(entry.speciesId);
      if (!species) continue;

      // FIRST_MAMMAL_LOGGED
      if (species.category === 'Mammal' && !firstMammalLog) {
        firstMammalLog = entry;
      }
      // FIRST_REPTILE_LOGGED
      if (species.category === 'Reptile' && !firstReptileLog) {
        firstReptileLog = entry;
      }
      // ENDANGERED_SPECIES_LOGGED
      if ((species.conservationStatus === 'Endangered' || species.conservationStatus === 'Critically Endangered') && !endangeredSpeciesLog) {
        endangeredSpeciesLog = entry;
      }
      // DEEP_DIVER_LOG
      if ((species.minDepth && species.minDepth > 100 || species.maxDepth && species.maxDepth > 100) && !deepDiveLog) {
        deepDiveLog = entry;
      }
      // ARCTIC_EXPLORER
      if (species.region.includes(Region.ARCTIC) && !arcticLog) {
        arcticLog = entry;
      }
      // CORAL_CONNOISSEUR
      if (species.habitatType.includes(HabitatType.CORAL_REEF)) {
        coralReefSpecies.add(species.id);
      }
    }

    if (firstMammalLog && !hasBadge(BadgeCode.FIRST_MAMMAL_LOGGED)) {
      awardBadge(BadgeCode.FIRST_MAMMAL_LOGGED, `Logged ${firstMammalLog.speciesName}.`);
    }
    if (firstReptileLog && !hasBadge(BadgeCode.FIRST_REPTILE_LOGGED)) {
      awardBadge(BadgeCode.FIRST_REPTILE_LOGGED, `Logged ${firstReptileLog.speciesName}.`);
    }
    if (endangeredSpeciesLog && !hasBadge(BadgeCode.ENDANGERED_SPECIES_LOGGED)) {
      awardBadge(BadgeCode.ENDANGERED_SPECIES_LOGGED, `Logged ${endangeredSpeciesLog.speciesName} (Endangered).`);
    }
    if (deepDiveLog && !hasBadge(BadgeCode.DEEP_DIVER_LOG)) {
      awardBadge(BadgeCode.DEEP_DIVER_LOG, `Logged ${deepDiveLog.speciesName} (Deep Dweller).`);
    }
    if (arcticLog && !hasBadge(BadgeCode.ARCTIC_EXPLORER)) {
      awardBadge(BadgeCode.ARCTIC_EXPLORER, `Logged ${arcticLog.speciesName} (Arctic Region).`);
    }
    if (coralReefSpecies.size >= 3 && !hasBadge(BadgeCode.CORAL_CONNOISSEUR)) {
      awardBadge(BadgeCode.CORAL_CONNOISSEUR, `Logged ${coralReefSpecies.size} coral reef species.`);
    }
  }

  // Automatically check for badges when dive log entries change
  diveLogEntries.subscribe(_ => {
    checkAndAwardBadges();
  });

  // For manual checking or initialization if needed
  // checkAndAwardBadges(); // Initial check on store creation (after localStorage load)

  return {
    subscribe,
    checkAndAwardBadges, // Expose for manual trigger if needed
    // For testing/resetting:
    _resetBadges: () => {
      set([]);
      if (typeof localStorage !== 'undefined') localStorage.removeItem(AWARDED_BADGES_STORAGE_KEY);
    }
  };
}

export const awardedBadges = createAwardedBadgesStore();

// Initial check when the app loads, after stores are initialized.
// Needs a slight delay to ensure diveLogEntries has loaded from localStorage.
if (typeof window !== 'undefined') {
    setTimeout(() => {
        awardedBadges.checkAndAwardBadges();
    }, 100);
}
