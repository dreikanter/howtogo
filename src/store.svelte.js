export const colors = {
  ink: '#1a1614',
  paper: '#f4efe6',
  rule: '#d9d2c2',
  muted: '#6b6254',
};

export const levels = {
  module: {
    label: 'MODULE',
    hue: '#8a3a2a',
    desc: 'Versioned unit of code. Defined by go.mod. One module per repo, typically.',
  },
  pkg: {
    label: 'PACKAGE',
    hue: '#5a6b3a',
    desc: 'A directory of .go files sharing a package clause. The unit of compilation and import.',
  },
  file: {
    label: 'FILE',
    hue: '#3a5a6b',
    desc: "A .go source file. Contains top-level declarations; ordering doesn't matter within a package.",
  },
  imp: {
    label: 'IMPORT',
    hue: '#7a5a3a',
    desc: "Brings another package's exported identifiers into scope.",
  },
  konst: {
    label: 'CONSTANT',
    hue: '#6b3a5e',
    desc: 'Compile-time value. Typed or untyped. Declared with const.',
  },
  vvar: {
    label: 'VARIABLE',
    hue: '#6b3a5e',
    desc: 'Package-level (or function-level) mutable binding. Declared with var or := inside funcs.',
  },
  typ: {
    label: 'TYPE',
    hue: '#3a6b6b',
    desc: 'A named type: struct, interface, alias, or defined type. Declared with type.',
  },
  field: {
    label: 'FIELD',
    hue: '#5a7a7a',
    desc: 'A named member of a struct. Has a type and optional tag.',
  },
  method: {
    label: 'METHOD',
    hue: '#4a5a8b',
    desc: 'A function with a receiver, bound to a named type.',
  },
  fn: {
    label: 'FUNCTION',
    hue: '#4a5a8b',
    desc: 'A named or anonymous callable. Can take params and return values. main() and init() are special.',
  },
  param: {
    label: 'PARAMETER',
    hue: '#6b6b3a',
    desc: 'An input to a function or method. Typed.',
  },
  stmt: {
    label: 'STATEMENT',
    hue: '#444040',
    desc: 'An expression, assignment, return, control-flow construct, etc. Lives inside a function body.',
  },
};

export const state = $state({ hover: null });
