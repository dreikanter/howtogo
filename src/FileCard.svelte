<script>
  let { name, kind = 'go', children } = $props();
</script>

<div class="file-card" class:manifest={kind === 'manifest'}>
  <div class="titlebar">
    <span class="icon" aria-hidden="true">
      {#if kind === 'manifest'}■{:else}❯{/if}
    </span>
    <span class="name">{name}</span>
    <span class="badge">{kind === 'manifest' ? 'manifest' : 'go source'}</span>
  </div>
  <div class="body">
    {@render children()}
  </div>
</div>

<style>
  .file-card {
    border: 1px solid var(--rule);
    border-radius: 2px;
    background: linear-gradient(180deg, var(--panel), var(--panel2));
    overflow: hidden;
  }
  .titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--rule);
    background: rgba(127, 127, 127, 0.05);
    color: var(--muted);
    font-size: 12px;
  }
  .icon {
    color: var(--muted);
    font-size: 11px;
    width: 1.2ch;
    text-align: center;
  }
  .file-card.manifest .icon { color: var(--kw); }
  .name { color: var(--ink); font-weight: 600; }
  .badge {
    margin-left: auto;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .file-card.manifest .badge { color: var(--kw); }
  .body { padding: 12px 14px; }
  .body :global(pre) {
    margin: 0;
    font: 12.5px/1.65 'JetBrains Mono', ui-monospace, monospace;
    color: var(--ink);
    white-space: pre;
    overflow-x: auto;
  }
</style>
