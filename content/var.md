---
id: var
label: var
ref: https://go.dev/ref/spec#Variable_declarations
---

Variable with explicit type or inferred from initializer. Without an initializer the value is the zero value of the type. Package-level `var`s init before `init()`; declaration order across files is unspecified.

```go
var name string         // zero value: ""
var count int = 42      // typed and initialized
var x, y = 1, "two"     // multiple, types inferred

var (
    width  = 80
    height = 24
)
```
