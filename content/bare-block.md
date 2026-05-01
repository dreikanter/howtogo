---
id: bare-block
label: "{ ... }"
ref: https://go.dev/ref/spec#Blocks
---

A `{ ... }` used as a standalone statement. Rare but legal — it just opens a new scope. Mostly seen to limit the lifetime of a temporary, or to keep a `goto` target tidy.

```go
func main() {
    {                              // bare block — fresh scope
        tmp := loadHugeThing()
        process(tmp)
    }
    // tmp is gone here, freed for GC
}
```
