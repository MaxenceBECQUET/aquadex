<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let value: string | number | undefined = undefined;
  export let type = 'text';
  export let placeholder: string | undefined = undefined;
  export let disabled = false;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;

  let baseClasses = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const finalClass = twMerge(baseClasses, $$props.class);
</script>

<input
  {id}
  {name}
  {type}
  {placeholder}
  {disabled}
  bind:value
  class="{finalClass}"
  {...$$restProps}
/>
