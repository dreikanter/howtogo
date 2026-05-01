---
id: return
label: return
ref: https://go.dev/ref/spec#Return_statements
---

Exits the function, optionally with values. Named return values can be set as variables and returned with a bare `return` ("naked return") — fine in tiny functions, ugly in long ones.

```go
func add(a, b int) int { return a + b }

func split(sum int) (x, y int) { // named returns
    x = sum * 4 / 9
    y = sum - x
    return                       // naked return: returns x, y
}
```
