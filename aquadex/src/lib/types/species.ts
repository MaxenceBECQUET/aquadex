export enum Region {
  ARCTIC = "Arctic Ocean",
  ANTARCTIC = "Antarctic Ocean",
  ATLANTIC_NORTH = "North Atlantic Ocean",
  ATLANTIC_SOUTH = "South Atlantic Ocean",
  PACIFIC_NORTH = "North Pacific Ocean",
  PACIFIC_SOUTH = "South Pacific Ocean",
  INDIAN_OCEAN = "Indian Ocean",
  MEDITERRANEAN = "Mediterranean Sea",
  CARIBBEAN = "Caribbean Sea",
  CORAL_TRIANGLE = "Coral Triangle",
  RED_SEA = "Red Sea",
  GLOBAL = "Global Distribution", // For widely distributed species
  FRESHWATER = "Freshwater", // If including freshwater species
}

export enum HabitatType {
  CORAL_REEF = "Coral Reef",
  DEEP_SEA = "Deep Sea",
  OPEN_OCEAN = "Open Ocean (Pelagic)",
  KELP_FOREST = "Kelp Forest",
  MANGROVE = "Mangrove Forest",
  SEAGRASS_BED = "Seagrass Bed",
  ROCKY_SHORE = "Rocky Shore",
  SANDY_BOTTOM = "Sandy Bottom",
  ESTUARY = "Estuary",
  HYDROTHERMAL_VENT = "Hydrothermal Vent",
  POLAR_ICE = "Polar Ice Ecosystem",
  FRESHWATER_LAKE = "Freshwater Lake",
  FRESHWATER_RIVER = "Freshwater River",
}

export enum RarityLevel {
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  RARE = "Rare",
  VERY_RARE = "Very Rare",
  DATA_DEFICIENT = "Data Deficient",
}

export enum DangerLevel {
  NONE = "None",
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  EXTREME = "Extreme", // e.g., Box Jellyfish
  VENOMOUS_NON_AGGRESSIVE = "Venomous (Non-Aggressive)",
  AGGRESSIVE_IF_PROVOKED = "Aggressive if Provoked",
}

export enum Diet {
  CARNIVORE = "Carnivore",
  HERBIVORE = "Herbivore",
  OMNIVORE = "Omnivore",
  PLANKTIVORE = "Planktivore", // Feeds on plankton
  DETRITIVORE = "Detritivore", // Feeds on detritus
  FILTER_FEEDER = "Filter Feeder",
  PARASITE = "Parasite",
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MarineCreature {
  id: string; // Unique identifier (e.g., "clownfish-001")
  name: string;
  scientificName: string;
  description: string; // General overview
  characteristics: string; // Key physical features, size, color etc.
  sexualDimorphism?: string; // Differences between sexes
  family: string; // Biological family
  diet: Diet[];
  minDepth?: number; // in meters
  maxDepth?: number; // in meters
  minLength?: number; // in cm or m
  maxLength?: number; // in cm or m
  habitatType: HabitatType[];
  rarityLevel: RarityLevel;
  observationTips?: string;
  photoTips?: string;
  dangerLevel: DangerLevel;
  safetyRecommendations?: string;
  gallery: GalleryImage[];
  region: Region[];
  conservationStatus?: string; // e.g., IUCN status like "Endangered", "Least Concern"
  typicalBehavior?: string;
  reproduction?: string;
  lifespan?: string; // e.g., "5-7 years"
  taxonomy?: { // Optional more detailed taxonomy
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    genus?: string;
  };
  anecdotes?: string; // Interesting facts or stories
  category: 'Mammal' | 'Reptile' | 'Fish' | 'Amphibian' | 'Invertebrate' | 'Other';
  conservationStatus?: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Near Threatened' | 'Least Concern' | 'Data Deficient' | 'Not Evaluated';
}
