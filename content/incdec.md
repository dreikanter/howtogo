---
id: incdec
label: "x++ / x--"
ref: https://go.dev/ref/spec#IncDec_statements
---

Increment / decrement by 1. They are statements, not expressions — you cannot use `x++` inside another expression or assign its result. No prefix `++x` form.

```go
i++          // ok
i--          // ok

// Compile errors:
// y := i++          // x++ isn't an expression
// f(i++)            // can't use as argument

// Use += / -= for other amounts:
i += 2
```
