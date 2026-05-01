---
id: short-decl
label: ":="
ref: https://go.dev/ref/spec#Short_variable_declarations
---

Short variable declaration: declare and assign in one go. Function bodies only. At least one variable on the left must be new; the rest are reassigned (`=`).

```go
func main() {
    name := "world"           // declares + assigns
    n, err := strconv.Atoi(s) // multi-value
    // = (not :=) for reassignment
    name = "go"

    if v, ok := m["key"]; ok { // scoped to the if/else
        fmt.Println(v)
    }
}
```
