<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  let className = undefined;
  export { className as class };

  const finalClass = twMerge("flex items-center p-6 pt-0", className);
</script>

<div class="{finalClass}" {...$$restProps}>
  <slot />
</div>
