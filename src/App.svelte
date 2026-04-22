<script>
  import Scope from './Scope.svelte';
  import Tok from './Tok.svelte';
  import { state, levels, colors } from './store.svelte.js';

  const codeFontStyle =
    "font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; line-height: 1.7; color: " +
    colors.ink +
    '; margin: 0; white-space: pre;';

  const kw = 'color: #8a3a2a; font-weight: 500;';
  const str = 'color: #5a6b3a;';
  const com = 'color: ' + colors.muted + '; font-style: italic;';
  const typ = 'color: #3a6b6b;';

  const NL = '\n';
  const I4 = '    ';
</script>

<div
  style:background-color={colors.paper}
  style:min-height="100vh"
  style:color={colors.ink}
  style:padding="40px 32px"
>
  <div style:max-width="1100px" style:margin="0 auto">
    <header style:border-bottom="1px solid {colors.rule}" style:padding-bottom="20px" style:margin-bottom="28px">
      <div
        style:font-family="'Fraunces', serif"
        style:font-size="10px"
        style:letter-spacing="0.3em"
        style:color={colors.muted}
        style:margin-bottom="8px"
      >
        A FIELD GUIDE
      </div>
      <h1
        style:font-family="'Fraunces', serif"
        style:font-size="42px"
        style:font-weight="500"
        style:font-style="italic"
        style:margin="0"
        style:letter-spacing="-0.02em"
      >
        The Go hierarchy
      </h1>
      <p
        style:font-family="'Fraunces', serif"
        style:font-size="15px"
        style:color={colors.muted}
        style:margin-top="10px"
        style:max-width="640px"
        style:line-height="1.5"
      >
        Every Go program nests the same way: module → package → file → declarations → bodies.
        Hover anything to trace it.
      </p>
    </header>

    <div class="grid">
      <div>
        <Scope lv="module" tagRight="go.mod">
          <pre style={codeFontStyle}><span style={com}>// go.mod</span>{NL}<span style={kw}>module</span> <Tok lv="module">github.com/alex/greeter</Tok>{NL}<span style={kw}>go</span> 1.22</pre>

          <Scope lv="pkg" tagRight="directory: greeter/">
            <pre style="{codeFontStyle} color: {colors.muted};"><span style={com}>// greeter/doc.go, greeter/greeter.go, greeter/person.go … all share:</span>{NL}<span style={kw}>package</span> <Tok lv="pkg">greeter</Tok></pre>

            <Scope lv="file" tagRight="greeter.go">
              <pre style={codeFontStyle}><span style={kw}>package</span> greeter</pre>

              <Scope lv="imp">
                <pre style={codeFontStyle}><span style={kw}>import</span> ({NL}{I4}<Tok lv="imp"><span style={str}>"fmt"</span></Tok>{NL}{I4}<Tok lv="imp"><span style={str}>"strings"</span></Tok>{NL})</pre>
              </Scope>

              <Scope lv="konst">
                <pre style={codeFontStyle}><span style={kw}>const</span> <Tok lv="konst">Greeting</Tok> = <span style={str}>"Hello"</span></pre>
              </Scope>

              <Scope lv="vvar">
                <pre style={codeFontStyle}><span style={kw}>var</span> <Tok lv="vvar">defaultName</Tok> <span style={typ}>string</span> = <span style={str}>"world"</span></pre>
              </Scope>

              <Scope lv="typ" tagRight="struct">
                <pre style={codeFontStyle}><span style={kw}>type</span> <Tok lv="typ"><span style={typ}>Person</span></Tok> <span style={kw}>struct</span> &lbrace;{NL}{I4}<Tok lv="field">Name</Tok> <span style={typ}>string</span>{NL}{I4}<Tok lv="field">Age</Tok>  <span style={typ}>int</span>{NL}&rbrace;</pre>
              </Scope>

              <Scope lv="method" tagRight="receiver: p Person">
                <pre style={codeFontStyle}><span style={kw}>func</span> (<Tok lv="param">p</Tok> <span style={typ}>Person</span>) <Tok lv="method">Hello</Tok>() <span style={typ}>string</span> &lbrace;{NL}{I4}<Tok lv="stmt"><span style={kw}>return</span> fmt.Sprintf(<span style={str}>"%s, %s"</span>, Greeting, p.Name)</Tok>{NL}&rbrace;</pre>
              </Scope>

              <Scope lv="fn">
                <pre style={codeFontStyle}><span style={kw}>func</span> <Tok lv="fn">Shout</Tok>(<Tok lv="param">s</Tok> <span style={typ}>string</span>) <span style={typ}>string</span> &lbrace;{NL}{I4}<Tok lv="stmt"><span style={kw}>return</span> strings.ToUpper(s) + <span style={str}>"!"</span></Tok>{NL}&rbrace;</pre>
              </Scope>
            </Scope>
          </Scope>
        </Scope>
      </div>

      <aside class="legend">
        <div
          style:font-family="'Fraunces', serif"
          style:font-size="10px"
          style:letter-spacing="0.3em"
          style:color={colors.muted}
          style:margin-bottom="14px"
          style:padding-bottom="10px"
          style:border-bottom="1px solid {colors.rule}"
        >
          LEGEND
        </div>
        <div style:display="flex" style:flex-direction="column" style:gap="2px">
          {#each Object.entries(levels) as [k, v] (k)}
            {@const active = state.hover === k}
            <div
              onmouseenter={() => (state.hover = k)}
              onmouseleave={() => (state.hover = null)}
              style:padding="8px 10px"
              style:border-left="3px solid {active ? v.hue : 'transparent'}"
              style:background-color={active ? v.hue + '10' : 'transparent'}
              style:transition="all 120ms ease"
              style:cursor="default"
            >
              <div
                style:font-family="'Fraunces', serif"
                style:font-size="10px"
                style:letter-spacing="0.22em"
                style:color={v.hue}
                style:font-weight="600"
              >
                {v.label}
              </div>
              {#if active}
                <div
                  style:font-family="'Fraunces', serif"
                  style:font-size="12.5px"
                  style:color={colors.ink}
                  style:margin-top="6px"
                  style:line-height="1.45"
                >
                  {v.desc}
                </div>
              {/if}
            </div>
          {/each}
        </div>
        <div
          style:margin-top="20px"
          style:padding-top="14px"
          style:border-top="1px solid {colors.rule}"
          style:font-family="'Fraunces', serif"
          style:font-size="11px"
          style:color={colors.muted}
          style:font-style="italic"
          style:line-height="1.5"
        >
          Scope tightens as you go inward. Identifiers declared in a scope are visible to everything nested below.
        </div>
      </aside>
    </div>

    <footer
      style:margin-top="48px"
      style:padding-top="18px"
      style:border-top="1px solid {colors.rule}"
      style:font-family="'Fraunces', serif"
      style:font-size="11px"
      style:color={colors.muted}
      style:letter-spacing="0.1em"
      style:display="flex"
      style:justify-content="space-between"
    >
      <span>go 1.22</span>
      <span style:font-style="italic">nest inward · export outward</span>
    </footer>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: 40px;
  }
  .legend {
    position: sticky;
    top: 24px;
    align-self: start;
  }
  @media (max-width: 820px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .legend {
      position: static;
    }
  }
</style>
