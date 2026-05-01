---
id: declaration
label: declaration
ref: https://go.dev/ref/spec#Declarations_and_scope
---

Binds a name to a value, type, or function. `const` / `var` / `type` work at file or function scope. `func` is file-scope only. `:=` is function-only.

```go
// File scope: const, var, type, func
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
}
```
