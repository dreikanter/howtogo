<script>
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

  let currentKey = $state('module');

  $effect(() => {
    if (app.hover && nodes.some((n) => n.key === app.hover)) {
      currentKey = app.hover;
    }
  });

  const current = $derived(nodes.find((n) => n.key === currentKey));
  const currentInfo = $derived(levels[currentKey]);
</script>

<div class="hierarchy">
  <ul class="spine" role="tablist">
    {#each nodes as node, i (node.key)}
      {#if i > 0}
        <li class="arrow" aria-hidden="true">↑</li>
      {/if}
      {@const info = levels[node.key]}
      {@const isActive = currentKey === node.key}
      <li>
        <button
          type="button"
          class="node"
          class:active={isActive}
          role="tab"
          aria-selected={isActive}
          style:--hue={info.hue}
          onmouseenter={() => (app.hover = node.key)}
          onmouseleave={() => (app.hover = null)}
          onfocus={() => (app.hover = node.key)}
          onblur={() => (app.hover = null)}
        >
          <span class="label">{info.label}</span>
          <span class="sub">{node.sub}</span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="details" style:--hue={currentInfo.hue} role="tabpanel">
    <div class="details-head">
      <div class="details-label">{currentInfo.label}</div>
      <div class="details-sub">{current.sub}</div>
    </div>
    <ul class="callouts">
      {#each current.callouts as c}
        <li>
          <strong>{c.title}</strong>
          <span>{c.body}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .hierarchy {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: clamp(20px, 4vw, 40px);
    padding: 18px;
  }
  .spine {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .spine .arrow {
    align-self: center;
    color: var(--muted);
    font-size: 16px;
    line-height: 1;
    padding: 4px 0;
    user-select: none;
  }
  .node {
    width: 100%;
    text-align: left;
    border: 1px solid var(--rule);
    border-left: 3px solid color-mix(in srgb, var(--hue) 35%, var(--rule));
    border-radius: 2px;
    padding: 10px 12px;
    background: transparent;
    color: var(--ink);
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    cursor: pointer;
    transition: background-color 140ms ease, border-color 140ms ease;
    display: block;
  }
  .node:hover {
    background: color-mix(in srgb, var(--hue) 6%, transparent);
  }
  .node.active {
    background: color-mix(in srgb, var(--hue) 12%, transparent);
    border-color: var(--hue);
  }
  .label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: color-mix(in srgb, var(--hue) 60%, var(--muted));
  }
  .node.active .label,
  .node:hover .label {
    color: var(--hue);
  }
  .sub {
    display: block;
    color: var(--muted);
    font-size: 11px;
    margin-top: 3px;
  }
  .details {
    border: 1px solid var(--rule);
    border-left: 3px solid var(--hue);
    border-radius: 2px;
    padding: 14px 16px 16px;
    background: color-mix(in srgb, var(--hue) 5%, transparent);
    min-width: 0;
  }
  .details-head {
    border-bottom: 1px dashed var(--rule);
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .details-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: var(--hue);
  }
  .details-sub {
    color: var(--muted);
    font-size: 12px;
    margin-top: 4px;
  }
  .callouts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .callouts li {
    display: block;
  }
  .callouts strong {
    display: block;
    color: var(--ink);
    font-size: 12px;
    font-weight: 700;
  }
  .callouts span {
    display: block;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.55;
    margin-top: 2px;
  }
  @media (max-width: 720px) {
    .hierarchy { grid-template-columns: 1fr; gap: 16px; padding: 14px; }
  }
</style>
