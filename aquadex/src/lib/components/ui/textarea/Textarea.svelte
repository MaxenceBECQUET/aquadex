<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let value: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let disabled = false;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let rows = 3;

  let baseClasses = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const finalClass = twMerge(baseClasses, $$props.class);
</script>

<textarea
  {id}
  {name}
  {placeholder}
  {disabled}
  {rows}
  bind:value
  class="{finalClass}"
  {...$$restProps}
></textarea>
