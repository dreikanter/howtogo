export const colors = {
  ink: '#e6e2d8',
  paper: '#15130f',
  panel: '#1c1a16',
  rule: '#3a352e',
  muted: '#9a9286',
  accent: '#e89868',
};

// Sections of the cheatsheet. Each item has a stable `id`, the label shown in
// the list, a one-line summary, and (optionally) a code example to render on
// the right. Items without `code` show their summary in the right pane.
// `hue` is a muted color used for gentle sidebar coding (section title + dot).
export const sections = [
  {
    title: 'Structure',
    hue: '#e89868',
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
        summary: 'A .go source file. Files in one package see each other freely; declaration order does not matter.',
        code: `// greeter/hello.go
package greeter

import "fmt"

// Hello can call sayBye even though it lives in another file
// of the same package, declared above or below — order is irrelevant.
func Hello(name string) string {
    return fmt.Sprintf("hi %s; %s", name, sayBye())
}`,
      },
    ],
  },
  {
    title: 'Inside a file',
    hue: '#9bc7c1',
    items: [
      {
        id: 'package-clause',
        label: 'package clause',
        summary: 'First non-comment line of every .go file. All files in a directory share one clause.',
        code: `package greeter   // every file in greeter/ starts with this

package main      // special: produces an executable with main()`,
      },
      {
        id: 'import',
        label: 'import declaration',
        summary: 'Pulls another package\'s exported (Capitalized) names into this file.',
        code: `import "fmt"   // single import

import (
    "fmt"
    "strings"

    "github.com/google/uuid"          // third-party
    log "github.com/sirupsen/logrus"  // local alias
    _ "image/png"                     // blank: run init only
)`,
      },
      {
        id: 'top-level-decl',
        label: 'top-level declaration',
        summary: 'const / var / type / func at file scope. Capitalized names are exported.',
        code: `package greeter

const Greeting = "hi"           // exported constant
var   defaultName = "world"     // package-private variable
type  Greeter struct{ Name string }
func  Hello() string { return Greeting }`,
      },
      {
        id: 'declaration',
        label: 'declaration',
        summary: 'Binds a name to a value, type, or function. Valid at file scope; most are also valid inside funcs.',
        code: `// File scope: const, var, type, func
const Pi = 3.14
var   n  int
type  Meters float64
func  add(a, b int) int { return a + b }

func work() {
    // Inside a function: const, var, type, plus :=
    const limit = 10
    var   buf []byte
    type  local struct{ x int }
    name := "go"   // := is function-only
    _ = name
}`,
      },
      {
        id: 'statement',
        label: 'statement',
        summary: 'A unit of execution: assignments, calls, control flow. Lives inside function bodies.',
        code: `func work() {
    x := 1                  // short declaration
    x++                     // increment
    fmt.Println(x)          // expression used as statement
    if x > 0 { return }     // control flow
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }
}`,
      },
      {
        id: 'block',
        label: 'block',
        summary: '{ ... } groups statements and opens a new scope. Function, if, for, switch bodies are all blocks.',
        code: `func main() {
    {                       // bare block — new scope
        msg := "inner"
        fmt.Println(msg)
    }
    // msg is not visible here

    if x := 10; x > 0 {     // x is scoped to this block (and its else)
        fmt.Println(x)
    }
}`,
      },
      {
        id: 'type-literal',
        label: 'type literal',
        summary: 'The shape on the right of a type decl: struct, interface, slice, map, chan, func, pointer, array.',
        code: `type User    struct{ Name string; Age int }
type Reader  interface{ Read(p []byte) (int, error) }
type Bytes   []byte                       // slice
type Pair    [2]int                       // array
type Cache   map[string]int                // map
type Done    chan struct{}                 // chan
type Handler func(req string) error        // func
type IntPtr  *int                          // pointer`,
      },
      {
        id: 'expression',
        label: 'expression',
        summary: 'Anything that evaluates to a value: literals, operators, calls, field/index access.',
        code: `1 + 2                  // arithmetic
"go" + "lang"          // string concat
len(s) > 0             // comparison → bool
strings.ToUpper(s)     // call
user.Name              // field access
m["key"]               // map index
&u                     // address-of, yields *User

// A bare call used as a statement just discards its value.
fmt.Println("hello")`,
      },
    ],
  },
  {
    title: 'Declarations',
    hue: '#c4c486',
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
    hue: '#c5a5cc',
    items: [
      { id: 'label', label: 'Name:', summary: 'Target for goto / break / continue.' },
    ],
  },
  {
    title: 'Simple statements',
    hue: '#d4b082',
    items: [
      { id: 'assign', label: '=', summary: 'Assignment.' },
      { id: 'expr-stmt', label: 'expression', summary: 'Bare call like f() evaluated for its effect.' },
      { id: 'send', label: 'ch <- x', summary: 'Channel send.' },
      { id: 'incdec', label: 'x++ / x--', summary: 'Increment / decrement.' },
    ],
  },
  {
    title: 'Control flow',
    hue: '#e29c8e',
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
    hue: '#9ab1d4',
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
    hue: '#b0b0b0',
    items: [
      { id: 'bare-block', label: '{ ... }', summary: 'Bare block as a statement; rare but legal, introduces scope.' },
    ],
  },
];

// Default selection: first item with a code example.
const firstWithCode = sections.flatMap((s) => s.items).find((i) => i.code);

export const state = $state({
  selectedId: firstWithCode?.id ?? sections[0].items[0].id,
  sidebarOpen: false,
});
