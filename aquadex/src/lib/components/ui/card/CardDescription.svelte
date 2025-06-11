<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  let className = undefined;
  export { className as class };

  // Corrected the div to p in the original prompt for semantic HTML
  const finalClass = twMerge("text-sm text-muted-foreground", className);
</script>

<p class="{finalClass}" {...$$restProps}>
  <slot />
</p>
