<script lang="ts">
  import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './index';
</script>

<Card {...$$props}>
  <CardHeader>
    <CardTitle>Information Title</CardTitle>
    <CardDescription>Optional short description for the info card.</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-muted-foreground">Info card details placeholder. This could be used for displaying tips, facts, or summaries.</p>
    <!-- You could also include lists, icons, etc. -->
    <!-- <ul class="list-disc list-inside text-sm text-muted-foreground mt-2">
      <li>Fact 1</li>
      <li>Fact 2</li>
    </ul> -->
  </CardContent>
</Card>
