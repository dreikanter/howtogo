---
id: break
label: break
ref: https://go.dev/ref/spec#Break_statements
---

Exits the innermost `for`, `switch`, or `select`. Use a label to break out of an enclosing loop instead.

```go
for {
    if done {
        break          // exits this for
    }
}

Outer:
for _, row := range grid {
    for _, cell := range row {
        if cell == target {
            break Outer  // exits both loops
        }
    }
}
```
