import type { BadgeMetadata } from '$lib/types/badges';
import { BadgeCode } from '$lib/types/badges';

export const allBadgeMetadata: BadgeMetadata[] = [
  {
    code: BadgeCode.FIRST_OBSERVATION,
    name: "First Sighting!",
    description: "You've logged your very first marine creature observation.",
    icon: "🎉",
  },
  {
    code: BadgeCode.FIVE_SPECIES_OBSERVED,
    name: "Species Spotter",
    description: "You've successfully observed and logged at least 5 different species.",
    icon: "🧭",
  },
  {
    code: BadgeCode.FIRST_MAMMAL_LOGGED,
    name: "Mammal Encounter",
    description: "You've logged your first marine mammal.",
    icon: "🐳",
  },
  {
    code: BadgeCode.FIRST_REPTILE_LOGGED,
    name: "Reptile Ranger",
    description: "You've logged your first marine reptile. (e.g. Sea Turtle)",
    icon: "🐢",
  },
  {
    code: BadgeCode.ENDANGERED_SPECIES_LOGGED,
    name: "Conservationist Heart",
    description: "You've observed and logged a species classified as 'Endangered' or 'Critically Endangered'.",
    icon: "❤️",
  },
  {
    code: BadgeCode.DEEP_DIVER_LOG,
    name: "Deep Diver Log",
    description: "You've logged an observation of a species found predominantly deeper than 100 meters.",
    icon: "🌊",
  },
  {
    code: BadgeCode.ARCTIC_EXPLORER,
    name: "Arctic Explorer",
    description: "You've logged a species whose primary region includes the Arctic Ocean.",
    icon: "❄️",
  },
  {
    code: BadgeCode.CORAL_CONNOISSEUR,
    name: "Coral Connoisseur",
    description: "You've logged at least 3 different species typically found in Coral Reef habitats.",
    icon: "🐠",
  },
];
