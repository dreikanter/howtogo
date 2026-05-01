<script>
  import hljs from 'highlight.js/lib/core';
  import go from 'highlight.js/lib/languages/go';
  import { state, sections, colors } from './store.svelte.js';

  hljs.registerLanguage('go', go);

  const allItems = sections.flatMap((s) => s.items);
  const selected = $derived(allItems.find((i) => i.id === state.selectedId));
  const selectedSection = $derived(sections.find((s) => s.items.includes(selected)));
  const highlighted = $derived(
    selected?.code ? hljs.highlight(selected.code, { language: 'go' }).value : ''
  );
</script>

<div class="layout" style:background-color={colors.paper} style:color={colors.ink}>
  <nav class="list" style:background-color={colors.panel} style:border-color={colors.rule}>
    {#each sections as section (section.title)}
      <div class="section">
        <div
          class="section-title"
          style:color={section.hue}
          style:border-color={colors.rule}
        >
          {section.title}
        </div>
        <ul>
          {#each section.items as item (item.id)}
            {@const active = state.selectedId === item.id}
            <li>
              <button
                type="button"
                class="item"
                class:active
                style:color={active ? section.hue : colors.ink}
                style:border-left-color={active ? section.hue : 'transparent'}
                style:background-color={active ? section.hue + '14' : 'transparent'}
                onclick={() => (state.selectedId = item.id)}
              >
                <span class="label">{item.label}</span>
                {#if item.hint}
                  <span class="hint" style:color={colors.muted}>{item.hint}</span>
                {/if}
                {#if item.code}
                  <span class="dot" style:background-color={section.hue} aria-hidden="true"></span>
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>

  <section class="pane">
    {#if selected}
      <div class="pane-head" style:border-color={colors.rule}>
        <div class="pane-eyebrow" style:color={selectedSection?.hue ?? colors.muted}>
          {selectedSection?.title ?? ''}
        </div>
        <h2 style:color={colors.ink}>{selected.label}</h2>
        {#if selected.summary}
          <p style:color={colors.muted}>{selected.summary}</p>
        {/if}
      </div>

      {#if selected.code}
        <pre class="code"><code class="hljs language-go">{@html highlighted}</code></pre>
      {:else}
        <div class="placeholder" style:color={colors.muted}>
          No example yet.
        </div>
      {/if}
    {/if}
  </section>
</div>

<style>
  :global(body) {
    background-color: #15130f;
  }

  .layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100vh;
    width: 100vw;
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  .list {
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid;
    padding: 18px 0;
  }
  .section + .section {
    margin-top: 22px;
  }
  .section-title {
    font-size: 10px;
    letter-spacing: 0.22em;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 16px 8px;
    padding-bottom: 6px;
    border-bottom: 1px dashed;
    opacity: 0.85;
  }
  .list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .item {
    width: 100%;
    text-align: left;
    background: transparent;
    border: 0;
    border-left: 3px solid transparent;
    padding: 6px 14px 6px 13px;
    cursor: pointer;
    font: inherit;
    font-size: 12.5px;
    line-height: 1.4;
    transition: background-color 100ms ease, color 100ms ease, border-color 100ms ease;
    display: flex;
    align-items: baseline;
    gap: 10px;
    position: relative;
  }
  .item:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.03);
  }
  .item .label {
    flex: 0 0 auto;
  }
  .item .hint {
    font-size: 11px;
  }
  .item .dot {
    position: absolute;
    right: 12px;
    top: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    transform: translateY(-50%);
    opacity: 0.65;
  }

  .pane {
    height: 100vh;
    overflow-y: auto;
    padding: 36px 40px 48px;
    max-width: 880px;
  }
  .pane-head {
    border-bottom: 1px solid;
    padding-bottom: 14px;
    margin-bottom: 22px;
  }
  .pane-eyebrow {
    font-size: 10px;
    letter-spacing: 0.22em;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
    opacity: 0.9;
  }
  .pane-head h2 {
    font-family: inherit;
    font-size: 22px;
    font-weight: 500;
    margin: 0;
  }
  .pane-head p {
    font-size: 13px;
    line-height: 1.6;
    margin: 8px 0 0;
  }

  .code {
    font-family: inherit;
    font-size: 13px;
    line-height: 1.7;
    margin: 0;
    overflow-x: auto;
  }
  .code code {
    font-family: inherit;
    background: transparent;
    padding: 0;
    white-space: pre;
    display: block;
  }

  /* hljs token colors tuned for the warm dark palette */
  :global(.hljs) { background: transparent; color: #d8d4cc; }
  :global(.hljs-comment),
  :global(.hljs-quote)         { color: #6a625a; font-style: italic; }
  :global(.hljs-keyword),
  :global(.hljs-selector-tag),
  :global(.hljs-literal)       { color: #d68a5a; }
  :global(.hljs-string),
  :global(.hljs-regexp),
  :global(.hljs-doctag)        { color: #9aa86a; }
  :global(.hljs-number)        { color: #c8956a; }
  :global(.hljs-type),
  :global(.hljs-built_in),
  :global(.hljs-builtin-name)  { color: #7fa39e; }
  :global(.hljs-title),
  :global(.hljs-title.function_),
  :global(.hljs-section)       { color: #c9b884; }
  :global(.hljs-params),
  :global(.hljs-variable),
  :global(.hljs-attr)          { color: #d8d4cc; }
  :global(.hljs-meta)          { color: #7892b0; }
  :global(.hljs-symbol),
  :global(.hljs-bullet)        { color: #a387a8; }

  .placeholder {
    font-style: italic;
    font-size: 13px;
    padding: 40px 0;
    text-align: center;
  }

  @media (max-width: 820px) {
    .layout {
      grid-template-columns: 1fr;
      height: auto;
      width: auto;
    }
    .list,
    .pane {
      height: auto;
    }
    .list {
      border-right: none;
      border-bottom: 1px solid;
    }
  }
</style>
