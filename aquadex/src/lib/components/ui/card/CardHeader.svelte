<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  let className = undefined;
  export { className as class };

  const finalClass = twMerge("flex flex-col space-y-1.5 p-6", className);
</script>

<div class="{finalClass}" {...$$restProps}>
  <slot />
</div>
