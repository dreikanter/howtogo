import articles from 'virtual:content';

export const colors = {
  ink: '#e6e2d8',
  paper: '#15130f',
  panel: '#1c1a16',
  rule: '#3a352e',
  muted: '#9a9286',
  accent: '#e89868',
};

// Sidebar layout: section title, hue, and the ordered list of article ids.
// Article content (label, hint, summary, code, ref) lives in /content/*.md
// and is loaded at build time via the howtogo-content Vite plugin.
const layout = [
  {
    title: 'Structure',
    hue: '#e89868',
    ids: ['workspace', 'module', 'package', 'file'],
  },
  {
    title: 'Inside a file',
    hue: '#9bc7c1',
    ids: [
      'package-clause',
      'import',
      'top-level-decl',
      'declaration',
      'statement',
      'block',
      'type-literal',
      'expression',
    ],
  },
  {
    title: 'Declarations',
    hue: '#c4c486',
    ids: ['const', 'var', 'type', 'short-decl'],
  },
  {
    title: 'Labeled',
    hue: '#c5a5cc',
    ids: ['label'],
  },
  {
    title: 'Simple statements',
    hue: '#d4b082',
    ids: ['assign', 'expr-stmt', 'send', 'incdec'],
  },
  {
    title: 'Control flow',
    hue: '#e29c8e',
    ids: [
      'if',
      'for',
      'switch',
      'select',
      'return',
      'break',
      'continue',
      'goto',
      'fallthrough',
    ],
  },
  {
    title: 'Concurrency / cleanup',
    hue: '#9ab1d4',
    ids: ['go', 'defer'],
  },
  {
    title: 'Block',
    hue: '#b0b0b0',
    ids: ['bare-block'],
  },
];

function resolve(id) {
  const a = articles[id];
  if (!a) {
    throw new Error(`Missing article for id "${id}" — add content/${id}.md`);
  }
  return a;
}

export const sections = layout.map((s) => ({
  title: s.title,
  hue: s.hue,
  items: s.ids.map(resolve),
}));

const firstWithCode = sections.flatMap((s) => s.items).find((i) => i.code);

export const state = $state({
  selectedId: firstWithCode?.id ?? sections[0].items[0].id,
  sidebarOpen: false,
});
