---
id: type-literal
label: type literal
ref: https://go.dev/ref/spec#Types
---

The shape on the right of a type decl: struct, interface, slice, map, chan, func, pointer, array. You can also use a literal anonymously, e.g. as a parameter type.

```go
type User    struct{ Name string; Age int }
type Reader  interface{ Read(p []byte) (int, error) }
type Bytes   []byte                       // slice
type Pair    [2]int                       // array
type Cache   map[string]int                // map
type Done    chan struct{}                 // chan
type Handler func(req string) error        // func
type IntPtr  *int                          // pointer
```
