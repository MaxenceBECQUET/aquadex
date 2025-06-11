<script lang="ts">
  import type { Badge } from '$lib/types/badges';
  import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '$lib/components/ui/card'; // Using sub-components for structure

  export let badge: Badge;

  function formatDate(isoString: string | undefined) {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
</script>

<Card class="h-full flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-primary/20 {badge.achievedDate ? 'opacity-100' : 'opacity-50 grayscale'}">
  <CardHeader class="p-2">
    <div class="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center border-2 {badge.achievedDate ? 'border-primary/30' : 'border-muted-foreground/30'} shadow-md mb-2">
      <span class="text-4xl">{badge.icon}</span>
    </div>
    <CardTitle class="text-base sm:text-lg font-semibold {badge.achievedDate ? 'text-primary' : 'text-muted-foreground'}">{badge.name}</CardTitle>
  </CardHeader>
  <CardContent class="p-2 flex-grow">
    <p class="text-xs sm:text-sm text-muted-foreground leading-tight mb-2">{badge.description}</p>
    {#if badge.details && badge.achievedDate}
      <p class="text-xs text-primary/80 italic mt-1">"{badge.details}"</p>
    {/if}
  </CardContent>
  {#if badge.achievedDate}
    <div class="p-2 text-xs text-green-600 font-medium border-t border-border w-full mt-auto">
      Achieved: {formatDate(badge.achievedDate)}
    </div>
  {:else}
    <div class="p-2 text-xs text-muted-foreground font-medium border-t border-border w-full mt-auto">
      Locked
    </div>
  {/if}
</Card>
