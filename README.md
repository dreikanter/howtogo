# howtogo

A one-page static field guide to the Go language hierarchy:
`module → package → file → declarations → bodies`. Hover any token or scope
to trace it.

Built with Svelte 5 + Vite. Deployed as a Cloudflare Workers static-assets
worker (not Pages — Pages is being phased out in favour of Workers Assets).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173 — Vite serves the page with hot reload.

## Production build

```bash
npm run build
```

Outputs a static SPA into `./dist`.

You can preview the built bundle locally with:

```bash
npm run preview          # Vite preview
npm run cf-dev           # Wrangler dev (closer to production runtime)
```

## Deploy to Cloudflare Workers

This site is deployed as an **assets-only Worker** using
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
There is no Worker script — Cloudflare serves files from `./dist` directly,
globally, on its edge.

One-time setup:

```bash
npm install
npx wrangler login
```

Then, every deploy:

```bash
npm run build
npm run deploy
```

`wrangler deploy` reads `wrangler.jsonc`, uploads the contents of `./dist`,
and prints the worker URL (e.g. `https://howtogo.<your-subdomain>.workers.dev`).

To bind a custom domain, add a `routes` block in `wrangler.jsonc` or set it
via the Cloudflare dashboard.

## Project layout

```
index.html                # entry HTML, loads JetBrains Mono from CDN
content/                  # one Markdown file per sidebar article
src/
  main.js                 # mounts the Svelte app
  App.svelte              # sidebar nav + article pane
  store.svelte.js         # sidebar layout + selection state
vite-plugin-content.js    # compiles content/*.md → virtual:content JSON
vite.config.js
svelte.config.js
wrangler.jsonc            # Cloudflare Workers static-assets config
```

### Adding or editing an article

Each sidebar item lives in `content/<id>.md`:

```markdown
---
id: my-topic
label: my topic
hint: optional sidebar hint
ref: https://go.dev/ref/spec#Section
---

One short summary paragraph.

​```go
// idiomatic example
​```
```

Then add the `id` to the appropriate section in
`src/store.svelte.js`. The `howtogo-content` Vite plugin parses every
`.md` file at build time and exposes them as a JSON module
(`virtual:content`).

JetBrains Mono is pulled from the Google Fonts CDN at runtime — no font
files in the repo.
