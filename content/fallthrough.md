---
id: fallthrough
label: fallthrough
ref: https://go.dev/ref/spec#Fallthrough_statements
---

Falls into the next `switch` case unconditionally. Must be the last statement in a case. Cannot appear in a type switch. List multiple values in one `case` instead when you just want shared handling.

```go
switch n {
case 1:
    fmt.Println("one")
    fallthrough
case 2:
    fmt.Println("one or two")
case 3, 4:
    fmt.Println("three or four") // multi-value case — preferred
}
```
