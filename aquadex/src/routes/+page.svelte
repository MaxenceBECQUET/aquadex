<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import InfoCard from '$lib/components/ui/card/InfoCard.svelte'; // Keep this if it's a generic InfoCard
  import BadgeCard from '$lib/components/ui/card/BadgeCard.svelte'; // Keep this
  // The old CreatureCard placeholder import is removed.
  // The new CreatureCard will be imported if we decide to showcase it here.
  // For now, let's get a sample creature to display if we showcase the new one.
  import { allSpecies } from '$lib/stores/speciesStore'; // To get a sample creature
  import CreatureCard from '$lib/components/species/CreatureCard.svelte'; // Import the new species card
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Modal } from '$lib/components/ui/modal';
  import { Carousel } from '$lib/components/ui/carousel';
  import { Home, AlertTriangle, Trash2, ExternalLink, Settings, Heart } from 'lucide-svelte'; // Added Settings, Heart

  let count = 0;
  const handleClick = () => {
    count += 1;
  }

  let formValues = {
    fullName: '',
    email: '',
    password: '',
    description: '',
    disabledInput: 'This is disabled'
  };

  const handleFormSubmit = () => {
    alert(JSON.stringify(formValues, null, 2));
  }

  let modalOpen = false;

  // Get a sample creature for the showcase
  let sampleCreatureForShowcase;
  const unsubscribe = allSpecies.subscribe(species => {
    if (species.length > 0) {
      sampleCreatureForShowcase = species[0]; // Take the first one
    }
  });
  // Consider calling unsubscribe in onDestroy if this component gets complex, but for +page.svelte it's usually fine.

  const sampleImages = [
    { src: 'https://placehold.co/800x450/ff6b6b/f0f8ff?text=Aquadex+Slide+1', alt: 'Coral reef scene with vibrant colors and various types of coral.' },
    { src: 'https://placehold.co/800x450/4ecdc4/00122e?text=Aquadex+Slide+2', alt: 'A school of colorful tropical fish swimming in clear blue water.' },
    { src: 'https://placehold.co/800x450/00296b/f0f8ff?text=Aquadex+Slide+3', alt: 'A mysterious deep sea creature with bioluminescent features in dark waters.' },
    { src: 'https://placehold.co/800x450/ffc107/00122e?text=Aquadex+Slide+4', alt: 'A sunken ship wreckage on the ocean floor, becoming an artificial reef.' },
    { src: 'https://placehold.co/800x450/784f9a/f0f8ff?text=Aquadex+Slide+5', alt: 'A majestic whale shark swimming gracefully near the water surface.' },
  ];
</script>

<div class="p-4 md:p-8 space-y-8 flex flex-col items-start w-full max-w-5xl mx-auto mb-16"> {/* Added mb-16 for bottom spacing */}
  <h1 class="text-3xl md:text-4xl font-bold text-foreground self-center my-6">UI Component Showcase</h1>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">Buttons</h2>
    <div class="flex flex-wrap gap-4 items-center mb-6">
      <Button variant="primary" on:click={handleClick}>Primary Click ({count})</Button>
      <Button variant="secondary">Secondary Action</Button>
      <Button variant="danger">Danger Action</Button>
      <Button href="https://example.com" target="_blank" variant="primary">
        Link Primary <ExternalLink class="h-4 w-4 ml-2" />
      </Button>
      <Button href="https://example.com" target="_blank" variant="link">
        Simple Link <ExternalLink class="h-4 w-4 ml-1" />
      </Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
    <div class="flex flex-wrap gap-4 items-center">
      <Button variant="primary" disabled>Primary Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
      <Button variant="danger" disabled>Danger Disabled</Button>
      <Button variant="outline" disabled>Outline Disabled</Button>
      <Button variant="ghost" disabled>Ghost Disabled</Button>
      <Button variant="danger" disabled>Danger Disabled</Button>
      <Button href="https://example.com" target="_blank" variant="primary" disabled>
        Link Disabled <ExternalLink class="h-4 w-4 ml-2" />
      </Button>
      <Button href="https://example.com" target="_blank" variant="link" disabled>
        Simple Link Disabled <ExternalLink class="h-4 w-4 ml-1" />
      </Button>
    </div>
  </section>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">Icon Buttons</h2>
    <div class="flex flex-wrap gap-4 items-center">
      <Button variant="icon" aria-label="Home">
        <Home class="h-5 w-5" />
      </Button>
      <Button variant="icon" aria-label="Settings">
        <Settings class="h-5 w-5" />
      </Button>
      <Button variant="icon" aria-label="Warning" class="text-destructive hover:bg-destructive/10 focus:ring-destructive/50">
        <AlertTriangle class="h-5 w-5" />
      </Button>
      <Button variant="icon" class="bg-primary text-primary-foreground hover:bg-primary/80" aria-label="Delete"> {/* Custom styling on icon button */}
        <Trash2 class="h-5 w-5" />
      </Button>
      <Button variant="icon" aria-label="Heart" disabled>
        <Heart class="h-5 w-5" />
      </Button>
       <Button variant="outline" size="icon" aria-label="Heart Outline"> {/* Testing outline with icon content, size=icon is conceptual here, actual size is from variant=icon */}
        <Heart class="h-5 w-5" />
      </Button>
    </div>
  </section>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">General Cards</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Standard Card</CardTitle>
          <CardDescription>This card uses the new sub-components for structured content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground mb-4">The content area is flexible. You can add any elements here, like this placeholder image.</p>
          <img src="https://placehold.co/600x400/00296b/f0f8ff?text=Aquadex+Image" alt="Placeholder Image" class="rounded-md w-full object-cover" />
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="secondary">Learn More</Button>
          <Button variant="primary">Take Action</Button>
        </CardFooter>
      </Card>

      <Card class="p-0">
        <CardHeader>
          <CardTitle>Card with Full-Bleed Image</CardTitle>
          <CardDescription>The main Card component has no padding here.</CardDescription>
        </CardHeader>
        <img src="https://placehold.co/600x200/4ecdc4/00122e?text=Full+Width+Image" alt="Placeholder Image" class="w-full h-48 object-cover" />
        <CardContent class="pt-6">
          <p class="text-muted-foreground">Some content below the image. Padding is re-applied by CardContent.</p>
        </CardContent>
        <CardFooter>
          <Button variant="link">Read more...</Button>
        </CardFooter>
      </Card>
    </div>
  </section>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">Specific Card Types (and New CreatureCard)</h2>
    <div class="grid md:grid-cols-3 gap-6">
        {#if sampleCreatureForShowcase}
          <CreatureCard creature={sampleCreatureForShowcase} />
        {:else}
          <p class="text-muted-foreground">Loading sample creature...</p>
        {/if}
        <InfoCard />
        <BadgeCard />
    </div>
  </section>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">Forms</h2>
    <form class="space-y-6 max-w-lg mx-auto" on:submit|preventDefault={handleFormSubmit}>
      <div class="grid grid-cols-1 gap-4">
        <div class="space-y-1">
          <Label htmlFor="fullName">Full Name</Label>
          <Input type="text" id="fullName" name="fullName" placeholder="Enter your full name" bind:value={formValues.fullName} />
        </div>

        <div class="space-y-1">
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" id="email" name="email" placeholder="you@example.com" bind:value={formValues.email} />
        </div>

        <div class="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="••••••••" bind:value={formValues.password} />
        </div>

        <div class="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Enter a short description..." rows={4} bind:value={formValues.description} />
        </div>

        <div class="space-y-1">
          <Label htmlFor="disabledInput">Disabled Input</Label>
          <Input type="text" id="disabledInput" name="disabledInput" placeholder="Cannot edit" disabled bind:value={formValues.disabledInput} />
        </div>
      </div>
      <div class="flex justify-end">
        <Button type="submit" variant="primary" class="w-full md:w-auto">Submit Form</Button>
      </div>
    </form>
  </section>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">Modal</h2>
    <div class="space-y-4 text-center">
      <Button variant="secondary" on:click={() => modalOpen = true}>Open Modal</Button>
      <p class="text-muted-foreground">Modal is currently: <span class="font-semibold text-foreground">{modalOpen ? 'Open' : 'Closed'}</span></p>
    </div>

    {#if modalOpen}
      <Modal bind:open={modalOpen}>
        <div class="space-y-4">
          <CardTitle class="text-center text-2xl">This is a Modal</CardTitle>
          <p class="text-sm text-muted-foreground text-center">
            This modal uses Svelte transitions for smooth appearance.
            You can close it by clicking the backdrop, pressing the Escape key, or using the close button below.
          </p>
          <img src="https://placehold.co/400x200/00122e/f0f8ff?text=Modal+Content" alt="Placeholder" class="rounded-md w-full my-4 shadow-lg"/>
          <div class="flex justify-end gap-3 mt-6">
              <Button variant="secondary" on:click={() => modalOpen = false}>Close Modal</Button>
              <Button variant="primary">Primary Action</Button>
          </div>
        </div>
      </Modal>
    {/if}
  </section>

  <section class="w-full bg-muted/30 p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-border pb-3">Image Gallery (Carousel)</h2>
    <div class="max-w-3xl mx-auto"> {/* Increased max-width for carousel */}
      <Carousel images={sampleImages} id="main-showcase-carousel" />
    </div>
    <div class="max-w-md mx-auto mt-8">
       <h3 class="text-lg font-semibold mb-2 text-center text-foreground/80">Carousel with fewer images</h3>
       <Carousel images={sampleImages.slice(0,2)} id="small-carousel" />
    </div>
    <div class="max-w-md mx-auto mt-8">
       <h3 class="text-lg font-semibold mb-2 text-center text-foreground/80">Carousel with one image</h3>
       <Carousel images={sampleImages.slice(0,1)} id="single-image-carousel" />
    </div>
     <div class="max-w-md mx-auto mt-8">
       <h3 class="text-lg font-semibold mb-2 text-center text-foreground/80">Carousel with no images</h3>
       <Carousel images={[]} id="empty-carousel" />
    </div>
  </section>
</div>
