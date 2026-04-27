<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { state as app, levels } from './store.svelte.js';

  const nodes = [
    {
      key: 'workspace',
      sub: 'optional · go.work',
      callouts: [
        {
          title: 'Optional',
          body: 'A go.work file groups multiple modules for local development. Most repos skip it.',
        },
      ],
    },
    {
      key: 'module',
      sub: 'go.mod at the root',
      callouts: [
        {
          title: 'Manifest, not Go source',
          body: 'go.mod has its own grammar — module, go, require, replace, toolchain. The compiler does not parse it.',
        },
        {
          title: 'go 1.22 directive',
          body: 'Sets the minimum toolchain and the language semantics this module compiles under.',
        },
      ],
    },
    {
      key: 'pkg',
      sub: 'one directory of .go files',
      callouts: [
        {
          title: 'Files share package scope',
          body: 'A name declared in one file is visible across every file of the same package — no import needed.',
        },
        {
          title: 'Subdirs are siblings',
          body: 'A subdirectory is a separate package on the import graph, not a child of this one.',
        },
      ],
    },
    {
      key: 'file',
      sub: 'a .go source file',
      callouts: [
        {
          title: 'Order at the top',
          body: 'build constraints → package doc → package clause → imports → declarations.',
        },
        {
          title: 'Imports are file-scoped',
          body: 'Each file lists its own imports. Other files in the package have their own list.',
        },
      ],
    },
    {
      key: 'decl',
      sub: 'const · var · type · func',
      callouts: [
        {
          title: 'Order is irrelevant',
          body: 'Top-level declarations can refer to each other in any order, even across files.',
        },
        {
          title: 'Body = inside',
          body: 'A struct holds fields, a func holds statements, an interface holds method signatures. Each kind has its own inside.',
        },
      ],
    },
  ];

  let wrapperEl;
  let anchorEls = $state({});
  let cardEls = $state({});
  let pathData = $state([]);
  let pinnedKey = $state(null);

  function activeKey() {
    if (app.hover && nodes.some((n) => n.key === app.hover)) return app.hover;
    return pinnedKey;
  }

  async function computePaths() {
    if (!wrapperEl) return;
    await tick();
    const wrap = wrapperEl.getBoundingClientRect();
    const out = [];
    nodes.forEach((node) => {
      const a = anchorEls[node.key]?.getBoundingClientRect?.();
      if (!a) return;
      node.callouts.forEach((_, ci) => {
        const id = `${node.key}-${ci}`;
        const c = cardEls[id]?.getBoundingClientRect?.();
        if (!c) return;
        const x1 = a.right - wrap.left;
        const y1 = a.top + a.height / 2 - wrap.top;
        const x2 = c.left - wrap.left;
        const y2 = c.top + c.height / 2 - wrap.top;
        const dx = Math.max(40, (x2 - x1) * 0.45);
        const d = `M ${x1.toFixed(1)},${y1.toFixed(1)} C ${(x1 + dx).toFixed(1)},${y1.toFixed(1)} ${(x2 - dx).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
        out.push({ d, key: node.key, hue: levels[node.key].hue });
      });
    });
    pathData = out;
  }

  let ro;
  onMount(() => {
    computePaths();
    ro = new ResizeObserver(() => computePaths());
    ro.observe(wrapperEl);
    window.addEventListener('resize', computePaths);
  });
  onDestroy(() => {
    ro?.disconnect();
    window.removeEventListener('resize', computePaths);
  });

  $effect(() => {
    app.hover; pinnedKey;
    computePaths();
  });

  const togglePin = (key) => {
    pinnedKey = pinnedKey === key ? null : key;
  };
</script>

<div class="spine-wrap" bind:this={wrapperEl}>
  <div class="spine">
    {#each nodes as node, i (node.key)}
      {#if i > 0}
        <div class="arrow" aria-hidden="true">↑</div>
      {/if}
      {@const info = levels[node.key]}
      {@const isActive = activeKey() === node.key}
      <div
        class="node"
        class:active={isActive}
        style:--hue={info.hue}
        onmouseenter={() => (app.hover = node.key)}
        onmouseleave={() => (app.hover = null)}
      >
        <div class="label">{info.label}</div>
        <div class="sub">{node.sub}</div>
        <button
          type="button"
          class="anchor"
          aria-label="Toggle details for {info.label}"
          aria-pressed={pinnedKey === node.key}
          onclick={() => togglePin(node.key)}
          bind:this={anchorEls[node.key]}
        ></button>
      </div>
    {/each}
  </div>

  <div class="callouts">
    {#each nodes as node (node.key)}
      {@const info = levels[node.key]}
      {@const isActive = activeKey() === node.key}
      <div class="callout-stack" class:active={isActive} style:--hue={info.hue}>
        {#each node.callouts as c, ci}
          <div class="callout" bind:this={cardEls[`${node.key}-${ci}`]}>
            <div class="callout-title">{c.title}</div>
            <div class="callout-body">{c.body}</div>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <svg class="leadlines" aria-hidden="true">
    {#each pathData as p (p.d)}
      <path
        d={p.d}
        class:active={activeKey() === p.key}
        style:--hue={p.hue}
      />
    {/each}
  </svg>
</div>

<style>
  .spine-wrap {
    position: relative;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: clamp(40px, 7vw, 96px);
    padding: 22px 18px 6px;
  }
  .spine {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .arrow {
    align-self: center;
    color: var(--muted);
    font-size: 18px;
    line-height: 1;
    padding: 6px 0;
    user-select: none;
  }
  .node {
    position: relative;
    border: 1px solid var(--rule);
    border-left: 3px solid var(--hue);
    border-radius: 2px;
    padding: 12px 28px 12px 14px;
    background: color-mix(in srgb, var(--hue) 4%, transparent);
    transition: background-color 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
    cursor: help;
  }
  .node.active {
    background: color-mix(in srgb, var(--hue) 12%, transparent);
    border-color: var(--hue);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--hue) 20%, transparent);
  }
  .label {
    font-family: 'Fraunces', serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    font-weight: 700;
    color: var(--hue);
  }
  .sub {
    color: var(--muted);
    font-size: 12px;
    margin-top: 4px;
  }
  .anchor {
    position: absolute;
    top: 50%;
    right: -7px;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid var(--hue);
    background: var(--paper);
    padding: 0;
    cursor: pointer;
    transition: transform 120ms ease, background-color 120ms ease;
  }
  .anchor:hover { transform: translateY(-50%) scale(1.15); }
  .node.active .anchor { background: var(--hue); }
  .callouts {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-self: stretch;
    justify-content: space-between;
    padding: 4px 0;
  }
  .callout-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0.55;
    transition: opacity 140ms ease;
  }
  .callout-stack.active { opacity: 1; }
  .callout {
    border: 1px solid var(--rule);
    border-left: 2px solid color-mix(in srgb, var(--hue) 60%, var(--rule));
    border-radius: 2px;
    padding: 9px 12px;
    background: color-mix(in srgb, var(--panel) 70%, transparent);
    transition: border-color 140ms ease, background-color 140ms ease;
  }
  .callout-stack.active .callout {
    border-left-color: var(--hue);
    background: color-mix(in srgb, var(--hue) 6%, var(--panel));
  }
  .callout-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.04em;
  }
  .callout-body {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.55;
    margin-top: 3px;
  }
  .leadlines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }
  .leadlines path {
    fill: none;
    stroke: var(--rule);
    stroke-width: 1;
    transition: stroke 140ms ease, stroke-width 140ms ease;
  }
  .leadlines path.active {
    stroke: var(--hue);
    stroke-width: 1.5;
  }
  @media (max-width: 760px) {
    .spine-wrap { grid-template-columns: 1fr; gap: 18px; }
    .leadlines { display: none; }
    .callout-stack { opacity: 1; }
  }
</style>
