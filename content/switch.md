---
id: switch
label: switch
ref: https://go.dev/ref/spec#Switch_statements
---

Value or type switch. Cases break automatically; use `fallthrough` to chain. A switch with no expression is a clean replacement for an `if`/`else if` ladder.

```go
switch day {
case "sat", "sun":
    fmt.Println("weekend")
default:
    fmt.Println("weekday")
}

// expression-less switch
switch {
case x < 0:  ...
case x == 0: ...
default:     ...
}

// type switch
switch v := x.(type) {
case int:    fmt.Println("int", v)
case string: fmt.Println("string", v)
}
```
