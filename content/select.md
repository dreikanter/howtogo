---
id: select
label: select
ref: https://go.dev/ref/spec#Select_statements
---

Waits on multiple channel operations. The first ready case fires; if several are ready, one is chosen at random. A `default` makes it non-blocking.

```go
select {
case v := <-in:
    fmt.Println("got", v)
case out <- result:
    fmt.Println("sent")
case <-ctx.Done():
    return ctx.Err()
}

// non-blocking try-send
select {
case ch <- v:
default:
    // dropped
}
```
