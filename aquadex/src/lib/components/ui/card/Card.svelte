<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  // Updated base classes: rounded-lg (0.75rem), shadow-md
  let baseClass = "bg-muted rounded-lg shadow-md border border-border overflow-hidden";

  // Allow overriding with $$props.class
  $: finalClass = twMerge(baseClass, $$props.class);
</script>

<div class="{finalClass}" {...$$restProps}>
  <slot />
</div>
