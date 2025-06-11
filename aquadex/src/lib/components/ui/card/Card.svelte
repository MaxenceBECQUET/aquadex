<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  let baseClass = "bg-muted rounded-[1rem] shadow-lg border border-border overflow-hidden";
  let finalClass = twMerge(baseClass, $$props.class);
</script>

<div class="{finalClass}" {...$$restProps}>
  <slot />
</div>
