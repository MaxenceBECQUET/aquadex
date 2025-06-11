<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { allSpecies } from '$lib/stores/speciesStore';
  import { diveLogEntries } from '$lib/stores/diveLogStore';
  import type { DiveLogEntry } from '$lib/types/diveLog';
  import type { MarineCreature } from '$lib/types/species';

  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
  import { ArrowLeft, Save, AlertTriangle } from 'lucide-svelte';

  let availableSpecies: MarineCreature[] = [];
  allSpecies.subscribe(value => {
    availableSpecies = value.sort((a, b) => a.name.localeCompare(b.name));
  });

  let entryToEdit: DiveLogEntry | undefined;
  let originalEntryData: Partial<DiveLogEntry> = {}; // Use Partial for fields that might be undefined

  const entryId = $page.params.id;
  entryToEdit = diveLogEntries.getEntryById(entryId);

  // Initialize form data if entry is found
  if (entryToEdit) {
    originalEntryData = { ...entryToEdit };
  }

  let errors: Record<string, string> = {};

  function validate(): boolean {
    errors = {};
    if (!originalEntryData.speciesId) {
      errors.speciesId = 'Species selection is required.';
    }
    if (!originalEntryData.date) {
      errors.date = 'Date is required.';
    }
    if (!originalEntryData.location?.trim()) {
      errors.location = 'Location is required.';
    }
     if (originalEntryData.latitude !== undefined && originalEntryData.latitude !== null && (originalEntryData.latitude < -90 || originalEntryData.latitude > 90)) {
      errors.latitude = 'Latitude must be between -90 and 90.';
    }
    if (originalEntryData.longitude !== undefined && originalEntryData.longitude !== null && (originalEntryData.longitude < -180 || originalEntryData.longitude > 180)) {
      errors.longitude = 'Longitude must be between -180 and 180.';
    }
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (!validate() || !entryToEdit) { // Ensure entryToEdit is defined
      return;
    }

    // Construct the updated entry, ensuring all required fields are present
    const updatedEntry: DiveLogEntry = {
      id: entryToEdit.id, // Keep original ID
      speciesId: originalEntryData.speciesId!, // Assert non-null as it's validated
      speciesName: entryToEdit.speciesName, // Will be re-derived in store if speciesId changes
      date: originalEntryData.date!, // Assert non-null
      location: originalEntryData.location!, // Assert non-null
      notes: originalEntryData.notes,
      latitude: originalEntryData.latitude,
      longitude: originalEntryData.longitude,
      timestamp: Date.now(), // Update timestamp
    };

    diveLogEntries.updateEntry(updatedEntry);
    goto('/logbook', { invalidateAll: true });
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-2xl">
  <div class="mb-6">
    <Button href="/logbook" variant="outline" size="sm">
      <ArrowLeft class="h-4 w-4 mr-2" />
      Back to Logbook
    </Button>
  </div>

  {#if entryToEdit && originalEntryData}
    <Card class="shadow-xl">
      <CardHeader>
        <CardTitle class="text-2xl">Edit Dive Observation</CardTitle>
      </CardHeader>
      <CardContent>
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <Label htmlFor="speciesId">Species *</Label>
            <select id="speciesId" bind:value={originalEntryData.speciesId} class="flex h-10 w-full items-center justify-between rounded-md border {errors.speciesId ? 'border-destructive' : 'border-input'} bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 {errors.speciesId ? 'focus:ring-destructive' : 'focus:ring-primary'} focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="" disabled>Select a species...</option>
              {#each availableSpecies as species (species.id)}
                <option value={species.id}>{species.name} ({species.scientificName})</option>
              {/each}
            </select>
            {#if errors.speciesId}<p class="text-sm text-destructive mt-1">{errors.speciesId}</p>{/if}
          </div>

          <div>
            <Label htmlFor="date">Date of Observation *</Label>
            <Input type="date" id="date" bind:value={originalEntryData.date} class={errors.date ? 'border-destructive focus:ring-destructive' : ''} />
            {#if errors.date}<p class="text-sm text-destructive mt-1">{errors.date}</p>{/if}
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input type="text" id="location" placeholder="e.g., Blue Corner, Palau" bind:value={originalEntryData.location} class={errors.location ? 'border-destructive focus:ring-destructive' : ''} />
            {#if errors.location}<p class="text-sm text-destructive mt-1">{errors.location}</p>{/if}
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any interesting behaviors, sightings, or conditions..." bind:value={originalEntryData.notes} rows={4} />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="latitude">Latitude (Optional)</Label>
              <Input type="number" step="any" id="latitude" placeholder="e.g., 7.3365" bind:value={originalEntryData.latitude} class={errors.latitude ? 'border-destructive focus:ring-destructive' : ''} />
              {#if errors.latitude}<p class="text-sm text-destructive mt-1">{errors.latitude}</p>{/if}
            </div>
            <div>
              <Label htmlFor="longitude">Longitude (Optional)</Label>
              <Input type="number" step="any" id="longitude" placeholder="e.g., 134.4726" bind:value={originalEntryData.longitude} class={errors.longitude ? 'border-destructive focus:ring-destructive' : ''} />
              {#if errors.longitude}<p class="text-sm text-destructive mt-1">{errors.longitude}</p>{/if}
            </div>
          </div>

          <CardFooter class="px-0 pt-6 flex justify-end">
            <Button type="submit" size="lg">
              <Save class="h-5 w-5 mr-2" />
              Update Observation
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  {:else}
    <div class="text-center py-16 bg-muted/30 rounded-xl shadow">
        <AlertTriangle class="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-destructive mb-2">Log Entry Not Found</h1>
        <p class="text-lg text-muted-foreground mb-6">Sorry, we couldn't find the log entry you were trying to edit.</p>
        <Button href="/logbook" variant="primary" size="lg">
            <ArrowLeft class="h-5 w-5 mr-2" />
            Return to Logbook
        </Button>
    </div>
  {/if}
</div>
