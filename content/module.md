---
id: module
label: module
hint: go.mod
ref: https://go.dev/ref/mod#go-mod-file
---

Unit of versioning and dependency. One `go.mod` per repo, typically. The module path is the import prefix for every package inside.

```go
// go.mod
module github.com/alex/greeter

go 1.22

require (
    github.com/google/uuid v1.6.0
    golang.org/x/sync v0.7.0
)
```
