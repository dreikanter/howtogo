<script>
  import Tok from './Tok.svelte';
  import HierarchySpine from './HierarchySpine.svelte';
  import FileTree from './FileTree.svelte';
  import FileCard from './FileCard.svelte';
  import { state, levels, getColors, syntax } from './store.svelte.js';

  const colors = $derived(getColors());

  const cheats = [
    {
      title: 'Declarations',
      ref: 'https://go.dev/ref/spec#Declarations_and_scope',
      items: [
        ['package', 'First line in every source file. Files in one directory usually share one package name.'],
        ['import', 'Imports packages; only exported identifiers (Capitalized) are accessible from other packages.'],
        ['const', 'Compile-time values. Untyped constants are flexible until used. iota counts lines in a const block.'],
        ['var', 'Zero-valued mutable binding. Package vars initialize before init().'],
        ['type', 'Names a type. New defined types are distinct from their underlying type.'],
        ['func', 'Declares functions and methods. Methods are functions with receiver parameters.'],
      ],
      code: `<span class="kw">package</span> main\n\n<span class="kw">import</span> <span class="str">"fmt"</span>\n\n<span class="kw">const</span> Pi = <span class="num">3.14</span>\n<span class="kw">var</span> count <span class="typ">int</span>\n<span class="kw">type</span> User <span class="kw">struct</span>{ Name <span class="typ">string</span> }\n\n<span class="kw">func</span> main() {\n    fmt.Println(Pi, count)\n}`,
    },
    {
      title: 'Types and zero values',
      ref: 'https://go.dev/ref/spec#Types',
      items: [
        ['bool', 'false'],
        ['string', '""; immutable bytes, often UTF-8 text.'],
        ['int, float64, complex128', '0, 0.0, 0+0i. Prefer int unless size matters.'],
        ['pointer, slice, map, channel, func, interface', 'nil. Check nil before use where needed.'],
        ['array, struct', 'Each element or field gets its own zero value.'],
      ],
      code: `<span class="kw">var</span> ok <span class="typ">bool</span>               <span class="com">// false</span>\n<span class="kw">var</span> name <span class="typ">string</span>           <span class="com">// ""</span>\n<span class="kw">var</span> scores []<span class="typ">int</span>          <span class="com">// nil slice</span>\n<span class="kw">var</span> seen <span class="kw">map</span>[<span class="typ">string</span>]<span class="typ">bool</span>  <span class="com">// nil map</span>\n<span class="kw">var</span> u <span class="typ">User</span>                <span class="com">// fields zeroed</span>`,
    },
    {
      title: 'Control flow',
      ref: 'https://go.dev/ref/spec#Statements',
      items: [
        ['if', 'Initializer allowed: if x := f(); x > 0 { ... }. No parentheses required.'],
        ['for', 'The only loop keyword: for, for condition, for init; condition; post, and for range.'],
        ['switch', 'Cases break automatically. Use fallthrough explicitly. Type switches inspect interface values.'],
        ['defer', 'Runs after the surrounding function returns, in last-in-first-out order.'],
        ['panic / recover', 'For exceptional paths. recover only works inside deferred functions.'],
      ],
      code: `<span class="kw">for</span> i, v := <span class="kw">range</span> values {\n    <span class="kw">if</span> v == <span class="str">"skip"</span> { <span class="kw">continue</span> }\n    <span class="kw">switch</span> {\n    <span class="kw">case</span> i == <span class="num">0</span>: fmt.Println(<span class="str">"first"</span>)\n    <span class="kw">default</span>:     fmt.Println(v)\n    }\n}`,
    },
    {
      title: 'Functions, methods, interfaces',
      ref: 'https://go.dev/ref/spec#Function_declarations',
      items: [
        ['multiple returns', 'Return values can be named; errors are conventionally the last return value.'],
        ['methods', 'Receiver goes before the method name: func (b *Buffer) Write(p []byte) (int, error).'],
        ['interfaces', 'A type implements an interface implicitly by having the required methods.'],
        ['embedding', 'Embed fields or interfaces to promote methods and compose behavior.'],
      ],
      code: `<span class="kw">type</span> Reader <span class="kw">interface</span> {\n    Read(p []<span class="typ">byte</span>) (n <span class="typ">int</span>, err <span class="typ">error</span>)\n}\n\n<span class="kw">func</span> (u User) Greet() <span class="typ">string</span> {\n    <span class="kw">return</span> <span class="str">"hi "</span> + u.Name\n}`,
    },
    {
      title: 'Slices, maps, structs',
      ref: 'https://go.dev/ref/spec#Composite_literals',
      items: [
        ['slice', 'Descriptor over an array: pointer, length, capacity. append may allocate a new backing array.'],
        ['map', 'Reference type. Reading a missing key returns zero value plus optional ok flag.'],
        ['struct', 'Value type with named fields; tags are string metadata used by packages like encoding/json.'],
        ['make vs new', 'make initializes slice, map, channel. new(T) returns *T pointing at zero value.'],
      ],
      code: `<span class="kw">type</span> Config <span class="kw">struct</span> {\n    Port <span class="typ">int</span>    <span class="str">\`json:"port"\`</span>\n}\n\nnums := []<span class="typ">int</span>{<span class="num">1</span>, <span class="num">2</span>}\nnums = <span class="kw">append</span>(nums, <span class="num">3</span>)\n\ncounts := <span class="kw">map</span>[<span class="typ">string</span>]<span class="typ">int</span>{<span class="str">"go"</span>: <span class="num">1</span>}\nn, ok := counts[<span class="str">"go"</span>]`,
    },
    {
      title: 'Errors and testing',
      ref: 'https://go.dev/doc/tutorial/handle-errors',
      items: [
        ['error', 'An interface: type error interface { Error() string }. Return errors; do not hide them.'],
        ['wrapping', 'fmt.Errorf("open config: %w", err) preserves the cause for errors.Is and errors.As.'],
        ['tests', 'Files end in _test.go. Functions are TestXxx(t *testing.T). Run go test ./...'],
        ['table tests', 'Use slices of cases for readable examples and edge cases.'],
      ],
      code: `got, err := Load(path)\n<span class="kw">if</span> err != <span class="kw">nil</span> {\n    <span class="kw">return</span> fmt.Errorf(<span class="str">"load %s: %w"</span>, path, err)\n}\n\n<span class="kw">func</span> TestLoad(t *testing.T) {\n    t.Run(<span class="str">"missing file"</span>, <span class="kw">func</span>(t *testing.T) { ... })\n}`,
    },
    {
      title: 'Concurrency',
      ref: 'https://go.dev/ref/spec#Go_statements',
      items: [
        ['goroutine', 'go f() starts f concurrently in the same address space. Coordinate ownership of shared data.'],
        ['channel', 'Typed pipe: ch <- v sends, v := <-ch receives, close(ch) signals no more sends.'],
        ['select', 'Waits on multiple channel operations; default makes it non-blocking.'],
        ['context', 'Pass context.Context for cancellation, deadlines, and request-scoped values.'],
      ],
      code: `ctx, cancel := context.WithTimeout(context.Background(), time.Second)\n<span class="kw">defer</span> cancel()\n\nresults := <span class="kw">make</span>(<span class="kw">chan</span> Result)\n<span class="kw">go func</span>() { results <- Work(ctx) }()\n\n<span class="kw">select</span> {\n<span class="kw">case</span> r := <-results: fmt.Println(r)\n<span class="kw">case</span> <-ctx.Done(): <span class="kw">return</span> ctx.Err()\n}`,
    },
    {
      title: 'Toolbox commands',
      ref: 'https://pkg.go.dev/cmd/go',
      items: [
        ['go mod init example.com/app', 'Create go.mod for a module.'],
        ['go run .', 'Build and run the package in the current directory.'],
        ['go test ./...', 'Run all tests in the module. Add -race to catch data races.'],
        ['go fmt ./...', 'Format source code. gofmt is non-negotiable Go style.'],
        ['go vet ./...', 'Static checks for suspicious code.'],
        ['go doc fmt.Println', 'Read documentation from the terminal.'],
      ],
      code: `$ go mod init example.com/app\n$ go fmt ./...\n$ go test -race ./...\n$ go vet ./...\n$ go build ./cmd/server`,
    },
  ];

  const operators = [
    [':=', 'short variable declaration, only inside functions', 'name := "gopher"'],
    ['...', 'variadic parameter or argument expansion', 'fmt.Println(items...)\nfunc sum(xs ...int) int'],
    ['& / *', 'address-of and pointer dereference', 'p := &count\nfmt.Println(*p)'],
    ['<-', 'channel send or receive', 'ch <- value\nvalue := <-ch'],
    ['.(T)', 'type assertion', 's, ok := v.(string)'],
    ['T(v)', 'conversion, not a cast with magic', 'n := int64(count)'],
  ];

  const proverbs = [
    'Don’t communicate by sharing memory; share memory by communicating.',
    'Clear is better than clever.',
    'A little copying is better than a little dependency.',
    'Errors are values.',
    'The bigger the interface, the weaker the abstraction.',
    'Make the zero value useful.',
    'Gofmt’s style is no one’s favorite, yet gofmt is everyone’s favorite.',
    'Documentation is for users.',
    'Concurrency is not parallelism.',
  ];

  const checklist = [
    'Run <code>gofmt</code>.',
    'Run <code>go test ./...</code>.',
    'Return errors; do not panic for normal failures.',
    'Keep interfaces small.',
    'Prefer simple structs and functions first.',
    'Use <code>context.Context</code> for cancellation across API boundaries.',
  ];

  const traps = [
    ['nil slice vs empty slice', 'Both have length 0, but JSON and API behavior may differ.'],
    ['nil map cannot be assigned into', 'Initialize with make(map[K]V) or a map literal before writes.'],
    ['loop variable capture', 'Pass loop values into goroutines/closures when needed.'],
    ['append may allocate', 'Keep the returned slice: s = append(s, v).'],
    ['map iteration order', 'It is intentionally unspecified; sort keys when order matters.'],
    ['pointer vs value receiver', 'Pointer receivers can mutate and avoid copying; method sets differ.'],
    ['exported names need comments', 'Public package identifiers should document what users need to know.'],
  ];

  const whenToUse = [
    ['array', 'rarely; fixed size is part of the type'],
    ['slice', 'usually; flexible view over an array'],
    ['map', 'lookup by key'],
    ['struct', 'data shape with named fields'],
    ['interface', 'behavior and boundaries'],
    ['channel', 'coordination or ownership transfer'],
    ['mutex', 'protect shared state'],
  ];

  const toggleTheme = () => (state.theme = state.theme === 'dark' ? 'light' : 'dark');
</script>

<svelte:head>
  <title>Go Concepts & Syntax</title>
  <meta
    name="description"
    content="A visual Go cheat sheet covering packages, declarations, types, functions, errors, concurrency, and commands."
  />
</svelte:head>

<div
  class="app"
  style:background-color={colors.paper}
  style:color={colors.ink}
  style:--paper={colors.paper}
  style:--panel={colors.panel}
  style:--panel2={colors.panel2}
  style:--ink={colors.ink}
  style:--muted={colors.muted}
  style:--rule={colors.rule}
  style:--soft={colors.soft}
  style:--glow={colors.glow}
  style:--kw={syntax.kw}
  style:--str={syntax.str}
  style:--com={syntax.com}
  style:--typ={syntax.typ}
  style:--fun={syntax.fun}
  style:--num={syntax.num}
  style:--op={syntax.op}
>
  <div class="shell">
    <header class="hero">
      <div>
        <div class="eyebrow">HOW TO GO</div>
        <h1>Go Concepts & Syntax</h1>
        <p>
          A visual cheat sheet for core Go ideas: module, package, declarations, types,
          control flow, errors, tests, concurrency, and the go command.
        </p>
      </div>
      <button class="theme-button" type="button" onclick={toggleTheme} aria-label="Switch theme">
        <span>{state.theme === 'dark' ? '☾' : '☀'}</span>
      </button>
    </header>

    <section class="workspace" aria-label="Go project hierarchy">
      <div class="workspace-main">
        <div class="hierarchy-card">
          <div class="block-head">
            <h2>How a Go project nests</h2>
            <span class="block-sub">workspace ← module ← package ← file ← declaration</span>
          </div>
          <HierarchySpine />
        </div>

        <div class="example-card">
          <div class="block-head">
            <h2>Example: balanced-brackets module</h2>
            <a href="https://en.wikipedia.org/wiki/Balanced_parentheses" target="_blank" rel="noreferrer">algorithm ↗</a>
          </div>

          <div class="example-grid">
            <FileTree />

            <div class="files-stack">
              <FileCard name="go.mod" kind="manifest">
                <pre><span class="kw">module</span> <Tok lv="module">github.com/alex/brackets</Tok>
<span class="kw">go</span> 1.22</pre>
              </FileCard>

              <FileCard name="stack.go">
                <pre><span class="com">// Package brackets checks whether a string of brackets is balanced.</span>
<span class="kw">package</span> <Tok lv="pkg">brackets</Tok>

<span class="kw">import</span> <Tok lv="imp"><span class="str">"errors"</span></Tok>

<span class="kw">var</span> <Tok lv="vvar">ErrEmpty</Tok> = errors.New(<span class="str">"stack: pop from empty"</span>)

<span class="kw">type</span> <Tok lv="typ"><span class="typ">Stack</span></Tok> <span class="kw">struct</span> &lbrace;
    <Tok lv="field">data</Tok> []<span class="typ">rune</span>
&rbrace;

<span class="kw">func</span> (<Tok lv="param">s</Tok> *<span class="typ">Stack</span>) <Tok lv="method">Push</Tok>(<Tok lv="param">r</Tok> <span class="typ">rune</span>) &lbrace; s.data = <span class="kw">append</span>(s.data, r) &rbrace;

<span class="kw">func</span> (<Tok lv="param">s</Tok> *<span class="typ">Stack</span>) <Tok lv="method">Pop</Tok>() (<span class="typ">rune</span>, <span class="typ">error</span>) &lbrace;
    <span class="kw">if</span> <span class="kw">len</span>(s.data) == <span class="num">0</span> &lbrace;
        <span class="kw">return</span> <span class="num">0</span>, ErrEmpty
    &rbrace;
    r := s.data[<span class="kw">len</span>(s.data)-<span class="num">1</span>]
    s.data = s.data[:<span class="kw">len</span>(s.data)-<span class="num">1</span>]
    <span class="kw">return</span> r, <span class="kw">nil</span>
&rbrace;

<span class="kw">func</span> (<Tok lv="param">s</Tok> *<span class="typ">Stack</span>) <Tok lv="method">Len</Tok>() <span class="typ">int</span> &lbrace; <span class="kw">return</span> <span class="kw">len</span>(s.data) &rbrace;</pre>
              </FileCard>

              <FileCard name="check.go">
                <pre><span class="kw">package</span> <Tok lv="pkg">brackets</Tok>

<span class="kw">const</span> <Tok lv="konst">Brackets</Tok> = <span class="str">"()[]&lbrace;&rbrace;"</span>

<span class="kw">var</span> <Tok lv="vvar">match</Tok> = <span class="kw">map</span>[<span class="typ">rune</span>]<span class="typ">rune</span>&lbrace;
    <span class="str">')'</span>: <span class="str">'('</span>,
    <span class="str">']'</span>: <span class="str">'['</span>,
    <span class="str">'&rbrace;'</span>: <span class="str">'&lbrace;'</span>,
&rbrace;

<span class="com">// Balanced reports whether every opening bracket in s has a matching close.</span>
<span class="kw">func</span> <Tok lv="fn">Balanced</Tok>(<Tok lv="param">s</Tok> <span class="typ">string</span>) <span class="typ">bool</span> &lbrace;
    <span class="kw">var</span> stack <Tok lv="typ"><span class="typ">Stack</span></Tok>
    <span class="kw">for</span> _, r := <span class="kw">range</span> s &lbrace;
        <span class="kw">switch</span> r &lbrace;
        <span class="kw">case</span> <span class="str">'('</span>, <span class="str">'['</span>, <span class="str">'&lbrace;'</span>:
            stack.Push(r)
        <span class="kw">case</span> <span class="str">')'</span>, <span class="str">']'</span>, <span class="str">'&rbrace;'</span>:
            top, err := stack.Pop()
            <span class="kw">if</span> err != <span class="kw">nil</span> || top != match[r] &lbrace;
                <span class="kw">return</span> <span class="kw">false</span>
            &rbrace;
        &rbrace;
    &rbrace;
    <span class="kw">return</span> stack.Len() == <span class="num">0</span>
&rbrace;</pre>
              </FileCard>
            </div>
          </div>
        </div>
      </div>

      <aside class="legend" aria-label="Hierarchy legend">
        <div class="panel-title">Hover map</div>
        {#each Object.entries(levels) as [k, v] (k)}
          {@const active = state.hover === k}
          <div
            class="legend-row"
            class:active
            onmouseenter={() => (state.hover = k)}
            onmouseleave={() => (state.hover = null)}
            style:--accent={v.hue}
          >
            <strong>{v.label}</strong>
            <span>{v.desc}</span>
          </div>
        {/each}
      </aside>
    </section>

    <section class="quick-grid" aria-label="quick reference">
      <div class="note-card">
        <div class="panel-title">Mental model</div>
        <p><strong>Small interfaces, explicit errors, simple composition.</strong> Go code tends to be clearest when data ownership and control flow are visible.</p>
      </div>
      <div class="note-card">
        <div class="panel-title">Export rule</div>
        <p><strong>Capitalized identifiers are exported:</strong> User, NewClient, ErrClosed. lowerCase stays package-private.</p>
      </div>
      <div class="note-card">
        <div class="panel-title">Formatting rule</div>
        <p><strong>Run gofmt.</strong> Style arguments are mostly over because the formatter decides layout for everyone.</p>
      </div>
    </section>

    <main class="cheatsheet" aria-label="Go cheat sheet">
      {#each cheats as section}
        <article class="cheat-card">
          <div class="cheat-head">
            <h2>{section.title}</h2>
            <a href={section.ref} target="_blank" rel="noreferrer">official reference ↗</a>
          </div>
          <div class="cheat-body">
            <dl>
              {#each section.items as [term, desc]}
                <div>
                  <dt>{term}</dt>
                  <dd>{desc}</dd>
                </div>
              {/each}
            </dl>
            <pre class="snippet">{@html section.code}</pre>
          </div>
        </article>
      {/each}
    </main>

    <section class="operators" aria-label="operators and syntax marks">
      <div class="cheat-head">
        <h2>Syntax marks worth memorizing</h2>
        <a href="https://go.dev/ref/spec#Operators_and_punctuation" target="_blank" rel="noreferrer">operators and punctuation ↗</a>
      </div>
      <div class="operator-grid">
        {#each operators as [mark, meaning, example]}
          <div>
            <code>{mark}</code>
            <span>{meaning}</span>
            <pre class="operator-example">{example}</pre>
          </div>
        {/each}
      </div>
    </section>

    <section class="mindset" aria-label="Go mindset">
      <div class="cheat-head">
        <h2>Go Mindset</h2>
      </div>
      <div class="mindset-body">
        <div>
          <div class="panel-title source-title">
            Proverbs
            <a href="https://go-proverbs.github.io/" target="_blank" rel="noreferrer">Go Proverbs by Rob Pike ↗</a>
          </div>
          <ul class="proverb-list">
            {#each proverbs as proverb}
              <li>{proverb}</li>
            {/each}
          </ul>
        </div>
        <div>
          <div class="panel-title">Beginner checklist</div>
          <ul class="check-list">
            {#each checklist as item}
              <li>{@html item}</li>
            {/each}
          </ul>
        </div>
      </div>
    </section>

    <section class="reminders" aria-label="Go reminders">
      <article class="reminder-card">
        <div class="cheat-head">
          <h2>Common traps</h2>
        </div>
        <dl>
          {#each traps as [term, desc]}
            <div>
              <dt>{term}</dt>
              <dd>{desc}</dd>
            </div>
          {/each}
        </dl>
      </article>
      <article class="reminder-card">
        <div class="cheat-head">
          <h2>When to use what</h2>
        </div>
        <dl>
          {#each whenToUse as [term, desc]}
            <div>
              <dt>{term}</dt>
              <dd>{desc}</dd>
            </div>
          {/each}
        </dl>
      </article>
    </section>

    <section class="references" aria-label="Go references">
      <div class="cheat-head">
        <h2>References</h2>
      </div>
      <div class="reference-grid">
        <a href="https://go.dev/ref/spec" target="_blank" rel="noreferrer">
          <strong>Go documentation</strong>
          <span>Language specification: syntax and semantics.</span>
        </a>
        <a href="https://go.dev/doc/effective_go" target="_blank" rel="noreferrer">
          <strong>Effective Go</strong>
          <span>Idioms, naming, interfaces, errors, and style.</span>
        </a>
        <a href="https://pkg.go.dev/" target="_blank" rel="noreferrer">
          <strong>pkg.go.dev</strong>
          <span>Standard library and module documentation.</span>
        </a>
        <a href="https://go.dev/play/" target="_blank" rel="noreferrer">
          <strong>Go Playground</strong>
          <span>Run small snippets in the browser.</span>
        </a>
        <a href="https://gobyexample.com/" target="_blank" rel="noreferrer">
          <strong>Go by Example</strong>
          <span>Practical examples for common features.</span>
        </a>
        <a href="https://go.dev/wiki/CodeReviewComments" target="_blank" rel="noreferrer">
          <strong>Code Review Comments</strong>
          <span>Concise advice from real Go reviews.</span>
        </a>
      </div>
    </section>

    <footer>
      <span>Core Go ideas in one visual reference: packages, types, errors, tests, concurrency, and tools.</span>
    </footer>
  </div>
</div>

<style>
  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    margin: 0;
    background: var(--paper, #0d1117);
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  :global(*), :global(*::before), :global(*::after) { box-sizing: border-box; }
  .app { min-height: 100vh; transition: background-color 120ms ease, color 120ms ease; }
  .shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 16px 0 44px; }
  .hero { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: start; margin-bottom: 28px; }
  .eyebrow, .panel-title { color: var(--muted); font-size: 12px; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; }
  .eyebrow { margin-bottom: 18px; }
  h1, h2, p { margin: 0; }
  h1 { max-width: 850px; font-size: clamp(34px, 6vw, 72px); line-height: .95; letter-spacing: -0.06em; }
  .hero p { max-width: 760px; margin-top: 18px; color: var(--muted); line-height: 1.7; font-size: 15px; }
  .theme-button { border: 1px solid var(--rule); background: color-mix(in srgb, var(--panel) 78%, transparent); color: var(--muted); border-radius: 999px; width: 42px; height: 42px; padding: 0; font: inherit; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.14); display: inline-grid; place-items: center; }
  .theme-button span { display: inline-block; width: 1.4em; }
  .workspace { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 22px; align-items: start; }
  .workspace-main { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
  .hierarchy-card, .example-card, .legend, .cheat-card, .note-card, .operators, .references, .mindset, .reminder-card { background: linear-gradient(180deg, var(--panel), var(--panel2)); border: 1px solid var(--rule); border-radius: 18px; box-shadow: 0 1px 2px rgba(0,0,0,.16); }
  .hierarchy-card, .example-card { overflow: hidden; }
  .block-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding: 16px 18px 12px; border-bottom: 1px solid var(--rule); }
  .block-head h2 { font-size: 16px; letter-spacing: -0.02em; }
  .block-sub { color: var(--muted); font-size: 12px; letter-spacing: 0.04em; }
  .example-grid { display: grid; grid-template-columns: 260px 1fr; gap: 18px; padding: 16px 18px 18px; align-items: start; }
  .files-stack { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  pre { margin: 0; overflow-x: auto; font: 13px/1.7 'JetBrains Mono', ui-monospace, monospace; white-space: pre; color: var(--ink); }
  :global(.kw) { color: var(--kw); font-weight: 650; } :global(.str) { color: var(--str); } :global(.com) { color: var(--com); font-style: italic; } :global(.typ) { color: var(--typ); } :global(.num) { color: var(--num); }
  .legend { position: sticky; top: 18px; padding: 16px; }
  .legend-row { border-left: 3px solid transparent; padding: 9px 10px; border-radius: 8px; cursor: help; }
  .legend-row.active { border-left-color: var(--accent); background: color-mix(in srgb, var(--accent) 15%, transparent); }
  .legend-row strong { display: block; color: var(--accent); font-size: 11px; letter-spacing: .14em; }
  .legend-row span { display: block; color: var(--muted); margin-top: 4px; font-size: 12px; line-height: 1.45; }
  .quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 22px 0; }
  .note-card { padding: 18px; }
  .note-card p { margin-top: 10px; color: var(--muted); line-height: 1.6; font-size: 13px; }
  .note-card strong { color: var(--ink); }
  .cheatsheet { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .cheat-card { overflow: hidden; display: flex; flex-direction: column; }
  .cheat-head { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; padding: 18px 18px 12px; border-bottom: 1px solid var(--rule); }
  h2 { font-size: 18px; letter-spacing: -0.03em; }
  a { color: #58a6ff; text-decoration: none; font-size: 12px; white-space: nowrap; }
  a:hover { text-decoration: underline; }
  .cheat-body { display: flex; flex-direction: column; flex: 1; }
  dl { margin: 0; padding: 14px 18px; }
  dl div { display: grid; grid-template-columns: 155px 1fr; gap: 16px; padding: 9px 0; border-bottom: 1px dashed var(--rule); }
  dl div:last-child { border-bottom: 0; }
  dt { color: var(--op); font-weight: 700; font-size: 13px; }
  dd { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.55; }
  .snippet { flex: 1; border-top: 1px solid var(--rule); background: rgba(0,0,0,.16); padding: 16px 18px; font-size: 12.5px; }
  .operators, .references, .mindset { margin-top: 18px; overflow: hidden; }
  .operator-grid, .reference-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--rule); }
  .operator-grid { grid-template-columns: repeat(2, 1fr); }
  .operator-grid div, .reference-grid a { background: var(--panel); padding: 14px 16px; display: grid; gap: 8px; }
  code { color: var(--op); font-weight: 800; font-size: 16px; }
  .operator-grid span, .reference-grid span { color: var(--muted); font-size: 13px; line-height: 1.45; }
  .operator-example { background: rgba(0,0,0,.16); border: 1px solid var(--rule); border-radius: 10px; padding: 10px 12px; font-size: 12px; line-height: 1.55; }
  .reference-grid a { white-space: normal; transition: background-color 120ms ease; }
  .reference-grid a:hover { background: var(--soft); text-decoration: none; }
  .reference-grid strong { color: var(--op); font-size: 13px; }
  .mindset-body { display: grid; grid-template-columns: 1.25fr .75fr; gap: 1px; background: var(--rule); }
  .mindset-body > div { background: var(--panel); padding: 18px; }
  .proverb-list, .check-list { margin: 12px 0 0; padding-left: 20px; color: var(--muted); font-size: 13px; line-height: 1.65; }
  .proverb-list li::marker, .check-list li::marker { color: var(--op); }
  .source-title { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; }
  .source-title a { letter-spacing: 0; text-transform: none; font-weight: 500; }
  :global(.check-list code) { color: var(--op); background: rgba(0,0,0,.16); border: 1px solid var(--rule); border-radius: 6px; padding: 1px 5px; font-size: 12px; }
  .reminders { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
  .reminder-card { overflow: hidden; }
  footer { display: flex; justify-content: space-between; gap: 18px; margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--rule); color: var(--muted); font-size: 12px; line-height: 1.5; }
  @media (max-width: 960px) {
    .workspace, .cheatsheet, .quick-grid, .mindset-body, .reminders { grid-template-columns: 1fr; }
    .example-grid { grid-template-columns: 1fr; }
    .legend { position: static; }
  }
  @media (max-width: 620px) {
    .shell { width: min(100% - 36px, 1180px); padding-top: 16px; }
    .hero { grid-template-columns: minmax(0, 1fr) auto; gap: 12px; }
    .theme-button { width: 34px; height: 34px; box-shadow: 0 1px 2px rgba(0,0,0,.14); }
    dl div { grid-template-columns: 1fr; gap: 4px; }
    .operator-grid, .reference-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; }
  }
</style>
