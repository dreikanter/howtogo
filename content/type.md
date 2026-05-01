---
id: type
label: type
ref: https://go.dev/ref/spec#Type_declarations
---

`type Name X` defines a new named type distinct from `X` (no implicit conversions). `type Name = X` is an alias — same type, different name. Methods only attach to defined types in the same package.

```go
type Meters float64           // defined type — distinct from float64
type Celsius = float64        // alias — same type as float64

func (m Meters) Feet() Meters { return m * 3.281 }

var d Meters = 10
var f float64 = 5
// d = f                      // compile error: different types
d = Meters(f)                 // explicit conversion is fine
```
