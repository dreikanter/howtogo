---
id: defer
label: defer
ref: https://go.dev/ref/spec#Defer_statements
---

Schedules a call to run when the surrounding function returns. LIFO order. Arguments are evaluated when `defer` is reached, not when the call runs. Runs even on panic — handy for cleanup.

```go
func read(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()       // runs when read() returns

    return io.ReadAll(f)
}

// LIFO: "two" prints before "one"
defer fmt.Println("one")
defer fmt.Println("two")

// Args evaluate now, not at call time.
i := 1
defer fmt.Println(i)      // prints 1, not 2
i = 2
```
