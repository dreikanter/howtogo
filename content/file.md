---
id: file
label: file
ref: https://go.dev/ref/spec#Source_file_organization
---

A `.go` source file. Files in one package see each other freely; declaration order does not matter. Build tags or `_test.go` / `_GOOS.go` suffixes can scope a file to specific builds.

```go
// greeter/hello.go
package greeter

import "fmt"

// Hello can call sayBye even though it lives in another file
// of the same package, declared above or below — order is irrelevant.
func Hello(name string) string {
    return fmt.Sprintf("hi %s; %s", name, sayBye())
}
```
