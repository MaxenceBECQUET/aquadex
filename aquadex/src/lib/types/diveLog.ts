export interface DiveLogEntry {
  id: string; // Unique identifier (e.g., UUID)
  speciesId: string; // References MarineCreature.id
  speciesName: string; // Denormalized for easy display
  date: string; // ISO date string, e.g., YYYY-MM-DD
  location: string; // User-defined location string
  notes?: string;
  latitude?: number;
  longitude?: number;
  timestamp: number; // Date.now() at creation/update for sorting
}

// Optional: Define a type for the data needed to create a new entry,
// excluding fields that will be auto-generated or derived.
export type DiveLogEntryCreateData = Omit<DiveLogEntry, 'id' | 'timestamp' | 'speciesName'> & {
  // speciesId is required to look up the name
  speciesId: string;
};

export type DiveLogEntryUpdateData = Partial<Omit<DiveLogEntry, 'id' | 'timestamp' | 'speciesName'>> & {
  // speciesId can be optional during update if not changing species, or required if it can change
  speciesId?: string;
};
