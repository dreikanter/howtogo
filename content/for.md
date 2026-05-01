---
id: for
label: for
ref: https://go.dev/ref/spec#For_statements
---

The only loop. Four forms: C-style, while-style, infinite, and `range`. As of Go 1.22 each iteration of `for i := ...` gets a fresh `i`, fixing the classic closure-captures-loop-var trap.

```go
for i := 0; i < 10; i++ { ... }   // C-style

for cond { ... }                  // while-style

for { ... }                       // infinite

for i, v := range slice { ... }   // range
for k, v := range m { ... }
for v := range ch { ... }         // until channel closed
for i := range 10 { ... }         // Go 1.22+: int range
```
