---
id: top-level-decl
label: top-level declaration
ref: https://go.dev/ref/spec#Declarations_and_scope
---

`const` / `var` / `type` / `func` at file scope. Capitalized names are exported. No `:=` here — short declaration is function-only.

```go
package greeter

const Greeting = "hi"           // exported constant
var   defaultName = "world"     // package-private variable
type  Greeter struct{ Name string }
func  Hello() string { return Greeting }
```
