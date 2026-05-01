---
id: package
label: package
ref: https://go.dev/ref/spec#Packages
---

A directory of `.go` files sharing one `package` clause. The unit of compilation, import, and visibility. Identifiers are visible to all files in the package; capitalized names are exported to importers.

```go
// greeter/greeter.go and greeter/person.go both start:
package greeter

// Every file in the directory shares this clause.
// Identifiers are visible to all files in the package.
```
