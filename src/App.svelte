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

  function selectItem(id) {
    state.selectedId = id;
    state.sidebarOpen = false;
  }
</script>

<div class="layout" style:background-color={colors.paper} style:color={colors.ink}>
  <button
    type="button"
    class="hamburger"
    class:open={state.sidebarOpen}
    style:background-color={colors.panel}
    style:border-color={colors.rule}
    style:color={colors.ink}
    aria-label={state.sidebarOpen ? 'Close navigation' : 'Open navigation'}
    aria-expanded={state.sidebarOpen}
    onclick={() => (state.sidebarOpen = !state.sidebarOpen)}
  >
    <span></span><span></span><span></span>
  </button>

  {#if state.sidebarOpen}
    <button
      type="button"
      class="backdrop"
      aria-label="Close navigation"
      onclick={() => (state.sidebarOpen = false)}
    ></button>
  {/if}

  <nav
    class="list"
    class:open={state.sidebarOpen}
    style:background-color={colors.panel}
    style:border-color={colors.rule}
  >
    <div class="brand" style:border-color={colors.rule}>
      <div class="brand-title" style:color={colors.accent}>How To Go</div>
      <div class="brand-sub" style:color={colors.muted}>Concepts &amp; Syntax</div>
    </div>

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
                style:background-color={active ? section.hue + '1f' : 'transparent'}
                onclick={() => selectItem(item.id)}
              >
                <span class="label">{item.label}</span>
                {#if item.hint}
                  <span class="hint" style:color={colors.muted}>{item.hint}</span>
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
        <div class="pane-title-row">
          <h2 style:color={colors.ink}>{selected.label}</h2>
          {#if selected.ref}
            <a
              class="ref"
              href={selected.ref}
              target="_blank"
              rel="noreferrer"
              style:color={selectedSection?.hue ?? colors.accent}
            >
              official reference ↗
            </a>
          {/if}
        </div>
        {#if selected.summary}
          <p style:color={colors.muted}>{@html selected.summary}</p>
        {/if}
      </div>

      {#if selected.code}
        <pre class="code"><code class="hljs language-go">{@html highlighted}</code></pre>
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
    padding: 0 0 18px;
  }

  .brand {
    padding: 16px;
    border-bottom: 1px solid;
    margin-bottom: 14px;
  }
  .brand-title {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }
  .brand-sub {
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-top: 5px;
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
    padding: 7px 14px 7px 13px;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    line-height: 1.4;
    transition: background-color 100ms ease, color 100ms ease, border-color 100ms ease;
    display: flex;
    align-items: baseline;
    gap: 10px;
    position: relative;
  }
  .item:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.04);
  }
  .item .label {
    flex: 0 0 auto;
  }
  .item .hint {
    font-size: 12px;
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
  }
  .pane-title-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .pane-head h2 {
    font-family: inherit;
    font-size: 24px;
    font-weight: 500;
    margin: 0;
  }
  .pane-head .ref {
    font-size: 12px;
    text-decoration: none;
    white-space: nowrap;
  }
  .pane-head .ref:hover {
    text-decoration: underline;
  }
  .pane-head p {
    font-size: 14px;
    line-height: 1.6;
    margin: 10px 0 0;
  }
  .pane-head p :global(code) {
    font-family: inherit;
    color: #e6e2d8;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid #3a352e;
    border-radius: 4px;
    padding: 0 4px;
    font-size: 13px;
  }

  .code {
    font-family: inherit;
    font-size: 14px;
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
  :global(.hljs) { background: transparent; color: #e6e2d8; }
  :global(.hljs-comment),
  :global(.hljs-quote)         { color: #847b6e; font-style: italic; }
  :global(.hljs-keyword),
  :global(.hljs-selector-tag),
  :global(.hljs-literal)       { color: #e89868; }
  :global(.hljs-string),
  :global(.hljs-regexp),
  :global(.hljs-doctag)        { color: #b6c382; }
  :global(.hljs-number)        { color: #dba87e; }
  :global(.hljs-type),
  :global(.hljs-built_in),
  :global(.hljs-builtin-name)  { color: #9bc7c1; }
  :global(.hljs-title),
  :global(.hljs-title.function_),
  :global(.hljs-section)       { color: #dccea0; }
  :global(.hljs-params),
  :global(.hljs-variable),
  :global(.hljs-attr)          { color: #e6e2d8; }
  :global(.hljs-meta)          { color: #9ab1d4; }
  :global(.hljs-symbol),
  :global(.hljs-bullet)        { color: #c5a5cc; }

  /* hamburger + backdrop, hidden on desktop */
  .hamburger {
    display: none;
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 30;
    width: 40px;
    height: 40px;
    padding: 10px 9px;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    font: inherit;
  }
  .hamburger span {
    display: block;
    height: 2px;
    background-color: currentColor;
    border-radius: 1px;
    transition: transform 180ms ease, opacity 180ms ease;
    transform-origin: center;
  }
  .hamburger.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.55);
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  @media (max-width: 820px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .pane {
      padding: 64px 20px 32px;
      max-width: none;
    }
    .hamburger {
      display: flex;
    }
    .backdrop {
      display: block;
    }
    .list {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      max-width: 85vw;
      z-index: 25;
      transform: translateX(-100%);
      transition: transform 220ms ease;
      box-shadow: 6px 0 24px rgba(0, 0, 0, 0.4);
    }
    .list.open {
      transform: translateX(0);
    }
    .brand {
      padding-left: 64px;
    }
  }
</style>
