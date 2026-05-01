---
id: expression
label: expression
ref: https://go.dev/ref/spec#Expressions
---

Anything that evaluates to a value: literals, operators, calls, field/index access. A bare call used as a statement just discards its return value.

```go
1 + 2                  // arithmetic
"go" + "lang"          // string concat
len(s) > 0             // comparison → bool
strings.ToUpper(s)     // call
user.Name              // field access
m["key"]               // map index
&u                     // address-of, yields *User

// A bare call used as a statement just discards its value.
fmt.Println("hello")
```
