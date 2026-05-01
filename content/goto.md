---
id: goto
label: goto
ref: https://go.dev/ref/spec#Goto_statements
---

Jumps to a label within the same function. May not skip variable declarations or jump into a block. Rare in idiomatic Go — most uses are cleaner as labeled `break`/`continue` or restructured control flow.

```go
func search(grid [][]int, target int) (int, int, bool) {
    for i, row := range grid {
        for j, v := range row {
            if v == target {
                goto Found
            }
        }
    }
    return 0, 0, false
Found:
    // arrive here on match — but typically prefer
    // labeled break or extracting a helper.
    return -1, -1, true
}
```
