---
id: statement
label: statement
ref: https://go.dev/ref/spec#Statements
---

A unit of execution: assignments, calls, control flow. Lives inside function bodies. Semicolons are inserted automatically at line ends — keep `{` on the same line as the keyword.

```go
func work() {
    x := 1                  // short declaration
    x++                     // increment
    fmt.Println(x)          // expression used as statement
    if x > 0 { return }     // control flow
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }
}
```
