import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const VIRTUAL_ID = 'virtual:content';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function unquote(value) {
  const v = value.trim();
  if (v.length >= 2 && (v[0] === '"' || v[0] === "'") && v.at(-1) === v[0]) {
    return v.slice(1, -1);
  }
  return v;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) meta[m[1]] = unquote(m[2]);
  }
  return { meta, body: match[2] };
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}

function renderInline(text) {
  // Split on `code` spans, escape each piece, wrap code spans in <code>.
  return text
    .split(/(`[^`]+`)/g)
    .map((part) =>
      part.startsWith('`') && part.endsWith('`')
        ? `<code>${escapeHtml(part.slice(1, -1))}</code>`
        : escapeHtml(part)
    )
    .join('');
}

function parseBody(body) {
  const fence = body.match(/```go\n([\s\S]*?)```/);
  const code = fence ? fence[1].replace(/\n$/, '') : '';
  const prose = body.replace(/```go\n[\s\S]*?```/, '').trim();
  return { summary: renderInline(prose), code };
}

function loadArticles(dir) {
  const out = {};
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!name.endsWith('.md') || !statSync(full).isFile()) continue;
    const raw = readFileSync(full, 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const { summary, code } = parseBody(body);
    if (!meta.id) continue;
    out[meta.id] = {
      id: meta.id,
      label: meta.label ?? meta.id,
      hint: meta.hint || undefined,
      ref: meta.ref || undefined,
      summary,
      code,
    };
  }
  return out;
}

export default function contentPlugin({ dir }) {
  const absDir = resolve(dir);
  let watched = false;
  return {
    name: 'howtogo-content',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const articles = loadArticles(absDir);
      return `export default ${JSON.stringify(articles)};`;
    },
    configureServer(server) {
      if (watched) return;
      watched = true;
      server.watcher.add(absDir);
      const reload = (path) => {
        if (!path.startsWith(absDir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      };
      server.watcher.on('add', reload);
      server.watcher.on('change', reload);
      server.watcher.on('unlink', reload);
    },
  };
}
