<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export type Variant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'icon';
  export let variant: Variant = 'primary';
  export let type: "button" | "submit" | "reset" | null | undefined = "button";
  export let disabled = false;
  export let href: string | null = null;

  // Base classes inspired by shadcn-svelte default button
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  // Default padding and height, can be overridden by specific variants like 'icon' or 'link'
  const sizeClasses = 'h-10 px-4 py-2';

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground text-foreground',
    link: 'text-primary underline-offset-4 hover:underline px-0', // Removes default horizontal padding
    icon: 'h-10 w-10 p-0', // Fixed size, padding removed to allow icon to center with its own padding or direct sizing
  };

  // Combine base, size (if not icon/link), variant, and passed classes
  $: finalClasses = twMerge(
    base,
    (variant !== 'icon' && variant !== 'link') ? sizeClasses : '',
    variantStyles[variant],
    $$props.class
  );
</script>

{#if href}
  <a
    {href}
    class="{finalClasses}"
    aria-disabled={disabled ? 'true' : undefined}
    on:click={(e) => { if (disabled) e.preventDefault(); }}
    {...$$restProps}
    role="button"
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="{finalClasses}"
    {...$$restProps}
  >
    <slot />
  </button>
{/if}
