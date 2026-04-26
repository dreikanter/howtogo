<script>
  import { state, levels, getColors } from './store.svelte.js';

  const colors = $derived(getColors());

  let { lv, tagRight = '', children } = $props();

  let active = $derived(state.hover === lv);
  let info = $derived(levels[lv]);
</script>

<div
  onmouseenter={() => (state.hover = lv)}
  onmouseleave={() => (state.hover = null)}
  style:border="1px solid {active ? info.hue : colors.rule}"
  style:box-shadow={active ? `0 0 0 3px ${info.hue}14` : 'none'}
  style:border-radius="2px"
  style:padding="14px 16px 16px"
  style:position="relative"
  style:margin-top="14px"
  style:background-color={active ? info.hue + '08' : 'transparent'}
  style:transition="all 140ms ease"
>
  <div
    style:position="absolute"
    style:top="-9px"
    style:left="12px"
    style:background-color={colors.paper}
    style:padding="0 8px"
    style:font-family="'Fraunces', serif"
    style:font-size="10px"
    style:letter-spacing="0.22em"
    style:font-weight="600"
    style:color={info.hue}
  >
    {info.label}{#if tagRight}<span
        style:color={colors.muted}
        style:font-weight="400"
        style:letter-spacing="0.12em"
        style:margin-left="10px">{tagRight}</span>{/if}
  </div>
  {@render children()}
</div>
