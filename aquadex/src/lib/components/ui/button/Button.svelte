<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export type Variant = 'primary' | 'secondary' | 'danger' | 'icon' | 'link';
  export let variant: Variant = 'primary';
  export let type: "button" | "submit" | "reset" | null | undefined = "button";
  export let disabled = false;
  export let href: string | null = null;

  let baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ring-offset-background";

  let variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
    icon: "p-2 hover:bg-accent focus:ring-accent text-foreground", // Default icon is transparent, hover adds accent
    link: "text-primary underline-offset-4 hover:underline focus:ring-primary", // Link variant
  };

  // Icon variant has different padding
  if (variant === 'icon') {
    baseClasses = twMerge(baseClasses.replace('py-2 px-4', ''), "p-2");
  } else if (variant === 'link') {
    baseClasses = twMerge(baseClasses.replace('py-2 px-4', ''), "p-0"); // No padding for link, relies on text content
  } else {
    baseClasses = twMerge(baseClasses, "py-2 px-4");
  }

  let finalClass = twMerge(
    baseClasses,
    variantClasses[variant],
    $$props.class
  );
</script>

{#if href}
  <a
    {href}
    class="{finalClass}"
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
    class="{finalClass}"
    {...$$restProps}
  >
    <slot />
  </button>
{/if}
