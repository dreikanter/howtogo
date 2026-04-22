<script>
  import { state, levels } from './store.svelte.js';

  let { lv = null, children } = $props();

  let active = $derived(lv != null && state.hover === lv);
  let hue = $derived(lv ? levels[lv].hue : null);
</script>

{#if lv}
  <span
    onmouseenter={() => (state.hover = lv)}
    onmouseleave={() => (state.hover = null)}
    style:border-bottom="1.5px solid {active ? hue : 'transparent'}"
    style:background-color={active ? hue + '18' : 'transparent'}
    style:transition="all 120ms ease"
    style:cursor="help"
  >{@render children()}</span>
{:else}
  <span>{@render children()}</span>
{/if}
