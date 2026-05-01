export const colors = {
  ink: '#d8d4cc',
  paper: '#15130f',
  panel: '#1c1a16',
  rule: '#2e2a24',
  muted: '#7a7368',
  accent: '#d68a5a',
};

// Sections of the cheatsheet. Each item has a stable `id`, the label shown in
// the list, a one-line summary, and (optionally) a code example to render on
// the right. Items without `code` show their summary in the right pane.
export const sections = [
  {
    title: 'Structure',
    items: [
      {
        id: 'workspace',
        label: 'workspace',
        hint: 'go.work',
        summary: 'Groups multiple modules for local development.',
        code: `// go.work — at the top of a multi-module checkout
go 1.22

use (
    ./greeter
    ./api
    ./internal/tools
)`,
      },
      {
        id: 'module',
        label: 'module',
        hint: 'go.mod',
        summary: 'Unit of versioning and dependency.',
        code: `// go.mod — one per repo, typically
module github.com/alex/greeter

go 1.22

require (
    github.com/google/uuid v1.6.0
    golang.org/x/sync v0.7.0
)`,
      },
      {
        id: 'package',
        label: 'package',
        summary: 'Directory of .go files sharing a package name; unit of compilation.',
        code: `// greeter/greeter.go and greeter/person.go both start:
package greeter

// Every file in the directory shares this clause.
// Identifiers are visible to all files in the package.`,
      },
      {
        id: 'file',
        label: 'file',
        summary: 'A single .go source file.',
      },
    ],
  },
  {
    title: 'Inside a file',
    items: [
      { id: 'package-clause', label: 'package clause', summary: 'package foo — first non-comment line of every file.' },
      { id: 'import', label: 'import declaration', summary: 'Brings names from other packages into the file.' },
      { id: 'top-level-decl', label: 'top-level declaration', summary: 'const / var / type / func at file scope.' },
      { id: 'declaration', label: 'declaration', summary: 'Introduces a name; valid at file scope and (mostly) inside functions.' },
      { id: 'statement', label: 'statement', summary: 'Unit of execution inside a function body.' },
      { id: 'block', label: 'block', summary: '{ ... } — group of statements, defines a new scope.' },
      { id: 'type-literal', label: 'type literal', summary: 'struct/interface/map/chan/func/[]T/[N]T/*T — the right-hand side of a type decl.' },
      { id: 'expression', label: 'expression', summary: 'Evaluates to a value.' },
    ],
  },
  {
    title: 'Declarations',
    items: [
      {
        id: 'const',
        label: 'const',
        summary: 'Compile-time constant.',
        code: `const Pi = 3.14159           // untyped, takes type from use site
const Greeting string = "hi" // typed

const (
    StatusOK    = 200
    StatusError = 500
)`,
      },
      {
        id: 'var',
        label: 'var',
        summary: 'Variable with explicit type or zero value.',
        code: `var name string         // zero value: ""
var count int = 42      // typed and initialized
var x, y = 1, "two"     // multiple, types inferred

var (
    width  = 80
    height = 24
)`,
      },
      { id: 'type', label: 'type', summary: 'Defines a named type or alias.' },
      {
        id: 'short-decl',
        label: ':=',
        summary: 'Short variable declaration (function bodies only).',
        code: `func main() {
    name := "world"           // declares + assigns
    n, err := strconv.Atoi(s) // multi-value
    // = (not :=) for reassignment
    name = "go"
}`,
      },
    ],
  },
  {
    title: 'Labeled',
    items: [
      { id: 'label', label: 'Name:', summary: 'Target for goto / break / continue.' },
    ],
  },
  {
    title: 'Simple statements',
    items: [
      { id: 'assign', label: '=', summary: 'Assignment.' },
      { id: 'expr-stmt', label: 'expression', summary: 'Bare call like f() evaluated for its effect.' },
      { id: 'send', label: 'ch <- x', summary: 'Channel send.' },
      { id: 'incdec', label: 'x++ / x--', summary: 'Increment / decrement.' },
    ],
  },
  {
    title: 'Control flow',
    items: [
      {
        id: 'if',
        label: 'if',
        summary: 'Conditional, optional else.',
        code: `if x > 0 {
    fmt.Println("positive")
} else if x == 0 {
    fmt.Println("zero")
} else {
    fmt.Println("negative")
}

// init statement scoped to the if/else
if err := load(); err != nil {
    return err
}`,
      },
      {
        id: 'for',
        label: 'for',
        summary: 'The only loop (C-style, while-style, range, infinite).',
        code: `for i := 0; i < 10; i++ { ... }   // C-style

for cond { ... }                  // while-style

for { ... }                       // infinite

for i, v := range slice { ... }   // range
for k, v := range m { ... }
for v := range ch { ... }         // until channel closed`,
      },
      {
        id: 'switch',
        label: 'switch',
        summary: 'Value or type switch.',
        code: `switch day {
case "sat", "sun":
    fmt.Println("weekend")
default:
    fmt.Println("weekday")
}

// type switch
switch v := x.(type) {
case int:    fmt.Println("int", v)
case string: fmt.Println("string", v)
}`,
      },
      { id: 'select', label: 'select', summary: 'Wait on multiple channel ops.' },
      { id: 'return', label: 'return', summary: 'Exit function, optionally with values.' },
      { id: 'break', label: 'break', summary: 'Exit innermost for/switch/select (or labeled).' },
      { id: 'continue', label: 'continue', summary: 'Next iteration of innermost for (or labeled).' },
      { id: 'goto', label: 'goto', summary: 'Jump to label within the same function.' },
      { id: 'fallthrough', label: 'fallthrough', summary: 'Fall into next switch case.' },
    ],
  },
  {
    title: 'Concurrency / cleanup',
    items: [
      { id: 'go', label: 'go', summary: 'Start a goroutine.' },
      {
        id: 'defer',
        label: 'defer',
        summary: 'Schedule call for function exit (LIFO order).',
        code: `func read(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()       // runs when read() returns

    return io.ReadAll(f)
}

// LIFO: "two" prints before "one"
defer fmt.Println("one")
defer fmt.Println("two")`,
      },
    ],
  },
  {
    title: 'Block',
    items: [
      { id: 'bare-block', label: '{ ... }', summary: 'Bare block as a statement; rare but legal, introduces scope.' },
    ],
  },
];

// Default selection: first item with a code example.
const firstWithCode = sections.flatMap((s) => s.items).find((i) => i.code);

export const state = $state({ selectedId: firstWithCode?.id ?? sections[0].items[0].id });
