---
id: go
label: go
ref: https://go.dev/ref/spec#Go_statements
---

Starts a goroutine — runs the call concurrently in the same address space and returns immediately. The arguments are evaluated before the goroutine starts. Coordinate with channels, `sync`, or `context`; never assume ordering.

```go
go fmt.Println("hello")            // fire and forget

go func() {                        // closure captures by reference
    defer wg.Done()
    work(ctx)
}()

// Common trap (pre Go 1.22): loop variable capture.
for _, item := range items {
    item := item                   // shadow before passing in
    go process(item)
}
```
