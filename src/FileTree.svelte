<script>
  import { state, levels } from './store.svelte.js';

  const tree = [
    { kind: 'dir', name: 'brackets/', tag: 'module root', lv: 'module' },
    { kind: 'file', name: 'go.mod', tag: 'manifest', lv: 'module', indent: 1 },
    { kind: 'dir', name: '(this directory)', tag: 'package brackets', lv: 'pkg', indent: 1 },
    { kind: 'file', name: 'stack.go', tag: 'source file', lv: 'file', indent: 2 },
    { kind: 'file', name: 'check.go', tag: 'source file', lv: 'file', indent: 2 },
  ];

  const branch = (i, last) => {
    if (i === 0) return '';
    return last ? '└─ ' : '├─ ';
  };
</script>

<div class="tree">
  <div class="title">project layout</div>
  <ul>
    {#each tree as row, i}
      {@const isLast = i === tree.length - 1 || tree[i + 1]?.indent < (row.indent ?? 0)}
      {@const info = levels[row.lv]}
      {@const active = state.hover === row.lv}
      <li
        style:padding-left="{(row.indent ?? 0) * 16}px"
        class:active
        style:--hue={info.hue}
        onmouseenter={() => (state.hover = row.lv)}
        onmouseleave={() => (state.hover = null)}
      >
        <span class="branch">{branch(i, isLast)}</span>
        <span class="icon" aria-hidden="true">{row.kind === 'dir' ? '▸' : '·'}</span>
        <span class="name">{row.name}</span>
        <span class="tag">{row.tag}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .tree {
    border: 1px solid var(--rule);
    border-radius: 2px;
    background: color-mix(in srgb, var(--panel) 60%, transparent);
    padding: 12px 14px;
    font: 12px/1.7 'JetBrains Mono', ui-monospace, monospace;
  }
  .title {
    color: var(--muted);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 8px;
  }
  ul { list-style: none; margin: 0; padding: 0; }
  li {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    gap: 6px;
    align-items: center;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 2px;
    cursor: help;
    transition: background-color 120ms ease;
  }
  li.active {
    background: color-mix(in srgb, var(--hue) 12%, transparent);
  }
  .branch { color: var(--muted); white-space: pre; }
  .icon { color: var(--muted); width: 1ch; }
  li.active .icon { color: var(--hue); }
  .name { color: var(--ink); }
  li.active .name { color: var(--hue); }
  .tag {
    color: var(--muted);
    font-size: 11px;
    font-style: italic;
    white-space: nowrap;
  }
</style>
