---
id: const
label: const
ref: https://go.dev/ref/spec#Constant_declarations
---

Compile-time constant. Untyped constants flex to the type of their use site. `iota` numbers consts within a `const ( ... )` group, starting at 0.

```go
const Pi = 3.14159           // untyped, takes type from use site
const Greeting string = "hi" // typed

const (
    StatusOK    = 200
    StatusError = 500
)

const (
    Sunday = iota   // 0
    Monday          // 1
    Tuesday         // 2
)
```
