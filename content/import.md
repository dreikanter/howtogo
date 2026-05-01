---
id: import
label: import declaration
ref: https://go.dev/ref/spec#Import_declarations
---

Pulls another package's exported (capitalized) names into this file. Aliases rename, blank `_` runs `init()` only, and `.` dumps names into the current scope (rare; tests only).

```go
import "fmt"   // single import

import (
    "fmt"
    "strings"

    "github.com/google/uuid"          // third-party
    log "github.com/sirupsen/logrus"  // local alias
    _ "image/png"                     // blank: run init only
)
```
