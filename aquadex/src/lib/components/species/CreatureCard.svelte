<script lang="ts">
  import type { MarineCreature } from '$lib/types/species';
  import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button'; // For a potential details button
  import { ExternalLink } from 'lucide-svelte'; // If using an external link style button

  export let creature: MarineCreature;

  // Truncate description for card view
  function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
  }
</script>

<a href={`/library/${creature.id}`} class="block group hover:shadow-primary/20 transition-shadow duration-300 rounded-[1rem]">
  <Card class="h-full flex flex-col transition-all duration-300 group-hover:border-primary/50 {$$props.class}">
    <CardHeader class="pb-3">
      <CardTitle class="truncate group-hover:text-primary transition-colors">{creature.name}</CardTitle>
      <CardDescription class="text-xs truncate">{creature.scientificName}</CardDescription>
    </CardHeader>

    {#if creature.gallery && creature.gallery.length > 0}
      <div class="aspect-[16/10] overflow-hidden relative">
        <img
          src={creature.gallery[0].src}
          alt={creature.gallery[0].alt || `Image of ${creature.name}`}
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {#if creature.region && creature.region.length > 0}
          <span class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {creature.region[0]} {#if creature.region.length > 1}+ {creature.region.length - 1}{/if}
          </span>
        {/if}
      </div>
    {/if}

    <CardContent class="pt-4 flex-grow">
      <p class="text-sm text-muted-foreground line-clamp-3">
        {truncateText(creature.description, 90)}
      </p>
    </CardContent>

    <CardFooter class="pt-3 pb-4 flex justify-end">
      <!-- The whole card is a link, so a button here might be redundant or could be styled as text -->
      <span class="text-sm text-primary group-hover:underline">
        View Details <ExternalLink class="inline h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
      <!-- Or, if the card itself wasn't a link:
      <Button href={`/library/${creature.id}`} variant="link" class="p-0 h-auto">
        View Details <ExternalLink class="inline h-4 w-4 ml-1" />
      </Button>
      -->
    </CardFooter>
  </Card>
</a>
