<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount, onDestroy } from 'svelte';

  export let images: Array<{ src: string; alt: string }> = [];
  export let id: string | undefined = undefined; // For ARIA

  let currentIndex = 0;
  let numImages = images.length;
  let imageContainer: HTMLElement | undefined;
  let autoPlayInterval: ReturnType<typeof setInterval> | undefined = undefined;
  const autoPlayDelay = 5000; // 5 seconds

  $: if (images && images.length !== numImages) {
    numImages = images.length;
    currentIndex = 0; // Reset index if images array changes
  }

  $: transformStyle = `transform: translateX(-${currentIndex * 100}%)`;

  function showImage(index: number) {
    if (index >= numImages) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = numImages - 1;
    } else {
      currentIndex = index;
    }
    resetAutoPlay();
  }

  function nextImage() {
    showImage(currentIndex + 1);
  }

  function prevImage() {
    showImage(currentIndex - 1);
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      nextImage();
    }, autoPlayDelay);
  }

  function resetAutoPlay() {
    if (images.length > 1) { // Only autoplay if more than one image
      startAutoPlay();
    }
  }

  onMount(() => {
    if (images.length > 1) {
      startAutoPlay();
    }
  });

  onDestroy(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  });

</script>

{#if images && images.length > 0}
  <div
    {id}
    class="relative w-full overflow-hidden rounded-lg shadow-lg {$$props.class}"
    role="region"
    aria-roledescription="carousel"
    aria-label={id ? `Carousel ${id}` : 'Image carousel'}
  >
    <div
      class="flex transition-transform duration-500 ease-in-out"
      style={transformStyle}
      aria-live="off" <!-- Changes are frequent with autoplay, manual announcements might be better or polite if no autoplay -->
      bind:this={imageContainer}
    >
      {#each images as image, i}
        <div
          class="w-full flex-shrink-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`Image ${i + 1} of ${numImages}`}
          aria-hidden={i !== currentIndex}
        >
          <img
            src={image.src}
            alt={image.alt}
            class="w-full object-cover h-64 md:h-96 select-none"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      {/each}
    </div>

    {#if numImages > 1}
      <!-- Navigation Buttons -->
      <button
        on:click={prevImage}
        class="absolute top-1/2 -translate-y-1/2 left-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft class="h-6 w-6" />
      </button>
      <button
        on:click={nextImage}
        class="absolute top-1/2 -translate-y-1/2 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight class="h-6 w-6" />
      </button>

      <!-- Progression Indicators (Dots) -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {#each images as _, i}
          <button
            on:click={() => showImage(i)}
            class="w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : undefined}
            class:bg-primary={i === currentIndex}
            class:bg-white/60={i !== currentIndex}
            class:hover:bg-white={i !== currentIndex}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div class="relative w-full overflow-hidden rounded-lg bg-muted/50 h-64 md:h-96 flex items-center justify-center {$$props.class}">
    <p class="text-muted-foreground">No images to display in carousel.</p>
  </div>
{/if}
