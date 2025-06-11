<script lang="ts">
  import "../app.css";
  import { Home, BookOpen, User, Settings, Menu, ClipboardList } from "lucide-svelte";
  import { page } from '$app/stores';

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/library", label: "Library", icon: BookOpen },
    { href: "/logbook", label: "Logbook", icon: ClipboardList },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings }, // Added Settings to navLinks
  ];

  // Reactive variable to track current path for active link styling
  $: currentPath = $page.url.pathname;
</script>

<!-- Desktop Navigation (Left Sidebar) -->
<nav class="hidden md:block fixed left-0 top-0 bottom-0 w-60 bg-background border-r border-border/50 shadow-lg z-10">
  <div class="flex flex-col p-4 space-y-2">
    <a href="/" class="text-2xl font-bold mb-8 text-primary hover:text-primary/80 transition-colors">Aquadex</a>
    {#each navLinks as link}
      <a
        href={link.href}
        class="flex items-center space-x-3 px-3 py-2 rounded-md text-lg hover:bg-muted/50 transition-colors {currentPath === link.href ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground/70 hover:text-foreground'}"
      >
        <svelte:component this={link.icon} class="h-6 w-6" />
        <span>{link.label}</span>
      </a>
    {/each}
  </div>
  <div class="absolute bottom-4 left-0 right-0 p-4">
    <!-- Desktop settings link can remain separate if a different style is desired, -->
    <!-- or it could be removed if `navLinks` now covers it satisfactorily. -->
    <!-- For now, let's keep it to maintain the existing distinct desktop style. -->
     <a
        href="/settings"
        class="flex items-center space-x-3 px-3 py-2 rounded-md text-lg hover:bg-muted/50 transition-colors {currentPath === '/settings' ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground/70 hover:text-foreground'}"
      >
        <Settings class="h-6 w-6" />
        <span>Settings</span>
      </a>
  </div>
</nav>

<!-- Mobile Navigation (Bottom Bar) -->
<!-- Now iterates over navLinks which includes Settings -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-muted/75 backdrop-blur-md border-t border-border/50 shadow-lg z-10">
  <div class="flex justify-around items-center h-full">
    {#each navLinks as link}
      <a
        href={link.href}
        class="flex flex-col items-center justify-center space-y-1 px-2 py-1 rounded-md hover:bg-primary/10 transition-colors {currentPath === link.href ? 'text-primary scale-105' : 'text-foreground/70 hover:text-foreground'}"
      >
        <svelte:component this={link.icon} class="h-6 w-6" />
        <span class="text-xs">{link.label}</span>
      </a>
    {/each}
  </div>
</nav>

<!-- Main Content Area -->
<main class="pb-16 md:pb-0 md:pl-60 min-h-screen">
  <div class="p-4 md:p-8">
    <slot />
  </div>
</main>
