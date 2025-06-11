<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let htmlFor: string | undefined = undefined; // Changed from 'for' due to JS keyword

  let baseClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground";

  const finalClass = twMerge(baseClasses, $$props.class);
</script>

<label for="{htmlFor}" class="{finalClass}" {...$$restProps}>
  <slot />
</label>
