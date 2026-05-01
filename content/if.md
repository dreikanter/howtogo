---
id: if
label: if
ref: https://go.dev/ref/spec#If_statements
---

Conditional, optional `else`. No parentheses around the condition. An optional init statement is scoped to the `if` and any `else` branches — handy for guarding errors.

```go
if x > 0 {
    fmt.Println("positive")
} else if x == 0 {
    fmt.Println("zero")
} else {
    fmt.Println("negative")
}

// init statement scoped to the if/else
if err := load(); err != nil {
    return err
}
```
