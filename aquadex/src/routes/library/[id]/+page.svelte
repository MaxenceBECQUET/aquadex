<script lang="ts">
  import { page } from '$app/stores';
  import { allSpecies } from '$lib/stores/speciesStore';
  import type { MarineCreature } from '$lib/types/species';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '$lib/components/ui/card';
  import { Carousel } from '$lib/components/ui/carousel';
  import { ArrowLeft, AlertTriangle, Camera, Eye, BookOpen, ShieldCheck, MapPin, Maximize, Minimize, Droplets } from 'lucide-svelte'; // Added more icons

  let creature: MarineCreature | undefined;

  const creatureId = $page.params.id;
  // This is a simple client-side way. For SSR, use a load function in +page.ts
  allSpecies.subscribe(speciesList => {
    creature = speciesList.find(s => s.id === creatureId);
  });

  const formatArray = (arr: any[] | undefined, defaultVal = 'N/A') => arr && arr.length > 0 ? arr.join(', ') : defaultVal;
  const formatRange = (min: number | undefined, max: number | undefined, unit: string, defaultVal = 'N/A') => {
    if (min !== undefined && max !== undefined) return `${min} - ${max} ${unit}`;
    if (min !== undefined) return `Min ${min} ${unit}`;
    if (max !== undefined) return `Max ${max} ${unit}`;
    return defaultVal;
  };

  function getDangerLevelClass(level: string | undefined): string {
    switch (level) {
      case 'Extreme':
      case 'High':
        return 'text-red-500 border-red-500';
      case 'Medium':
      case 'Aggressive if Provoked':
      case 'Venomous (Non-Aggressive)':
        return 'text-yellow-500 border-yellow-500';
      case 'Low':
        return 'text-orange-400 border-orange-400'; // Mild caution
      case 'None':
        return 'text-green-500 border-green-500';
      default:
        return 'text-muted-foreground border-muted-foreground';
    }
  }
</script>

<div class="container mx-auto px-2 sm:px-4 py-8">
  {#if creature}
    <div class="mb-6 print:hidden">
      <Button href="/library" variant="outline" size="sm">
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Library
      </Button>
    </div>

    <article class="bg-card p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl">
      <header class="mb-6 md:mb-8 text-center border-b border-border pb-6">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">{creature.name}</h1>
        <p class="text-lg sm:text-xl md:text-2xl text-muted-foreground italic">{creature.scientificName}</p>
      </header>

      <div class="grid lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Left/Main Column -->
        <div class="lg:col-span-2 space-y-6 md:space-y-8">
          {#if creature.gallery && creature.gallery.length > 0}
            <section class="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-lg">
              <Carousel images={creature.gallery} id={`carousel-${creature.id}`} />
            </section>
          {/if}

          <section>
            <h2 class="text-2xl font-semibold text-primary mb-3 flex items-center"><BookOpen class="h-6 w-6 mr-3 text-primary/80"/>Description</h2>
            <p class="text-foreground/90 whitespace-pre-line leading-relaxed prose prose-sm sm:prose-base max-w-none prose-headings:text-primary prose-a:text-accent">
              {creature.description || 'No description available.'}
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-primary mb-3 flex items-center"><Maximize class="h-6 w-6 mr-3 text-primary/80"/>Characteristics</h2>
            <p class="text-foreground/90 whitespace-pre-line leading-relaxed prose prose-sm sm:prose-base max-w-none">
              {creature.characteristics || 'No characteristics available.'}
            </p>
          </section>

          {#if creature.sexualDimorphism}
            <section>
              <h2 class="text-2xl font-semibold text-primary mb-3">Sexual Dimorphism</h2>
              <p class="text-foreground/90 whitespace-pre-line leading-relaxed prose prose-sm sm:prose-base max-w-none">{creature.sexualDimorphism}</p>
            </section>
          {/if}

          {#if creature.anecdotes}
            <section class="bg-primary/5 p-4 rounded-lg">
              <h2 class="text-xl font-semibold text-primary mb-2">Anecdotes & Fun Facts</h2>
              <p class="text-foreground/80 whitespace-pre-line leading-relaxed prose prose-sm sm:prose-base max-w-none">{creature.anecdotes}</p>
            </section>
          {/if}
        </div>

        <!-- Right/Sidebar Column -->
        <aside class="lg:col-span-1 space-y-6 md:space-y-8">
          <Card class="shadow-lg">
            <CardHeader class="pb-4">
              <CardTitle class="text-xl flex items-center"><MapPin class="h-5 w-5 mr-2 text-primary"/>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2 text-sm">
              <p><strong>Family:</strong> <span class="text-muted-foreground">{creature.family}</span></p>
              <p><strong>Diet:</strong> <span class="text-muted-foreground">{formatArray(creature.diet)}</span></p>
              <p><strong>Regions:</strong> <span class="text-muted-foreground">{formatArray(creature.region)}</span></p>
              <p><strong>Habitat:</strong> <span class="text-muted-foreground">{formatArray(creature.habitatType)}</span></p>
              <p><strong>Depth:</strong> <span class="text-muted-foreground">{formatRange(creature.minDepth, creature.maxDepth, 'm')}</span></p>
              <p><strong>Size:</strong> <span class="text-muted-foreground">{formatRange(creature.minLength, creature.maxLength, 'cm')}</span></p>
              <p><strong>Rarity:</strong> <span class="text-muted-foreground">{creature.rarityLevel}</span></p>
              {#if creature.conservationStatus}
                <p><strong>Conservation:</strong> <span class="text-muted-foreground">{creature.conservationStatus}</span></p>
              {/if}
            </CardContent>
          </Card>

          <Card class="shadow-lg">
            <CardHeader class="pb-4">
              <CardTitle class="text-xl flex items-center"><ShieldCheck class="h-5 w-5 mr-2 text-primary"/>Observation & Safety</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3 text-sm">
              {#if creature.observationTips}
                <div>
                  <h4 class="font-semibold mb-1 flex items-center"><Eye class="h-4 w-4 mr-2 text-muted-foreground"/>Observation Tips:</h4>
                  <p class="text-muted-foreground pl-1 whitespace-pre-line">{creature.observationTips}</p>
                </div>
              {/if}
              {#if creature.photoTips}
                <div>
                  <h4 class="font-semibold mb-1 flex items-center"><Camera class="h-4 w-4 mr-2 text-muted-foreground"/>Photography Tips:</h4>
                  <p class="text-muted-foreground pl-1 whitespace-pre-line">{creature.photoTips}</p>
                </div>
              {/if}
              <div>
                <h4 class="font-semibold mb-1 flex items-center"><AlertTriangle class="h-4 w-4 mr-2 {getDangerLevelClass(creature.dangerLevel)}"/>Danger Level:</h4>
                <p class="font-bold {getDangerLevelClass(creature.dangerLevel)} pl-1">{creature.dangerLevel}</p>
              </div>
              {#if creature.safetyRecommendations}
                <div>
                  <h4 class="font-semibold mb-1">Safety Recommendations:</h4>
                  <p class="text-muted-foreground pl-1 whitespace-pre-line">{creature.safetyRecommendations}</p>
                </div>
              {/if}
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>

  {:else}
    <div class="text-center py-16">
      <AlertTriangle class="h-16 w-16 text-destructive mx-auto mb-4" />
      <h1 class="text-3xl font-bold text-destructive mb-2">Creature Not Found</h1>
      <p class="text-lg text-muted-foreground mb-6">Sorry, we couldn't find the creature you were looking for.</p>
      <Button href="/library" variant="primary" size="lg">
        <ArrowLeft class="h-5 w-5 mr-2" />
        Return to Library
      </Button>
    </div>
  {/if}
</div>

<style>
  /* Add Tailwind's typography plugin styles if not globally applied */
  /* @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @tailwind typography; */

  /* Custom prose styles for better control if needed */
  .prose :where(p):not(:where([class~="not-prose"] *)) {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
</style>
