---
id: workspace
label: workspace
hint: go.work
ref: https://go.dev/ref/mod#workspaces
---

Groups multiple modules for local development. Lets you edit several modules at once without `replace` directives. Not committed to release branches.

```go
// go.work — at the top of a multi-module checkout
go 1.22

use (
    ./greeter
    ./api
    ./internal/tools
)
```
