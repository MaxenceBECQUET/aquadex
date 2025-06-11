<script lang="ts">
  import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './index';
</script>

<Card class="items-center text-center {$$props.class}" {...$$props}>
  <CardHeader class="pb-2"> {/* Adjusted padding for tighter layout */}
    <CardTitle>Badge Title</CardTitle>
  </CardHeader>
  <CardContent class="flex flex-col items-center">
    <div class="mx-auto bg-primary/20 rounded-full h-24 w-24 flex items-center justify-center border-4 border-primary/30 shadow-md">
      <!-- Slot for icon or dynamic content if needed -->
      <span class="text-4xl text-primary">🏆</span>
    </div>
    <CardDescription class="mt-3 font-medium">
      You've achieved this badge!
    </CardDescription>
    <p class="mt-1 text-xs text-muted-foreground px-2">
      This badge is awarded for demonstrating exceptional skill or completing a specific milestone.
    </p>
  </CardContent>
</Card>
