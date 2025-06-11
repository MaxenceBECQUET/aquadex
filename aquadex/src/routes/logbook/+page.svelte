<script lang="ts">
  import { diveLogEntries } from '$lib/stores/diveLogStore';
  import type { DiveLogEntry } from '$lib/types/diveLog';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '$lib/components/ui/card';
  import { PlusCircle, Edit3, Trash2, MapPin, CalendarDays, Microscope } from 'lucide-svelte';
  import { fly } from 'svelte/transition';

  let entries: DiveLogEntry[] = [];
  diveLogEntries.subscribe(value => {
    // Already sorted by timestamp desc in store
    entries = value;
  });

  function handleDelete(id: string, speciesName: string) {
    if (confirm(`Are you sure you want to delete the observation for ${speciesName}?`)) {
      diveLogEntries.deleteEntry(id);
    }
  }

  function formatDate(isoString: string) {
    return new Date(isoString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl md:text-4xl font-bold text-foreground">Dive Logbook</h1>
    <Button href="/logbook/new" size="lg">
      <PlusCircle class="h-5 w-5 mr-2" />
      Add New Observation
    </Button>
  </div>

  {#if entries.length === 0}
    <div class="text-center py-16 bg-muted/30 rounded-xl shadow">
      <Microscope class="h-20 w-20 text-primary mx-auto mb-6 opacity-70" />
      <h2 class="text-2xl font-semibold text-foreground mb-3">Your Logbook is Empty</h2>
      <p class="text-muted-foreground mb-6">
        Start recording your marine life observations to build your personal dive log.
      </p>
      <Button href="/logbook/new" variant="primary" size="lg">
        Log Your First Sighting
      </Button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each entries as entry (entry.id)}
        <div in:fly={{ y: 20, duration: 300 }}>
          <Card class="h-full flex flex-col shadow-lg hover:shadow-primary/10 transition-shadow">
            <CardHeader class="pb-3">
              <CardTitle class="text-xl text-primary truncate">{entry.speciesName}</CardTitle>
              <CardDescription class="text-xs">Sighting ID: {entry.id.substring(0,8)}...</CardDescription>
            </CardHeader>
            <CardContent class="flex-grow space-y-2 text-sm">
              <div class="flex items-center text-muted-foreground">
                <CalendarDays class="h-4 w-4 mr-2 text-primary/70" />
                <span>{formatDate(entry.date)}</span>
              </div>
              <div class="flex items-center text-muted-foreground">
                <MapPin class="h-4 w-4 mr-2 text-primary/70" />
                <span class="truncate">{entry.location}</span>
              </div>
              {#if entry.notes}
                <p class="pt-1 text-foreground/80 line-clamp-3"><strong>Notes:</strong> {entry.notes}</p>
              {/if}
            </CardContent>
            <CardFooter class="pt-4 flex justify-end space-x-2 border-t border-border/50 mt-auto">
              <Button href={`/logbook/${entry.id}/edit`} variant="outline" size="sm">
                <Edit3 class="h-4 w-4 mr-1.5" /> Edit
              </Button>
              <Button variant="destructiveOutline" size="sm" on:click={() => handleDelete(entry.id, entry.speciesName)}>
                <Trash2 class="h-4 w-4 mr-1.5" /> Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      {/each}
    </div>
  {/if}
</div>
