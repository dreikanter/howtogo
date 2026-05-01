---
id: continue
label: continue
ref: https://go.dev/ref/spec#Continue_statements
---

Skip to the next iteration of the innermost `for`. A label targets an enclosing loop.

```go
for _, n := range nums {
    if n%2 != 0 {
        continue       // skip odd numbers
    }
    process(n)
}

Outer:
for _, batch := range batches {
    for _, item := range batch {
        if item.skip {
            continue Outer  // skip the rest of this batch
        }
    }
}
```
