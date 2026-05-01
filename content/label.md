---
id: label
label: "Name:"
ref: https://go.dev/ref/spec#Labeled_statements
---

A name followed by `:` marks a target for `break`, `continue`, or `goto` within the same function. Mostly useful to break out of nested loops in one shot.

```go
Outer:
for _, row := range grid {
    for _, cell := range row {
        if cell == target {
            break Outer       // exits both loops
        }
    }
}
```
