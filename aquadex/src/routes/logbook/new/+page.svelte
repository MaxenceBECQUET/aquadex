<script lang="ts">
  import { goto } from '$app/navigation';
  import { allSpecies } from '$lib/stores/speciesStore';
  import { diveLogEntries } from '$lib/stores/diveLogStore';
  import type { DiveLogEntryCreateData } from '$lib/types/diveLog';
  import type { MarineCreature } from '$lib/types/species';

  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
  import { ArrowLeft, Save } from 'lucide-svelte';

  let availableSpecies: MarineCreature[] = [];
  allSpecies.subscribe(value => {
    availableSpecies = value.sort((a, b) => a.name.localeCompare(b.name));
  });

  let newEntryData: Partial<DiveLogEntryCreateData> = {
    speciesId: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    location: '',
    notes: '',
    latitude: undefined,
    longitude: undefined,
  };

  let errors: Record<string, string> = {};

  function validate(): boolean {
    errors = {};
    if (!newEntryData.speciesId) {
      errors.speciesId = 'Species selection is required.';
    }
    if (!newEntryData.date) {
      errors.date = 'Date is required.';
    }
    if (!newEntryData.location?.trim()) {
      errors.location = 'Location is required.';
    }
    if (newEntryData.latitude !== undefined && (newEntryData.latitude < -90 || newEntryData.latitude > 90)) {
      errors.latitude = 'Latitude must be between -90 and 90.';
    }
    if (newEntryData.longitude !== undefined && (newEntryData.longitude < -180 || newEntryData.longitude > 180)) {
      errors.longitude = 'Longitude must be between -180 and 180.';
    }
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) {
      return;
    }
    // Ensure speciesId is set, as it's required by DiveLogEntryCreateData
    if (newEntryData.speciesId) {
        diveLogEntries.addEntry(newEntryData as DiveLogEntryCreateData);
        goto('/logbook', { invalidateAll: true }); // invalidateAll to refresh logbook data if it were loaded via load function
    } else {
        // This case should ideally be caught by validation, but as a fallback:
        errors.speciesId = "Species must be selected.";
    }
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-2xl">
  <div class="mb-6">
    <Button href="/logbook" variant="outline" size="sm">
      <ArrowLeft class="h-4 w-4 mr-2" />
      Back to Logbook
    </Button>
  </div>

  <Card class="shadow-xl">
    <CardHeader>
      <CardTitle class="text-2xl">Add New Dive Observation</CardTitle>
    </CardHeader>
    <CardContent>
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <Label htmlFor="speciesId">Species *</Label>
          <select id="speciesId" bind:value={newEntryData.speciesId} class="flex h-10 w-full items-center justify-between rounded-md border {errors.speciesId ? 'border-destructive' : 'border-input'} bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 {errors.speciesId ? 'focus:ring-destructive' : 'focus:ring-primary'} focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="" disabled>Select a species...</option>
            {#each availableSpecies as species (species.id)}
              <option value={species.id}>{species.name} ({species.scientificName})</option>
            {/each}
          </select>
          {#if errors.speciesId}<p class="text-sm text-destructive mt-1">{errors.speciesId}</p>{/if}
        </div>

        <div>
          <Label htmlFor="date">Date of Observation *</Label>
          <Input type="date" id="date" bind:value={newEntryData.date} class={errors.date ? 'border-destructive focus:ring-destructive' : ''} />
          {#if errors.date}<p class="text-sm text-destructive mt-1">{errors.date}</p>{/if}
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input type="text" id="location" placeholder="e.g., Blue Corner, Palau" bind:value={newEntryData.location} class={errors.location ? 'border-destructive focus:ring-destructive' : ''} />
          {#if errors.location}<p class="text-sm text-destructive mt-1">{errors.location}</p>{/if}
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Any interesting behaviors, sightings, or conditions..." bind:value={newEntryData.notes} rows={4} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="latitude">Latitude (Optional)</Label>
            <Input type="number" step="any" id="latitude" placeholder="e.g., 7.3365" bind:value={newEntryData.latitude} class={errors.latitude ? 'border-destructive focus:ring-destructive' : ''} />
            {#if errors.latitude}<p class="text-sm text-destructive mt-1">{errors.latitude}</p>{/if}
          </div>
          <div>
            <Label htmlFor="longitude">Longitude (Optional)</Label>
            <Input type="number" step="any" id="longitude" placeholder="e.g., 134.4726" bind:value={newEntryData.longitude} class={errors.longitude ? 'border-destructive focus:ring-destructive' : ''} />
            {#if errors.longitude}<p class="text-sm text-destructive mt-1">{errors.longitude}</p>{/if}
          </div>
        </div>

        <CardFooter class="px-0 pt-6 flex justify-end">
          <Button type="submit" size="lg">
            <Save class="h-5 w-5 mr-2" />
            Save Observation
          </Button>
        </CardFooter>
      </form>
    </CardContent>
  </Card>
</div>
