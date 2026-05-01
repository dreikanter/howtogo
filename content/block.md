---
id: block
label: block
ref: https://go.dev/ref/spec#Blocks
---

`{ ... }` groups statements and opens a new scope. Function bodies, `if` / `for` / `switch` bodies, and bare blocks are all blocks. Variables declared inside die at the closing brace.

```go
func main() {
    {                       // bare block — new scope
        msg := "inner"
        fmt.Println(msg)
    }
    // msg is not visible here

    if x := 10; x > 0 {     // x is scoped to this block (and its else)
        fmt.Println(x)
    }
}
```
