---
id: package-clause
label: package clause
ref: https://go.dev/ref/spec#Package_clause
---

First non-comment line of every `.go` file. All files in a directory share one clause. The name `main` is special: it produces an executable from a `func main()`.

```go
package greeter   // every file in greeter/ starts with this

package main      // special: produces an executable with main()
```
