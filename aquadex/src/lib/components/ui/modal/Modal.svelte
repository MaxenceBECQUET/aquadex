<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing'; // For a smoother fly transition

  export let open: boolean = false;
  export let onClose: (() => void) | undefined = undefined;

  const dispatch = createEventDispatcher();

  const handleClose = ()_ => {
    if (onClose) {
      onClose();
    } else {
      open = false; // Directly modify if no callback provided
      dispatch('close'); // Dispatch a close event
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      handleClose();
    }
  };

  // Variables to hold the previously focused element
  let previousFocus: HTMLElement | null = null;
  let modalElement: HTMLElement | undefined;

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeydown);
  });

  // Focus trapping (simple version)
  $: if (open && modalElement) {
    previousFocus = document.activeElement as HTMLElement;
    // Find first focusable element in modal to focus it
    const focusable = modalElement.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    if (focusable) {
      focusable.focus();
    }
  } else if (!open && previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
    on:click={handleClose}
    transition:fade={{ duration: 200 }}
  ></div>

  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      bind:this={modalElement}
      class="bg-muted rounded-xl p-8 shadow-xl max-w-lg w-full {$$props.class}"
      role="dialog"
      aria-modal="true"
      transition:fly={{ y: -30, duration: 300, easing: quintOut }}
      on:introstart={() => modalElement?.focus()} <!-- Ensure modal itself can be focused initially if no inner elements -->
      tabindex="-1" <!-- Make the modal div focusable for initial focus -->
    >
      <slot />
    </div>
  </div>
{/if}
