---
id: send
label: "ch <- x"
ref: https://go.dev/ref/spec#Send_statements
---

Channel send. Blocks until a receiver is ready (unbuffered) or there is room (buffered). Sending on a `nil` channel blocks forever; sending on a closed channel panics.

```go
ch <- value              // send

// Buffered channel: doesn't block until full.
buf := make(chan int, 4)
buf <- 1
buf <- 2

// Non-blocking send via select.
select {
case ch <- value:
default:
    // dropped — receiver not ready
}
```
