---
id: expr-stmt
label: expression
ref: https://go.dev/ref/spec#Expression_statements
---

A bare expression used as a statement — typically a function or method call invoked for its side effects. Return values, if any, are discarded; ignore an `error` and `go vet` may complain.

```go
fmt.Println("hi")        // value discarded
buf.Reset()              // mutates buf
delete(m, "key")         // built-in call

// To "ignore" a value explicitly:
_ = json.Marshal(v)      // silenced, but errcheck still complains
```
