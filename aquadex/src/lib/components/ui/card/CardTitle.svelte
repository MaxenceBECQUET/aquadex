<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  let className = undefined;
  export { className as class };

  const finalClass = twMerge("text-lg font-semibold leading-none tracking-tight", className);
</script>

<h3 class="{finalClass}" {...$$restProps}>
  <slot />
</h3>
