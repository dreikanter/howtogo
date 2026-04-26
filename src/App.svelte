<script>
  import Scope from './Scope.svelte';
  import Tok from './Tok.svelte';
  import { state, levels, getColors, syntax } from './store.svelte.js';

  const colors = $derived(getColors());

  const NL = '\n';
  const I4 = '    ';

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
    [':=', 'short variable declaration, only inside functions'],
    ['...', 'variadic parameter or argument expansion'],
    ['& / *', 'address-of and pointer dereference'],
    ['<-', 'channel send or receive'],
    ['.(T)', 'type assertion'],
    ['T(v)', 'conversion, not a cast with magic'],
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

    <section class="workspace" aria-label="Go hierarchy">
      <div class="editor-card">
        <div class="titlebar">
          <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
          <span class="tab">greeter.go</span>
        </div>

        <div class="hierarchy-pad">
          <Scope lv="module" tagRight="go.mod">
            <pre><span class="com">// go.mod</span>{NL}<span class="kw">module</span> <Tok lv="module">github.com/alex/greeter</Tok>{NL}<span class="kw">go</span> 1.22</pre>

            <Scope lv="pkg" tagRight="directory: greeter/">
            <pre><span class="com">// all files in this directory share one package clause</span>{NL}<span class="kw">package</span> <Tok lv="pkg">greeter</Tok></pre>

            <Scope lv="file" tagRight="source file">
              <pre><span class="kw">package</span> greeter</pre>

              <Scope lv="imp"><pre><span class="kw">import</span> ({NL}{I4}<Tok lv="imp"><span class="str">"fmt"</span></Tok>{NL}{I4}<Tok lv="imp"><span class="str">"strings"</span></Tok>{NL})</pre></Scope>
              <Scope lv="konst"><pre><span class="kw">const</span> <Tok lv="konst">Greeting</Tok> = <span class="str">"Hello"</span></pre></Scope>
              <Scope lv="vvar"><pre><span class="kw">var</span> <Tok lv="vvar">defaultName</Tok> <span class="typ">string</span> = <span class="str">"world"</span></pre></Scope>
              <Scope lv="typ" tagRight="struct"><pre><span class="kw">type</span> <Tok lv="typ"><span class="typ">Person</span></Tok> <span class="kw">struct</span> &lbrace;{NL}{I4}<Tok lv="field">Name</Tok> <span class="typ">string</span>{NL}{I4}<Tok lv="field">Age</Tok>  <span class="typ">int</span>{NL}&rbrace;</pre></Scope>
              <Scope lv="method" tagRight="receiver"><pre><span class="kw">func</span> (<Tok lv="param">p</Tok> <span class="typ">Person</span>) <Tok lv="method">Hello</Tok>() <span class="typ">string</span> &lbrace;{NL}{I4}<Tok lv="stmt"><span class="kw">return</span> fmt.Sprintf(<span class="str">"%s, %s"</span>, Greeting, p.Name)</Tok>{NL}&rbrace;</pre></Scope>
              <Scope lv="fn"><pre><span class="kw">func</span> <Tok lv="fn">Shout</Tok>(<Tok lv="param">s</Tok> <span class="typ">string</span>) <span class="typ">string</span> &lbrace;{NL}{I4}<Tok lv="stmt"><span class="kw">return</span> strings.ToUpper(s) + <span class="str">"!"</span></Tok>{NL}&rbrace;</pre></Scope>
            </Scope>
            </Scope>
          </Scope>
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
        {#each operators as [mark, meaning]}
          <div><code>{mark}</code><span>{meaning}</span></div>
        {/each}
      </div>
    </section>

    <footer>
      <span>Core Go ideas in one visual reference: packages, types, errors, tests, concurrency, and tools.</span>
      <a href="https://go.dev/doc/" target="_blank" rel="noreferrer">Go documentation ↗</a>
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
  .shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 44px; }
  .hero { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: start; margin-bottom: 28px; }
  .eyebrow, .panel-title { color: var(--muted); font-size: 12px; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; }
  .eyebrow { margin-bottom: 18px; }
  h1, h2, p { margin: 0; }
  h1 { max-width: 850px; font-size: clamp(34px, 6vw, 72px); line-height: .95; letter-spacing: -0.06em; }
  .hero p { max-width: 760px; margin-top: 18px; color: var(--muted); line-height: 1.7; font-size: 15px; }
  .theme-button { border: 1px solid var(--rule); background: var(--panel); color: var(--ink); border-radius: 999px; width: 42px; height: 42px; padding: 0; font: inherit; cursor: pointer; box-shadow: 0 0 0 4px var(--glow); display: inline-grid; place-items: center; }
  .theme-button span { display: inline-block; width: 1.4em; }
  .workspace { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 22px; align-items: start; }
  .editor-card, .legend, .cheat-card, .note-card, .operators { background: linear-gradient(180deg, var(--panel), var(--panel2)); border: 1px solid var(--rule); border-radius: 18px; box-shadow: 0 1px 2px rgba(0,0,0,.16); }
  .editor-card { overflow: hidden; }
  .hierarchy-pad { padding: 0 16px 16px; }
  .titlebar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--rule); background: rgba(127,127,127,.06); color: var(--muted); }
  .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
  .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
  .tab { margin-left: 10px; font-size: 12px; }
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
  .operators { margin-top: 18px; overflow: hidden; }
  .operator-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--rule); }
  .operator-grid div { background: var(--panel); padding: 14px 16px; display: grid; gap: 8px; }
  code { color: var(--op); font-weight: 800; font-size: 16px; }
  .operator-grid span { color: var(--muted); font-size: 13px; line-height: 1.45; }
  footer { display: flex; justify-content: space-between; gap: 18px; margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--rule); color: var(--muted); font-size: 12px; line-height: 1.5; }
  @media (max-width: 960px) {
    .workspace, .cheatsheet, .quick-grid { grid-template-columns: 1fr; }
    .legend { position: static; }
  }
  @media (max-width: 620px) {
    .shell { width: min(100% - 20px, 1180px); padding-top: 18px; }
    .hero { grid-template-columns: 1fr; }
    dl div { grid-template-columns: 1fr; gap: 4px; }
    .operator-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; }
  }
</style>
