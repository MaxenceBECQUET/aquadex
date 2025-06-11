export enum BadgeCode {
  FIRST_OBSERVATION = "FIRST_OBSERVATION",
  FIVE_SPECIES_OBSERVED = "FIVE_SPECIES_OBSERVED",
  FIRST_MAMMAL_LOGGED = "FIRST_MAMMAL_LOGGED", // Renamed for clarity
  FIRST_REPTILE_LOGGED = "FIRST_REPTILE_LOGGED", // Renamed for clarity
  ENDANGERED_SPECIES_LOGGED = "ENDANGERED_SPECIES_LOGGED", // Renamed for clarity
  DEEP_DIVER_LOG = "DEEP_DIVER_LOG", // Logged a species found deeper than 100m
  ARCTIC_EXPLORER = "ARCTIC_EXPLORER", // Logged a species from Arctic region
  CORAL_CONNOISSEUR = "CORAL_CONNOISSEUR", // Logged 3+ species from Coral Reef habitat
}

export interface Badge {
  code: BadgeCode;
  name: string;
  description: string;
  icon: string; // Emoji or SVG path
  achievedDate?: string; // ISO date string, set when the user earns the badge
  details?: string; // Optional: specific detail like "Achieved with Blue Whale"
}

// Metadata for badges, excluding user-specific data like achievedDate
export type BadgeMetadata = Omit<Badge, 'achievedDate' | 'details'>;
