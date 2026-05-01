<script>
  import { state, sections, colors } from './store.svelte.js';

  const allItems = sections.flatMap((s) => s.items);
  const selected = $derived(allItems.find((i) => i.id === state.selectedId));
</script>

<div class="page" style:background-color={colors.paper} style:color={colors.ink}>
  <div class="shell">
    <header class="header" style:border-color={colors.rule}>
      <div class="eyebrow" style:color={colors.muted}>A FIELD GUIDE</div>
      <h1>Go cheatsheet</h1>
      <p style:color={colors.muted}>
        Pick an entity on the left to see how it shows up in code.
      </p>
    </header>

    <div class="grid">
      <nav class="list" style:border-color={colors.rule}>
        {#each sections as section (section.title)}
          <div class="section">
            <div class="section-title" style:color={colors.muted}>{section.title}</div>
            <ul>
              {#each section.items as item (item.id)}
                {@const active = state.selectedId === item.id}
                <li>
                  <button
                    type="button"
                    class="item"
                    class:active
                    style:color={active ? colors.accent : colors.ink}
                    style:border-left-color={active ? colors.accent : 'transparent'}
                    style:background-color={active ? colors.accent + '10' : 'transparent'}
                    onclick={() => (state.selectedId = item.id)}
                  >
                    <span class="label">{item.label}</span>
                    {#if item.hint}
                      <span class="hint" style:color={colors.muted}>{item.hint}</span>
                    {/if}
                    {#if item.code}
                      <span class="dot" style:background-color={colors.accent} aria-hidden="true"></span>
                    {/if}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </nav>

      <section class="pane" style:border-color={colors.rule}>
        {#if selected}
          <div class="pane-head" style:border-color={colors.rule}>
            <div class="pane-eyebrow" style:color={colors.muted}>
              {sections.find((s) => s.items.includes(selected))?.title ?? ''}
            </div>
            <h2>{selected.label}</h2>
            {#if selected.summary}
              <p style:color={colors.muted}>{selected.summary}</p>
            {/if}
          </div>

          {#if selected.code}
            <pre class="code">{selected.code}</pre>
          {:else}
            <div class="placeholder" style:color={colors.muted}>
              No example yet.
            </div>
          {/if}
        {/if}
      </section>
    </div>
  </div>
</div>

<style>
  .page {
    min-height: 100vh;
    padding: 40px 32px;
  }
  .shell {
    max-width: 1180px;
    margin: 0 auto;
  }

  .header {
    border-bottom: 1px solid;
    padding-bottom: 20px;
    margin-bottom: 28px;
  }
  .eyebrow {
    font-family: 'Fraunces', serif;
    font-size: 10px;
    letter-spacing: 0.3em;
    margin-bottom: 8px;
  }
  .header h1 {
    font-family: 'Fraunces', serif;
    font-size: 42px;
    font-weight: 500;
    font-style: italic;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .header p {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    margin: 10px 0 0;
    max-width: 640px;
    line-height: 1.5;
  }

  .grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 32px;
    align-items: start;
  }

  .list {
    position: sticky;
    top: 24px;
    align-self: start;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    padding-right: 8px;
  }
  .section + .section {
    margin-top: 22px;
  }
  .section-title {
    font-family: 'Fraunces', serif;
    font-size: 10px;
    letter-spacing: 0.28em;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px dashed currentColor;
    opacity: 0.7;
  }
  .list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .list li + li {
    margin-top: 1px;
  }

  .item {
    width: 100%;
    text-align: left;
    background: transparent;
    border: 0;
    border-left: 3px solid transparent;
    padding: 7px 10px 7px 12px;
    cursor: pointer;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12.5px;
    line-height: 1.4;
    transition: all 120ms ease;
    display: flex;
    align-items: baseline;
    gap: 8px;
    position: relative;
  }
  .item:hover:not(.active) {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .item .label {
    flex: 0 0 auto;
  }
  .item .hint {
    font-size: 11px;
    font-style: italic;
    font-family: 'Fraunces', serif;
  }
  .item .dot {
    position: absolute;
    right: 10px;
    top: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    transform: translateY(-50%);
    opacity: 0.6;
  }

  .pane {
    border: 1px solid;
    border-radius: 3px;
    padding: 28px 30px 32px;
    min-height: 320px;
  }
  .pane-head {
    border-bottom: 1px solid;
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
  .pane-eyebrow {
    font-family: 'Fraunces', serif;
    font-size: 10px;
    letter-spacing: 0.28em;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .pane-head h2 {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 22px;
    font-weight: 500;
    margin: 0;
  }
  .pane-head p {
    font-family: 'Fraunces', serif;
    font-size: 14.5px;
    line-height: 1.5;
    margin: 8px 0 0;
  }

  .code {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    line-height: 1.7;
    white-space: pre;
    overflow-x: auto;
    margin: 0;
  }

  .placeholder {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-size: 14px;
    padding: 40px 0;
    text-align: center;
  }

  @media (max-width: 820px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .list {
      position: static;
      max-height: none;
    }
  }
</style>
