import type { MarineCreature } from '$lib/types/species';
import { Region, HabitatType, RarityLevel, DangerLevel, Diet } from '$lib/types/species';

export const sampleSpecies: MarineCreature[] = [
  {
    id: 'clownfish-001',
    name: 'Clownfish',
    scientificName: 'Amphiprioninae',
    description: 'Clownfish are small, brightly colored fish known for their symbiotic relationship with sea anemones. They are popular in marine aquariums.',
    characteristics: 'Orange body with three distinctive white bars edged in black. Around 5-12 cm in length.',
    sexualDimorphism: 'All clownfish are born male. The largest and most dominant male in a group becomes female (protandrous hermaphroditism).',
    family: 'Pomacentridae',
    diet: [Diet.OMNIVORE, Diet.PLANKTIVORE],
    minDepth: 1,
    maxDepth: 15,
    minLength: 5,
    maxLength: 12,
    habitatType: [HabitatType.CORAL_REEF],
    rarityLevel: RarityLevel.COMMON,
    observationTips: 'Look for them nestled within sea anemones on coral reefs. They rarely stray far from their host.',
    photoTips: 'Use a macro lens for close-ups. Ensure good lighting to capture their vibrant colors.',
    dangerLevel: DangerLevel.NONE,
    safetyRecommendations: 'Generally harmless to humans.',
    gallery: [
      { src: 'https://placehold.co/800x600/FF8C00/FFFFFF?text=Clownfish+1', alt: 'Clownfish in anemone' },
      { src: 'https://placehold.co/800x600/FF8C00/FFFFFF?text=Clownfish+2', alt: 'Close up of a clownfish' },
    ],
    region: [Region.CORAL_TRIANGLE, Region.RED_SEA, Region.INDIAN_OCEAN, Region.PACIFIC_NORTH],
    category: 'Fish',
    conservationStatus: 'Least Concern',
    typicalBehavior: 'Lives in groups within a host anemone. Exhibits hierarchical social structure.',
    anecdotes: 'The movie "Finding Nemo" greatly popularized clownfish. Their symbiotic relationship with anemones is a classic example of mutualism in marine biology.',
  },
  {
    id: 'manta-ray-002',
    name: 'Manta Ray',
    scientificName: 'Mobula birostris / Mobula alfredi',
    description: 'Manta rays are large, graceful filter feeders found in tropical and subtropical waters. They are known for their impressive size and acrobatic leaps.',
    characteristics: 'Large, diamond-shaped body with wing-like pectoral fins. Can reach up to 7 meters (23 ft) in wingspan. Coloration is typically black dorsally and white ventrally, often with unique spot patterns.',
    family: 'Mobulidae',
    diet: [Diet.PLANKTIVORE, Diet.FILTER_FEEDER],
    minDepth: 0, // Surface feeders
    maxDepth: 1000, // Can dive deep
    minLength: 300, // cm (3m)
    maxLength: 700, // cm (7m)
    habitatType: [HabitatType.OPEN_OCEAN, HabitatType.CORAL_REEF, HabitatType.KELP_FOREST],
    rarityLevel: RarityLevel.UNCOMMON,
    observationTips: 'Often seen at cleaning stations on reefs or feeding in plankton-rich waters. Approach slowly and avoid chasing.',
    dangerLevel: DangerLevel.NONE,
    safetyRecommendations: 'Harmless, but their large size warrants respectful distance. Avoid touching.',
    gallery: [
      { src: 'https://placehold.co/800x600/3A4856/FFFFFF?text=Manta+Ray+1', alt: 'Manta ray swimming gracefully' },
      { src: 'https://placehold.co/800x600/3A4856/FFFFFF?text=Manta+Ray+2', alt: 'Ventral view of a manta ray showing markings' },
    ],
    region: [Region.GLOBAL],
    category: 'Fish', // Actually cartilaginous fish
    conservationStatus: 'Vulnerable',
    anecdotes: 'Manta rays have the largest brain-to-body size ratio of any cold-blooded fish. They are known to breach (leap out of the water), possibly for communication or to remove parasites.',
  },
  {
    id: 'anglerfish-003',
    name: 'Deep Sea Anglerfish',
    scientificName: 'Lophiiformes (Order)',
    description: 'Anglerfish are bony fish noted for their characteristic mode of predation, in which a fleshy growth from the fish\'s head (the esca or illicium) acts as a lure.',
    characteristics: 'Globular body, large mouth with sharp teeth. Bioluminescent lure used to attract prey. Females are much larger than parasitic males.',
    sexualDimorphism: 'Extreme sexual dimorphism in many species, where tiny males fuse to the female\'s body.',
    family: 'Various (within Lophiiformes)',
    diet: [Diet.CARNIVORE],
    minDepth: 200,
    maxDepth: 4000,
    minLength: 2, // for males
    maxLength: 100, // for females, cm
    habitatType: [HabitatType.DEEP_SEA],
    rarityLevel: RarityLevel.RARE, // Rarely observed
    dangerLevel: DangerLevel.NONE, // To humans due to habitat
    gallery: [
      { src: 'https://placehold.co/800x600/1E1E1E/FFFFFF?text=Anglerfish+1', alt: 'Deep sea anglerfish with lure' },
    ],
    region: [Region.GLOBAL], // Found in deep seas worldwide
    category: 'Fish',
    conservationStatus: 'Data Deficient',
  },
  {
    id: 'blue-ringed-octopus-004',
    name: 'Blue-Ringed Octopus',
    scientificName: 'Hapalochlaena',
    description: 'Small but highly venomous octopuses found in tide pools and coral reefs in the Pacific and Indian Oceans. They are recognized by their iridescent blue rings that flash when threatened.',
    characteristics: 'Small, golf-ball sized. Yellowish skin with blue and black rings. Rings become prominent when agitated.',
    family: 'Octopodidae',
    diet: [Diet.CARNIVORE], // Feeds on small crabs and shrimp
    minDepth: 0,
    maxDepth: 20,
    minLength: 5, // cm, including arms
    maxLength: 20, // cm
    habitatType: [HabitatType.CORAL_REEF, HabitatType.ROCKY_SHORE, HabitatType.SEAGRASS_BED],
    rarityLevel: RarityLevel.UNCOMMON,
    dangerLevel: DangerLevel.EXTREME,
    safetyRecommendations: 'Highly venomous and potentially lethal. Do not touch or provoke. Admire from a safe distance. Bites can be painless initially.',
    gallery: [
      { src: 'https://placehold.co/800x600/FFFF00/0000FF?text=Blue-Ringed+Octopus', alt: 'Blue-ringed octopus displaying its rings' },
    ],
    region: [Region.PACIFIC_SOUTH, Region.INDIAN_OCEAN, Region.CORAL_TRIANGLE],
    category: 'Invertebrate', // Mollusc
    conservationStatus: 'Not Evaluated',
  },
  {
    id: 'sea-otter-005',
    name: 'Sea Otter',
    scientificName: 'Enhydra lutris',
    description: 'Sea otters are marine mammals native to the northern and eastern North Pacific Ocean. They are the heaviest members of the weasel family but among the smallest marine mammals.',
    characteristics: 'Thick fur coat for insulation, webbed hind feet for swimming, dexterous forepaws for foraging. Uses tools like rocks to open shellfish.',
    family: 'Mustelidae',
    diet: [Diet.CARNIVORE], // Shellfish, sea urchins, crabs
    minDepth: 0,
    maxDepth: 50, // Usually nearshore
    minLength: 100,
    maxLength: 150, // cm
    habitatType: [HabitatType.KELP_FOREST, HabitatType.ROCKY_SHORE, HabitatType.ESTUARY],
    rarityLevel: RarityLevel.UNCOMMON, // Was endangered, recovering
    observationTips: 'Often seen floating on their backs, sometimes using tools. Look for them in kelp beds or near rocky coastlines.',
    dangerLevel: DangerLevel.LOW, // Generally not aggressive but wild animals
    safetyRecommendations: 'Observe from a distance, do not feed.',
    gallery: [
      { src: 'https://placehold.co/800x600/A0522D/FFFFFF?text=Sea+Otter+1', alt: 'Sea otter floating on its back' },
      { src: 'https://placehold.co/800x600/A0522D/FFFFFF?text=Sea+Otter+2', alt: 'Sea otter with pup' },
    ],
    region: [Region.PACIFIC_NORTH],
    category: 'Mammal',
    conservationStatus: 'Endangered',
  },
  {
    id: 'leafy-seadragon-006',
    name: 'Leafy Seadragon',
    scientificName: 'Phycodurus eques',
    description: 'A marine fish in the family Syngnathidae, which includes seahorses. It is found along the southern and western coasts of Australia.',
    characteristics: 'Covered in leaf-like appendages that provide camouflage. Brown to yellow in body colour with olive-tinted appendages.',
    family: 'Syngnathidae',
    diet: [Diet.CARNIVORE], // Mysid shrimp, small crustaceans
    minDepth: 3,
    maxDepth: 50,
    minLength: 20,
    maxLength: 35, // cm
    habitatType: [HabitatType.KELP_FOREST, HabitatType.SEAGRASS_BED, HabitatType.ROCKY_SHORE],
    rarityLevel: RarityLevel.RARE,
    observationTips: 'Extremely well camouflaged. Look for gentle movements among kelp or seagrass.',
    dangerLevel: DangerLevel.NONE,
    gallery: [
      { src: 'https://placehold.co/800x600/9ACD32/000000?text=Leafy+Seadragon', alt: 'Leafy seadragon camouflaged' },
    ],
    region: [Region.PACIFIC_SOUTH], // Specifically southern Australia
    category: 'Fish',
    conservationStatus: 'Near Threatened',
  }
  // Add a reptile for testing
  // {
  //   id: 'green-sea-turtle-007',
  //   name: 'Green Sea Turtle',
  //   scientificName: 'Chelonia mydas',
  //   description: 'A large sea turtle belonging to the family Cheloniidae. It is named not for the color of its shell, but for the green color of the fat beneath its shell.',
  //   characteristics: 'Smooth, heart-shaped carapace. Adults can weigh up to 300-400 lbs. Color varies from olive-green to black.',
  //   family: 'Cheloniidae',
  //   diet: [Diet.HERBIVORE], // Primarily seagrass and algae as adults
  //   minDepth: 0,
  //   maxDepth: 100, // Forages in shallow waters
  //   minLength: 80,
  //   maxLength: 150, // cm (carapace length)
  //   habitatType: [HabitatType.CORAL_REEF, HabitatType.SEAGRASS_BED, HabitatType.OPEN_OCEAN], // Migratory
  //   rarityLevel: RarityLevel.UNCOMMON,
  //   dangerLevel: DangerLevel.LOW,
  //   gallery: [{ src: 'https://placehold.co/800x600/2E8B57/FFFFFF?text=Green+Sea+Turtle', alt: 'Green Sea Turtle swimming' }],
  //   region: [Region.GLOBAL], // Tropical and subtropical oceans
  //   category: 'Reptile',
  //   conservationStatus: 'Endangered',
  // }
];
