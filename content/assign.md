---
id: assign
label: "="
ref: https://go.dev/ref/spec#Assignment_statements
---

Assignment to an already-declared variable. Multi-assignment is parallel: the right side evaluates first, then values land. `_` discards a value. Combined ops like `+=` mutate in place.

```go
x = 10
a, b = b, a              // swap; both rhs evaluated first
n, _ = strconv.Atoi(s)   // discard the error

count += 1               // x op= y
```
