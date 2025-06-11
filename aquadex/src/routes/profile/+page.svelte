<script lang="ts">
  import { awardedBadges } from '$lib/stores/userProfileStore';
  import { diveLogEntries } from '$lib/stores/diveLogStore'; // Import diveLogEntries
  import type { Badge } from '$lib/types/badges';
  import BadgeDisplay from '$lib/components/profile/BadgeDisplay.svelte';
  import { allBadgeMetadata } from '$lib/data/badges';
  import { Medal, ShieldOff, BarChart3, Eye, Award, Microscope } from 'lucide-svelte'; // Added icons for stats, Added Microscope
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'; // Import Card components

  let userBadges: Badge[] = [];
  awardedBadges.subscribe(value => {
    userBadges = value;
  });

  // For displaying all badges (achieved and locked)
  $: allPossibleBadges = allBadgeMetadata.map(meta => {
    const achieved = userBadges.find(ub => ub.code === meta.code);
    if (achieved) {
      return achieved;
    }
    return { ...meta, achievedDate: undefined }; // Mark as not achieved
  }).sort((a,b) => { // Sort achieved first, then by name
      if (a.achievedDate && !b.achievedDate) return -1;
      if (!a.achievedDate && b.achievedDate) return 1;
      return a.name.localeCompare(b.name);
  });

  // Statistics
  let totalObservations = 0;
  let uniqueSpeciesObserved = 0;
  let badgesObtained = 0;

  $: {
    totalObservations = $diveLogEntries.length;
    const speciesIds = new Set($diveLogEntries.map(entry => entry.speciesId));
    uniqueSpeciesObserved = speciesIds.size;
    // badgesObtained is already reactive to $awardedBadges length via userBadges
  }
  $: badgesObtained = userBadges.length; // More direct way to get awarded badges count

  // For testing badge awarding logic - REMOVE IN PRODUCTION
  // import { diveLogEntries } from '$lib/stores/diveLogStore';
  // import { sampleSpecies } from '$lib/data/sampleSpecies';
  // function testAwardBadges() {
  //   // @ts-ignore
  //   awardedBadges._resetBadges(); // Private method for testing
  //   const species = sampleSpecies;
  //   diveLogEntries.addEntry({ speciesId: species[0].id, date: '2024-01-01', location: 'Test Reef 1' });
  //   diveLogEntries.addEntry({ speciesId: species[1].id, date: '2024-01-02', location: 'Test Reef 2' });
  //   diveLogEntries.addEntry({ speciesId: species[2].id, date: '2024-01-03', location: 'Test Reef 3' });
  //   diveLogEntries.addEntry({ speciesId: species[3].id, date: '2024-01-04', location: 'Test Reef 4' });
  //   diveLogEntries.addEntry({ speciesId: species[4].id, date: '2024-01-05', location: 'Test Reef 5' });
  //   // Add specific entries for other badges if needed for testing
  //   // e.g., mammal: sea otter is species[4]
  //   // e.g., endangered: sea otter is species[4]
  //   // e.g., deep diver: anglerfish is species[2] (minDepth 200m)
  //   // e.g., arctic: (add an arctic species and log if not present)
  //   // e.g., coral: clownfish (species[0]), blue-ringed octopus (species[3]), (add another coral species)
  // }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl md:text-4xl font-bold text-foreground">My Profile</h1>
    <!-- <Button on:click={testAwardBadges}>Test Award Badges (Dev)</Button> -->
  </div>

  <!-- Statistics Section -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-6 text-primary flex items-center">
      <BarChart3 class="h-7 w-7 mr-3" />
      My Aquadex Stats
    </h2>
    <Card class="shadow-lg">
      <CardContent class="p-6 space-y-0"> {/* Removed default space-y from CardContent if any, and default padding */}
        <div class="flex justify-between items-center py-4 border-b border-border">
          <div class="flex items-center">
            <Eye class="h-5 w-5 mr-3 text-muted-foreground" />
            <span class="text-muted-foreground">Total Dives Logged:</span>
          </div>
          <span class="font-bold text-xl text-primary">{totalObservations}</span>
        </div>
        <div class="flex justify-between items-center py-4 border-b border-border">
          <div class="flex items-center">
            <Microscope class="h-5 w-5 mr-3 text-muted-foreground" /> {/* Using Microscope icon from logbook page */}
            <span class="text-muted-foreground">Unique Species Seen:</span>
          </div>
          <span class="font-bold text-xl text-primary">{uniqueSpeciesObserved}</span>
        </div>
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <Award class="h-5 w-5 mr-3 text-muted-foreground" />
            <span class="text-muted-foreground">Badges Earned:</span>
          </div>
          <span class="font-bold text-xl text-primary">{badgesObtained}</span>
        </div>
      </CardContent>
    </Card>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center">
      <Medal class="h-7 w-7 mr-3" />
      My Earned Badges
    </h2>
    {#if userBadges.length === 0}
      <div class="text-center py-12 bg-muted/30 rounded-xl shadow">
        <ShieldOff class="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p class="text-xl text-muted-foreground">No badges earned yet.</p>
        <p class="text-sm text-muted-foreground mt-1">Keep logging your dives to unlock new achievements!</p>
      </div>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {#each userBadges as badge (badge.code)}
          <BadgeDisplay {badge} />
        {/each}
      </div>
    {/if}
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center">
      <Medal class="h-7 w-7 mr-3 opacity-50" />
      All Possible Badges
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {#each allPossibleBadges as badge (badge.code)}
        <BadgeDisplay {badge} />
      {/each}
    </div>
  </section>
</div>
