export const themes = {
  dark: {
    name: 'Dark',
    ink: '#d8dee9',
    paper: '#0d1117',
    panel: '#111827',
    panel2: '#0f172a',
    rule: '#263246',
    muted: '#8b95a7',
    soft: '#1f2937',
    glow: '#38bdf833',
  },
  light: {
    name: 'Light',
    ink: '#172033',
    paper: '#f5f7fb',
    panel: '#ffffff',
    panel2: '#eef3ff',
    rule: '#d7deea',
    muted: '#5d6b82',
    soft: '#e7edf7',
    glow: '#2563eb22',
  },
};

export const syntax = {
  kw: '#ff7b72',
  str: '#a5d6ff',
  com: '#8b949e',
  typ: '#ffa657',
  fun: '#d2a8ff',
  num: '#79c0ff',
  op: '#7ee787',
};

export const levels = {
  module: {
    label: 'MODULE',
    hue: '#58a6ff',
    desc: 'Versioned unit of code. Defined by go.mod. One module per repo, typically.',
  },
  pkg: {
    label: 'PACKAGE',
    hue: '#7ee787',
    desc: 'A directory of .go files sharing a package clause. The unit of compilation and import.',
  },
  file: {
    label: 'FILE',
    hue: '#f2cc60',
    desc: "A .go source file. Contains top-level declarations; ordering doesn't matter within a package.",
  },
  imp: {
    label: 'IMPORT',
    hue: '#a5d6ff',
    desc: "Brings another package's exported identifiers into scope.",
  },
  konst: {
    label: 'CONSTANT',
    hue: '#ffab70',
    desc: 'Compile-time value. Typed or untyped. Declared with const.',
  },
  vvar: {
    label: 'VARIABLE',
    hue: '#ffab70',
    desc: 'Mutable binding. Declared with var, or := inside functions.',
  },
  typ: {
    label: 'TYPE',
    hue: '#ffa657',
    desc: 'A named type: struct, interface, alias, or defined type. Declared with type.',
  },
  field: {
    label: 'FIELD',
    hue: '#79c0ff',
    desc: 'A named member of a struct. Has a type and optional tag.',
  },
  method: {
    label: 'METHOD',
    hue: '#d2a8ff',
    desc: 'A function with a receiver, bound to a named type.',
  },
  fn: {
    label: 'FUNCTION',
    hue: '#d2a8ff',
    desc: 'A named or anonymous callable. Can take params and return values.',
  },
  param: {
    label: 'PARAMETER',
    hue: '#f2cc60',
    desc: 'An input to a function or method. Typed.',
  },
  stmt: {
    label: 'STATEMENT',
    hue: '#c9d1d9',
    desc: 'An expression, assignment, return, control-flow construct, etc. Lives inside a function body.',
  },
};

export const state = $state({ hover: null, theme: 'dark' });

export function getColors() {
  return themes[state.theme];
}
