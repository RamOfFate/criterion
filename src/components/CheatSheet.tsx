import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

/* ══════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap');

    .cs-root * { box-sizing: border-box; }
    .cs-root {
      font-family: 'Outfit', sans-serif;
      background: #var(--background);
      color: #var(--foreground);
      min-height: 100vh;
      padding: 0;
    }

    /* ── Code blocks ── */
    pre.cs-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      line-height: 1.75;
      background: #var(--background);
      border: 1px solid #27272a;
      border-radius: 0px;
      padding: 16px 20px;
      overflow-x: auto;
      white-space: pre;
      color: var(--foreground);
      margin: 10px 0 14px;
    }
    pre.cs-code .kw  { color: var(--primary); }
    pre.cs-code .str { color: #86efac; }
    pre.cs-code .cmt { color: #52525b; font-style: italic; }
    pre.cs-code .typ { color: #67e8f9; }
    pre.cs-code .fn  { color: #c4b5fd; }
    pre.cs-code .num { color: #fbbf24; }

    /* ── Inline code ── */
    .cs-root code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      background: #18181b;
      color: var(--primary);
      padding: 1px 6px;
      border-radius: 0px;
      border: 1px solid #27272a;
    }

    /* ── Tables ── */
    .cs-table-wrap {
      border: 1px solid #27272a;
      border-radius: 0px;
      overflow: hidden;
      margin: 10px 0 16px;
    }
    .cs-root table { width: 100%; border-collapse: collapse; }
    .cs-root thead tr { background: #var(--background); }
    .cs-root th {
      text-align: left;
      padding: 9px 14px;
      color: var(--primary);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-bottom: 1px solid #27272a;
      font-family: 'JetBrains Mono', monospace;
    }
    .cs-root td {
      padding: 9px 14px;
      border-bottom: 1px solid #1c1c1f;
      font-size: 13px;
      vertical-align: top;
      line-height: 1.5;
    }
    .cs-root tr:last-child td { border-bottom: none; }
    .cs-root tbody tr:hover td { background: #111113; }

    /* ── Notes ── */
    .cs-note {
      background: #1a1208;
      border-left: 3px solid var(--primary);
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      color: var(--foreground);
      margin: 8px 0 14px;
    }
    .cs-tip {
      background: #071a10;
      border-left: 3px solid #4ade80;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      color: var(--foreground);
      margin: 8px 0 14px;
    }

    /* ── Section sub-headings ── */
    .cs-sh {
      color: var(--primary);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin: 20px 0 8px;
      font-family: 'JetBrains Mono', monospace;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cs-sh::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #27272a;
    }

    /* ── Body text in sections ── */
    .cs-body {
      font-size: 13.5px;
      color: var(--foreground);
      line-height: 1.6;
      margin-bottom: 10px;
    }

    /* ── Pill tags ── */
    .cs-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 0px;
      font-family: 'JetBrains Mono', monospace;
      margin-right: 4px;
    }
    .cs-tag-orange { background: #431407; color: var(--primary); border: 1px solid #7c2d12; }
    .cs-tag-blue   { background: #0c1a3a; color: #60a5fa; border: 1px solid #1e3a6e; }
    .cs-tag-green  { background: #052010; color: #4ade80; border: 1px solid #14532d; }
    .cs-tag-purple { background: #1e0938; color: #c4b5fd; border: 1px solid #4c1d95; }
    .cs-tag-cyan   { background: #061a1f; color: #67e8f9; border: 1px solid #0e7490; }

    /* ── Shadcn Tabs overrides ── */
    .cs-root [role="tablist"] {
      background: #111113 !important;
      border: 1px solid #27272a;
      padding: 4px;
      border-radius: 0px;
      gap: 2px;
    }
    .cs-root [role="tab"] {
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      font-size: 13.5px;
      color: #71717a;
      border-radius: 0px;
      transition: all 0.15s;
    }
    .cs-root [role="tab"][data-state="active"] {
      background: var(--primary) !important;
      color: #fff !important;
      font-weight: 600;
    }

    /* ── Shadcn Accordion overrides ── */
    .cs-root [data-radix-accordion-item] {
      border-color: #27272a !important;
    }
    .cs-root [data-radix-accordion-trigger] {
      font-family: 'Outfit', sans-serif;
      font-size: 14.5px;
      font-weight: 600;
      color: var(--foreground);
      padding: 16px 4px;
    }
    .cs-root [data-radix-accordion-trigger]:hover { color: var(--primary); }
    .cs-root [data-radix-accordion-content] {
      padding-bottom: 8px;
    }
  `}</style>
)

/* ══════════════════════════════════════════════════
   UTILITY COMPONENTS
══════════════════════════════════════════════════ */
const Code = ({ children }: { children: string }) => (
  <pre className="cs-code" dangerouslySetInnerHTML={{ __html: children }} />
)

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="cs-note">⚠️&nbsp; {children}</div>
)

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="cs-tip">✅&nbsp; {children}</div>
)

const SH = ({ children }: { children: string }) => (
  <div className="cs-sh">{children}</div>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="cs-body">{children}</p>
)

const Tbl = ({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) => (
  <div className="cs-table-wrap">
    <table>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const NumBadge = ({ n }: { n: number }) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      fontWeight: 700,
      background: "#1c1c1f",
      color: "var(--primary)",
      padding: "2px 7px",
      borderRadius: 6,
      border: "1px solid #27272a",
      marginRight: 4,
      flexShrink: 0,
    }}
  >
    {String(n).padStart(2, "0")}
  </span>
)

/* ══════════════════════════════════════════════════
   SECTION CONTENT — FUNDAMENTALS
══════════════════════════════════════════════════ */

const S01_CoreConcepts = () => (
  <div>
    <Body>
      React is a declarative, component-based library for building UIs. Data
      flows one-way, from parent to child via props.
    </Body>
    <Tbl
      headers={["Concept", "Description"]}
      rows={[
        ["Component", "A reusable UI building block — function or class"],
        ["Props", "Read-only data passed from parent → child"],
        ["State", "Mutable data managed inside a component"],
        ["Virtual DOM", "React's in-memory snapshot of the real DOM"],
        [
          "Reconciliation",
          "Diffing the vDOM to compute minimal real DOM updates",
        ],
        [
          "One-way data flow",
          "Data flows down via props; events flow up via callbacks",
        ],
        ["JSX", "Syntax extension that looks like HTML inside JavaScript"],
      ]}
    />
  </div>
)

const S02_JSX = () => (
  <div>
    <SH>Rules</SH>
    <Body>
      Use <code>className</code> (not <code>class</code>), <code>htmlFor</code>{" "}
      (not <code>for</code>). All tags must close. Return one root element.
    </Body>
    <Code>{`<span class="kw">const</span> el = (
  <span class="typ">&lt;div</span> className=<span class="str">"card"</span><span class="typ">&gt;</span>
    <span class="typ">&lt;h1&gt;</span>Hello, <span class="kw">{</span>name.toUpperCase()<span class="kw">}</span><span class="typ">&lt;/h1&gt;</span>
    <span class="kw">{</span>isAdmin <span class="kw">?</span> <span class="typ">&lt;AdminBadge /&gt;</span> <span class="kw">:</span> <span class="kw">null</span><span class="kw">}</span>
    <span class="typ">&lt;br /&gt;</span>  <span class="cmt">// self-closing required</span>
  <span class="typ">&lt;/div&gt;</span>
);`}</Code>

    <SH>Fragments</SH>
    <Code>{`<span class="cmt">// Long form</span>
<span class="typ">&lt;React.Fragment&gt;</span><span class="typ">&lt;h1 /&gt;</span><span class="typ">&lt;p /&gt;</span><span class="typ">&lt;/React.Fragment&gt;</span>

<span class="cmt">// Short form (preferred)</span>
<span class="typ">&lt;&gt;</span><span class="typ">&lt;h1 /&gt;</span><span class="typ">&lt;p /&gt;</span><span class="typ">&lt;/&gt;</span>`}</Code>

    <SH>Expressions & Spread</SH>
    <Code>{`<span class="cmt">// Inline style — double braces: outer = JSX expr, inner = object</span>
<span class="typ">&lt;div</span> style=<span class="kw">{{</span> color: <span class="str">'red'</span>, fontSize: <span class="num">16</span> <span class="kw">}}</span><span class="typ">&gt;</span>Styled<span class="typ">&lt;/div&gt;</span>

<span class="cmt">// Spread props</span>
<span class="kw">const</span> props = <span class="kw">{</span> id: <span class="str">'box'</span>, className: <span class="str">'container'</span> <span class="kw">}</span>;
<span class="typ">&lt;div</span> <span class="kw">{...props}</span><span class="typ">&gt;</span>Content<span class="typ">&lt;/div&gt;</span>`}</Code>

    <Note>
      Avoid <code>{`count && <Comp />`}</code> — if <code>count</code> is{" "}
      <code>0</code>, React renders the number <code>0</code>. Use{" "}
      <code>{`count > 0 && <Comp />`}</code>.
    </Note>
  </div>
)

const S03_Components = () => (
  <div>
    <SH>Function Component</SH>
    <Code>{`<span class="cmt">// Declaration</span>
<span class="kw">function</span> <span class="fn">Greeting</span>(<span class="kw">{</span> name <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">return</span> <span class="typ">&lt;h1&gt;</span>Hello, <span class="kw">{</span>name<span class="kw">}</span>!<span class="typ">&lt;/h1&gt;</span>;
<span class="kw">}</span>

<span class="cmt">// Arrow function</span>
<span class="kw">const</span> <span class="fn">Greeting</span> = (<span class="kw">{</span> name <span class="kw">}</span>) =&gt; <span class="typ">&lt;h1&gt;</span>Hello, <span class="kw">{</span>name<span class="kw">}</span>!<span class="typ">&lt;/h1&gt;</span>;`}</Code>

    <SH>Class Component</SH>
    <Code>{`<span class="kw">class</span> <span class="typ">Greeting</span> <span class="kw">extends</span> <span class="typ">Component</span> <span class="kw">{</span>
  <span class="fn">render</span>() <span class="kw">{</span>
    <span class="kw">return</span> <span class="typ">&lt;h1&gt;</span>Hello, <span class="kw">{</span><span class="kw">this</span>.props.name<span class="kw">}</span>!<span class="typ">&lt;/h1&gt;</span>;
  <span class="kw">}</span>
<span class="kw">}</span>`}</Code>

    <SH>Exports</SH>
    <Code>{`<span class="cmt">// Default (one per file)</span>
<span class="kw">export default function</span> <span class="fn">App</span>() <span class="kw">{</span> ... <span class="kw">}</span>
<span class="kw">import</span> App <span class="kw">from</span> <span class="str">'./App'</span>;

<span class="cmt">// Named (multiple per file)</span>
<span class="kw">export function</span> <span class="fn">Button</span>() <span class="kw">{</span> ... <span class="kw">}</span>
<span class="kw">import</span> <span class="kw">{</span> Button <span class="kw">}</span> <span class="kw">from</span> <span class="str">'./Button'</span>;`}</Code>
  </div>
)

const S04_Props = () => (
  <div>
    <SH>Passing & Receiving</SH>
    <Code>{`<span class="cmt">// Parent passes props</span>
<span class="typ">&lt;UserCard</span> name=<span class="str">"Alice"</span> age=<span class="kw">{</span><span class="num">30</span><span class="kw">}</span> isAdmin=<span class="kw">{</span><span class="kw">true</span><span class="kw">}</span> <span class="typ">/&gt;</span>

<span class="cmt">// Child receives via destructuring</span>
<span class="kw">function</span> <span class="fn">UserCard</span>(<span class="kw">{</span> name, age, isAdmin <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">return</span> <span class="typ">&lt;p&gt;</span><span class="kw">{</span>name<span class="kw">}</span> – <span class="kw">{</span>age<span class="kw">}</span> <span class="kw">{</span>isAdmin <span class="kw">&&</span> <span class="str">"(Admin)"</span><span class="kw">}</span><span class="typ">&lt;/p&gt;</span>;
<span class="kw">}</span>`}</Code>

    <SH>Default Props</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">Button</span>(<span class="kw">{</span> label = <span class="str">"Click me"</span>, color = <span class="str">"blue"</span> <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">return</span> <span class="typ">&lt;button</span> style=<span class="kw">{{</span> background: color <span class="kw">}}</span><span class="typ">&gt;</span><span class="kw">{</span>label<span class="kw">}</span><span class="typ">&lt;/button&gt;</span>;
<span class="kw">}</span>`}</Code>

    <SH>Children Prop</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">Card</span>(<span class="kw">{</span> title, children <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">return</span> (
    <span class="typ">&lt;div</span> className=<span class="str">"card"</span><span class="typ">&gt;</span>
      <span class="typ">&lt;h2&gt;</span><span class="kw">{</span>title<span class="kw">}</span><span class="typ">&lt;/h2&gt;</span>
      <span class="kw">{</span>children<span class="kw">}</span>
    <span class="typ">&lt;/div&gt;</span>
  );
<span class="kw">}</span>

<span class="cmt">// Usage</span>
<span class="typ">&lt;Card</span> title=<span class="str">"Info"</span><span class="typ">&gt;</span>
  <span class="typ">&lt;p&gt;</span>Any JSX goes here.<span class="typ">&lt;/p&gt;</span>
<span class="typ">&lt;/Card&gt;</span>`}</Code>

    <SH>PropTypes (Runtime Validation)</SH>
    <Code>{`<span class="kw">import</span> PropTypes <span class="kw">from</span> <span class="str">'prop-types'</span>;

Button.propTypes = <span class="kw">{</span>
  label:   PropTypes.string.isRequired,
  onClick: PropTypes.func,
  count:   PropTypes.number,
  items:   PropTypes.arrayOf(PropTypes.string),
  user:    PropTypes.shape(<span class="kw">{</span> id: PropTypes.number, name: PropTypes.string <span class="kw">}</span>),
  status:  PropTypes.oneOf([<span class="str">'active'</span>, <span class="str">'inactive'</span>]),
<span class="kw">}</span>;`}</Code>
  </div>
)

const S05_State = () => (
  <div>
    <SH>useState Basics</SH>
    <Code>{`<span class="kw">const</span> [count, setCount] = useState(<span class="num">0</span>);

<span class="cmt">// Direct update</span>
setCount(count + <span class="num">1</span>);

<span class="cmt">// Functional update — always use when next state depends on prev</span>
setCount(prev =&gt; prev + <span class="num">1</span>);

<span class="cmt">// Lazy initializer — runs only on mount</span>
<span class="kw">const</span> [data, setData] = useState(() =&gt; <span class="fn">expensiveCompute</span>());`}</Code>

    <SH>Object State</SH>
    <Code>{`<span class="kw">const</span> [user, setUser] = useState(<span class="kw">{</span> name: <span class="str">'Alice'</span>, age: <span class="num">25</span> <span class="kw">}</span>);

<span class="cmt">// ✅ Always spread — never mutate directly</span>
setUser(prev =&gt; (<span class="kw">{</span> ...prev, age: <span class="num">26</span> <span class="kw">}</span>));`}</Code>

    <SH>Array State</SH>
    <Code>{`<span class="kw">const</span> [items, setItems] = useState([]);

setItems(prev =&gt; [...prev, newItem]);                        <span class="cmt">// Add</span>
setItems(prev =&gt; prev.filter(i =&gt; i.id !== id));            <span class="cmt">// Remove</span>
setItems(prev =&gt; prev.map(i =&gt; i.id === id ? <span class="kw">{</span>...i, ...updates<span class="kw">}</span> : i)); <span class="cmt">// Update</span>`}</Code>
  </div>
)

/* ══════════════════════════════════════════════════
   SECTION CONTENT — HOOKS
══════════════════════════════════════════════════ */

const S06_BuiltinHooks = () => (
  <div>
    <SH>useEffect</SH>
    <Code>{`useEffect(() =&gt; <span class="kw">{</span> doSomething(); <span class="kw">}</span>);               <span class="cmt">// every render</span>
useEffect(() =&gt; <span class="kw">{</span> fetchData(); <span class="kw">}</span>, []);              <span class="cmt">// mount only</span>
useEffect(() =&gt; <span class="kw">{</span> fetchUser(id); <span class="kw">}</span>, [id]);          <span class="cmt">// when id changes</span>

<span class="cmt">// Cleanup — runs on unmount / before next effect</span>
useEffect(() =&gt; <span class="kw">{</span>
  <span class="kw">const</span> sub = <span class="fn">subscribe</span>(id);
  <span class="kw">return</span> () =&gt; sub.<span class="fn">unsubscribe</span>();
<span class="kw">}</span>, [id]);`}</Code>

    <SH>useReducer</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">reducer</span>(state, action) <span class="kw">{</span>
  <span class="kw">switch</span> (action.type) <span class="kw">{</span>
    <span class="kw">case</span> <span class="str">'inc'</span>:   <span class="kw">return</span> <span class="kw">{</span> count: state.count + <span class="num">1</span> <span class="kw">}</span>;
    <span class="kw">case</span> <span class="str">'dec'</span>:   <span class="kw">return</span> <span class="kw">{</span> count: state.count - <span class="num">1</span> <span class="kw">}</span>;
    <span class="kw">default</span>: <span class="kw">throw new</span> Error(<span class="str">'Unknown action'</span>);
  <span class="kw">}</span>
<span class="kw">}</span>

<span class="kw">const</span> [state, dispatch] = useReducer(reducer, <span class="kw">{</span> count: <span class="num">0</span> <span class="kw">}</span>);
dispatch(<span class="kw">{</span> type: <span class="str">'inc'</span> <span class="kw">}</span>);`}</Code>

    <SH>useRef</SH>
    <Code>{`<span class="cmt">// DOM reference</span>
<span class="kw">const</span> inputRef = useRef(<span class="kw">null</span>);
<span class="typ">&lt;input</span> ref=<span class="kw">{</span>inputRef<span class="kw">}</span> <span class="typ">/&gt;</span>
inputRef.current.<span class="fn">focus</span>();

<span class="cmt">// Mutable value — changes don't trigger re-render</span>
<span class="kw">const</span> renderCount = useRef(<span class="num">0</span>);
renderCount.current += <span class="num">1</span>;`}</Code>

    <SH>useMemo & useCallback</SH>
    <Code>{`<span class="cmt">// Memoize expensive computation</span>
<span class="kw">const</span> sorted = useMemo(
  () =&gt; [...items].sort((a, b) =&gt; a.name.localeCompare(b.name)),
  [items]
);

<span class="cmt">// Stable function reference</span>
<span class="kw">const</span> handleClick = useCallback(() =&gt; <span class="fn">doSomething</span>(id), [id]);`}</Code>

    <SH>React 18 Hooks</SH>
    <Code>{`<span class="cmt">// useId — stable unique ID for accessibility</span>
<span class="kw">const</span> id = useId();
<span class="typ">&lt;label</span> htmlFor=<span class="kw">{</span>id<span class="kw">}</span><span class="typ">&gt;</span>Name<span class="typ">&lt;/label&gt;</span> <span class="typ">&lt;input</span> id=<span class="kw">{</span>id<span class="kw">}</span> <span class="typ">/&gt;</span>

<span class="cmt">// useTransition — mark update as non-urgent</span>
<span class="kw">const</span> [isPending, startTransition] = useTransition();
<span class="fn">startTransition</span>(() =&gt; <span class="fn">setFilteredList</span>(<span class="fn">heavyFilter</span>(items)));
<span class="kw">return</span> isPending ? <span class="typ">&lt;Spinner /&gt;</span> : <span class="typ">&lt;List items=</span><span class="kw">{</span>filteredList<span class="kw">}</span> <span class="typ">/&gt;</span>;

<span class="cmt">// useDeferredValue — lag behind an input</span>
<span class="kw">const</span> deferred = useDeferredValue(query);`}</Code>

    <SH>Quick Reference</SH>
    <Tbl
      headers={["Hook", "When to Use"]}
      rows={[
        ["useState", "Local UI state"],
        ["useReducer", "Complex state with multiple actions"],
        ["useEffect", "Side effects (fetch, subscriptions, timers)"],
        ["useMemo", "Expensive computations"],
        ["useCallback", "Stable function refs for memoized children"],
        ["useRef", "DOM access or mutable value without re-render"],
        ["useContext", "Shared data without prop drilling"],
        ["useTransition", "Non-urgent state updates (React 18)"],
        ["useDeferredValue", "Debounce-like deferred rendering (React 18)"],
      ]}
    />
  </div>
)

const S15_CustomHooks = () => (
  <div>
    <Body>
      Custom hooks are functions starting with <code>use</code> that encapsulate
      reusable stateful logic.
    </Body>

    <SH>useFetch</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">useFetch</span>&lt;<span class="typ">T</span>&gt;(url: <span class="typ">string</span>) <span class="kw">{</span>
  <span class="kw">const</span> [data,    setData]    = useState&lt;<span class="typ">T | null</span>&gt;(<span class="kw">null</span>);
  <span class="kw">const</span> [loading, setLoading] = useState(<span class="kw">true</span>);
  <span class="kw">const</span> [error,   setError]   = useState&lt;<span class="typ">string | null</span>&gt;(<span class="kw">null</span>);

  useEffect(() =&gt; <span class="kw">{</span>
    <span class="kw">let</span> cancelled = <span class="kw">false</span>;
    setLoading(<span class="kw">true</span>);
    fetch(url)
      .then(r =&gt; r.json())
      .then(d  =&gt; <span class="kw">{</span> <span class="kw">if</span> (!cancelled) setData(d); <span class="kw">}</span>)
      .catch(e  =&gt; <span class="kw">{</span> <span class="kw">if</span> (!cancelled) setError(e.message); <span class="kw">}</span>)
      .finally(()  =&gt; <span class="kw">{</span> <span class="kw">if</span> (!cancelled) setLoading(<span class="kw">false</span>); <span class="kw">}</span>);
    <span class="kw">return</span> () =&gt; <span class="kw">{</span> cancelled = <span class="kw">true</span>; <span class="kw">}</span>;
  <span class="kw">}</span>, [url]);

  <span class="kw">return</span> <span class="kw">{</span> data, loading, error <span class="kw">}</span>;
<span class="kw">}</span>`}</Code>

    <SH>useDebounce</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">useDebounce</span>&lt;<span class="typ">T</span>&gt;(value: <span class="typ">T</span>, delay = <span class="num">300</span>): <span class="typ">T</span> <span class="kw">{</span>
  <span class="kw">const</span> [debounced, setDebounced] = useState(value);
  useEffect(() =&gt; <span class="kw">{</span>
    <span class="kw">const</span> t = setTimeout(() =&gt; setDebounced(value), delay);
    <span class="kw">return</span> () =&gt; clearTimeout(t);
  <span class="kw">}</span>, [value, delay]);
  <span class="kw">return</span> debounced;
<span class="kw">}</span>`}</Code>

    <SH>useLocalStorage</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">useLocalStorage</span>&lt;<span class="typ">T</span>&gt;(key: <span class="typ">string</span>, initial: <span class="typ">T</span>) <span class="kw">{</span>
  <span class="kw">const</span> [val, setVal] = useState&lt;<span class="typ">T</span>&gt;(() =&gt; <span class="kw">{</span>
    <span class="kw">try</span> <span class="kw">{</span>
      <span class="kw">const</span> item = localStorage.getItem(key);
      <span class="kw">return</span> item ? JSON.parse(item) : initial;
    <span class="kw">}</span> <span class="kw">catch</span> <span class="kw">{</span> <span class="kw">return</span> initial; <span class="kw">}</span>
  <span class="kw">}</span>);
  <span class="kw">const</span> <span class="fn">store</span> = (v: <span class="typ">T</span>) =&gt; <span class="kw">{</span>
    setVal(v);
    localStorage.setItem(key, JSON.stringify(v));
  <span class="kw">}</span>;
  <span class="kw">return</span> [val, store] <span class="kw">as const</span>;
<span class="kw">}</span>`}</Code>

    <SH>useOnClickOutside</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">useOnClickOutside</span>(ref: <span class="typ">RefObject&lt;HTMLElement&gt;</span>, handler: <span class="typ">() =&gt; void</span>) <span class="kw">{</span>
  useEffect(() =&gt; <span class="kw">{</span>
    <span class="kw">const</span> <span class="fn">listener</span> = (e: <span class="typ">MouseEvent</span>) =&gt; <span class="kw">{</span>
      <span class="kw">if</span> (!ref.current || ref.current.contains(e.target <span class="kw">as</span> <span class="typ">Node</span>)) <span class="kw">return</span>;
      <span class="fn">handler</span>();
    <span class="kw">}</span>;
    document.addEventListener(<span class="str">'mousedown'</span>, listener);
    <span class="kw">return</span> () =&gt; document.removeEventListener(<span class="str">'mousedown'</span>, listener);
  <span class="kw">}</span>, [ref, handler]);
<span class="kw">}</span>`}</Code>
  </div>
)

/* ══════════════════════════════════════════════════
   SECTION CONTENT — UI PATTERNS
══════════════════════════════════════════════════ */

const S07_Events = () => (
  <div>
    <SH>Basic Event Handler</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">Button</span>() <span class="kw">{</span>
  <span class="kw">const</span> <span class="fn">handleClick</span> = (e: <span class="typ">React.MouseEvent&lt;HTMLButtonElement&gt;</span>) =&gt; <span class="kw">{</span>
    e.<span class="fn">preventDefault</span>();
    console.log(<span class="str">'clicked'</span>, e.target);
  <span class="kw">}</span>;
  <span class="kw">return</span> <span class="typ">&lt;button</span> onClick=<span class="kw">{</span>handleClick<span class="kw">}</span><span class="typ">&gt;</span>Click<span class="typ">&lt;/button&gt;</span>;
<span class="kw">}</span>

<span class="cmt">// Passing arguments</span>
<span class="typ">&lt;button</span> onClick=<span class="kw">{</span>() =&gt; <span class="fn">handleDelete</span>(item.id)<span class="kw">}</span><span class="typ">&gt;</span>Delete<span class="typ">&lt;/button&gt;</span>`}</Code>

    <SH>Common Events</SH>
    <Tbl
      headers={["Event", "Trigger"]}
      rows={[
        ["onClick / onDoubleClick", "Mouse click"],
        ["onChange", "Input / select value change"],
        ["onSubmit", "Form submission"],
        ["onKeyDown / onKeyUp", "Keyboard key pressed/released"],
        ["onFocus / onBlur", "Element gains/loses focus"],
        ["onMouseEnter / onMouseLeave", "Mouse enters/leaves element"],
        ["onScroll", "Element or window scrolled"],
        ["onDragStart / onDrop", "Drag and drop events"],
      ]}
    />

    <SH>SyntheticEvent Methods</SH>
    <Code>{`e.<span class="fn">preventDefault</span>();     <span class="cmt">// prevent default browser behavior</span>
e.<span class="fn">stopPropagation</span>();    <span class="cmt">// stop event bubbling</span>
e.target               <span class="cmt">// element that triggered the event</span>
e.currentTarget        <span class="cmt">// element the handler is attached to</span>
e.nativeEvent          <span class="cmt">// underlying native browser event</span>`}</Code>
  </div>
)

const S08_Conditional = () => (
  <div>
    <SH>Patterns</SH>
    <Code>{`<span class="cmt">// Early return</span>
<span class="kw">if</span> (!isLoggedIn) <span class="kw">return</span> <span class="typ">&lt;Login /&gt;</span>;
<span class="kw">return</span> <span class="typ">&lt;Dashboard /&gt;</span>;

<span class="cmt">// Ternary</span>
<span class="kw">return</span> isLoggedIn ? <span class="typ">&lt;Dashboard /&gt;</span> : <span class="typ">&lt;Login /&gt;</span>;

<span class="cmt">// Logical AND (short-circuit)</span>
<span class="kw">return</span> <span class="kw">{</span>count &gt; <span class="num">0</span> <span class="kw">&&</span> <span class="typ">&lt;Badge count=</span><span class="kw">{</span>count<span class="kw">}</span> <span class="typ">/&gt;</span><span class="kw">}</span>;

<span class="cmt">// Object map (switch-like)</span>
<span class="kw">const</span> views = <span class="kw">{</span> home: <span class="typ">&lt;Home /&gt;</span>, about: <span class="typ">&lt;About /&gt;</span>, contact: <span class="typ">&lt;Contact /&gt;</span> <span class="kw">}</span>;
<span class="kw">return</span> views[currentView] ?? <span class="typ">&lt;NotFound /&gt;</span>;`}</Code>
    <Note>
      Never use <code>{`count && <Comp />`}</code> — renders <code>0</code> when
      count is falsy. Use <code>{`count > 0 && <Comp />`}</code>.
    </Note>
  </div>
)

const S09_Lists = () => (
  <div>
    <SH>Rendering Lists</SH>
    <Code>{`<span class="kw">const</span> users = [<span class="kw">{</span> id: <span class="num">1</span>, name: <span class="str">'Alice'</span> <span class="kw">}</span>, <span class="kw">{</span> id: <span class="num">2</span>, name: <span class="str">'Bob'</span> <span class="kw">}</span>];

<span class="kw">return</span> (
  <span class="typ">&lt;ul&gt;</span>
    <span class="kw">{</span>users.map(user =&gt; (
      <span class="typ">&lt;UserRow</span> key=<span class="kw">{</span>user.id<span class="kw">}</span> <span class="kw">{...user}</span> <span class="typ">/&gt;</span>   <span class="cmt">// key is required</span>
    ))<span class="kw">}</span>
  <span class="typ">&lt;/ul&gt;</span>
);`}</Code>

    <SH>Key Rules</SH>
    <Tbl
      headers={["Rule", "Detail"]}
      rows={[
        [
          "Must be unique among siblings",
          "Not globally unique — sibling-scope only",
        ],
        ["Use stable IDs from data", "db IDs, slugs, UUIDs — not array index"],
        [
          "Index as key is OK only if…",
          "List is static, never reordered, never filtered",
        ],
        ["Keys are not props", "Cannot read key inside the child component"],
      ]}
    />
  </div>
)

const S10_Forms = () => (
  <div>
    <SH>Controlled Multi-field Form</SH>
    <Code>{`<span class="kw">function</span> <span class="fn">SignupForm</span>() <span class="kw">{</span>
  <span class="kw">const</span> [form, setForm] = useState(<span class="kw">{</span> email: <span class="str">''</span>, password: <span class="str">''</span> <span class="kw">}</span>);

  <span class="kw">const</span> <span class="fn">handleChange</span> = (e: <span class="typ">React.ChangeEvent&lt;HTMLInputElement&gt;</span>) =&gt; <span class="kw">{</span>
    <span class="kw">const</span> <span class="kw">{</span> name, value <span class="kw">}</span> = e.target;
    setForm(prev =&gt; (<span class="kw">{</span> ...prev, [name]: value <span class="kw">}</span>));
  <span class="kw">}</span>;

  <span class="kw">return</span> (
    <span class="typ">&lt;form</span> onSubmit=<span class="kw">{</span>e =&gt; <span class="kw">{</span> e.preventDefault(); console.log(form); <span class="kw">}</span><span class="kw">}</span><span class="typ">&gt;</span>
      <span class="typ">&lt;input</span> name=<span class="str">"email"</span>    value=<span class="kw">{</span>form.email<span class="kw">}</span>    onChange=<span class="kw">{</span>handleChange<span class="kw">}</span> <span class="typ">/&gt;</span>
      <span class="typ">&lt;input</span> name=<span class="str">"password"</span> value=<span class="kw">{</span>form.password<span class="kw">}</span> onChange=<span class="kw">{</span>handleChange<span class="kw">}</span> type=<span class="str">"password"</span> <span class="typ">/&gt;</span>
      <span class="typ">&lt;button</span> type=<span class="str">"submit"</span><span class="typ">&gt;</span>Sign Up<span class="typ">&lt;/button&gt;</span>
    <span class="typ">&lt;/form&gt;</span>
  );
<span class="kw">}</span>`}</Code>

    <SH>Checkbox, Radio & Select</SH>
    <Code>{`<span class="cmt">// Checkbox</span>
<span class="typ">&lt;input</span> type=<span class="str">"checkbox"</span> checked=<span class="kw">{</span>checked<span class="kw">}</span> onChange=<span class="kw">{</span>e =&gt; setChecked(e.target.checked)<span class="kw">}</span> <span class="typ">/&gt;</span>

<span class="cmt">// Radio</span>
<span class="typ">&lt;input</span> type=<span class="str">"radio"</span> value=<span class="str">"a"</span> checked=<span class="kw">{</span>sel === <span class="str">'a'</span><span class="kw">}</span> onChange=<span class="kw">{</span>e =&gt; setSel(e.target.value)<span class="kw">}</span> <span class="typ">/&gt;</span>

<span class="cmt">// Select</span>
<span class="typ">&lt;select</span> value=<span class="kw">{</span>selected<span class="kw">}</span> onChange=<span class="kw">{</span>e =&gt; setSelected(e.target.value)<span class="kw">}</span><span class="typ">&gt;</span>
  <span class="typ">&lt;option</span> value=<span class="str">"red"</span><span class="typ">&gt;</span>Red<span class="typ">&lt;/option&gt;</span>
  <span class="typ">&lt;option</span> value=<span class="str">"blue"</span><span class="typ">&gt;</span>Blue<span class="typ">&lt;/option&gt;</span>
<span class="typ">&lt;/select&gt;</span>`}</Code>

    <SH>Uncontrolled (useRef)</SH>
    <Code>{`<span class="kw">const</span> inputRef = useRef&lt;<span class="typ">HTMLInputElement</span>&gt;();
<span class="typ">&lt;input</span> ref=<span class="kw">{</span>inputRef<span class="kw">}</span> defaultValue=<span class="str">"initial"</span> <span class="typ">/&gt;</span>
<span class="cmt">// Read on submit: inputRef.current.value</span>`}</Code>
  </div>
)

const S11_Refs = () => (
  <div>
    <SH>DOM Ref</SH>
    <Code>{`<span class="kw">const</span> divRef = useRef&lt;<span class="typ">HTMLDivElement</span>&gt;(<span class="kw">null</span>);

useEffect(() =&gt; <span class="kw">{</span>
  console.log(divRef.current.offsetWidth);
<span class="kw">}</span>, []);

<span class="kw">return</span> <span class="typ">&lt;div</span> ref=<span class="kw">{</span>divRef<span class="kw">}</span><span class="typ">&gt;</span>Measured<span class="typ">&lt;/div&gt;</span>;`}</Code>

    <SH>forwardRef</SH>
    <Code>{`<span class="kw">const</span> Input = forwardRef&lt;<span class="typ">HTMLInputElement</span>, <span class="typ">InputProps</span>&gt;(
  (<span class="kw">{</span> label, ...props <span class="kw">}</span>, ref) =&gt; (
    <span class="typ">&lt;label&gt;</span>
      <span class="kw">{</span>label<span class="kw">}</span>
      <span class="typ">&lt;input</span> ref=<span class="kw">{</span>ref<span class="kw">}</span> <span class="kw">{...props}</span> <span class="typ">/&gt;</span>
    <span class="typ">&lt;/label&gt;</span>
  )
);

<span class="cmt">// Parent can now call inputRef.current.focus()</span>`}</Code>

    <SH>useImperativeHandle</SH>
    <Code>{`<span class="kw">const</span> FancyInput = forwardRef((props, ref) =&gt; <span class="kw">{</span>
  <span class="kw">const</span> inputRef = useRef();
  useImperativeHandle(ref, () =&gt; (<span class="kw">{</span>
    focus: () =&gt; inputRef.current.focus(),
    clear: () =&gt; <span class="kw">{</span> inputRef.current.value = <span class="str">''</span>; <span class="kw">}</span>,
  <span class="kw">}</span>));
  <span class="kw">return</span> <span class="typ">&lt;input</span> ref=<span class="kw">{</span>inputRef<span class="kw">}</span> <span class="typ">/&gt;</span>;
<span class="kw">}</span>);`}</Code>
  </div>
)

/* ══════════════════════════════════════════════════
   SECTION CONTENT — ADVANCED
══════════════════════════════════════════════════ */

const S12_Context = () => (
  <div>
    <SH>Create, Provide & Consume</SH>
    <Code>{`<span class="kw">const</span> ThemeContext = createContext(<span class="str">'light'</span>);

<span class="kw">function</span> <span class="fn">App</span>() <span class="kw">{</span>
  <span class="kw">const</span> [theme, setTheme] = useState(<span class="str">'dark'</span>);
  <span class="kw">return</span> (
    <span class="typ">&lt;ThemeContext.Provider</span> value=<span class="kw">{{</span> theme, setTheme <span class="kw">}}</span><span class="typ">&gt;</span>
      <span class="typ">&lt;Page /&gt;</span>
    <span class="typ">&lt;/ThemeContext.Provider&gt;</span>
  );
<span class="kw">}</span>

<span class="kw">function</span> <span class="fn">ThemedButton</span>() <span class="kw">{</span>
  <span class="kw">const</span> <span class="kw">{</span> theme, setTheme <span class="kw">}</span> = useContext(ThemeContext);
  <span class="kw">return</span> <span class="typ">&lt;button</span> onClick=<span class="kw">{</span>() =&gt; setTheme(t =&gt; t === <span class="str">'dark'</span> ? <span class="str">'light'</span> : <span class="str">'dark'</span>)<span class="kw">}</span><span class="typ">&gt;</span>Toggle<span class="typ">&lt;/button&gt;</span>;
<span class="kw">}</span>`}</Code>

    <SH>Custom Hook Pattern (Recommended)</SH>
    <Code>{`<span class="kw">const</span> AuthContext = createContext&lt;<span class="typ">AuthCtx | null</span>&gt;(<span class="kw">null</span>);

<span class="kw">export function</span> <span class="fn">AuthProvider</span>(<span class="kw">{</span> children <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">const</span> [user, setUser] = useState(<span class="kw">null</span>);
  <span class="kw">return</span> <span class="typ">&lt;AuthContext.Provider</span> value=<span class="kw">{{</span> user, setUser <span class="kw">}}</span><span class="typ">&gt;</span><span class="kw">{</span>children<span class="kw">}</span><span class="typ">&lt;/AuthContext.Provider&gt;</span>;
<span class="kw">}</span>

<span class="kw">export function</span> <span class="fn">useAuth</span>() <span class="kw">{</span>
  <span class="kw">const</span> ctx = useContext(AuthContext);
  <span class="kw">if</span> (!ctx) <span class="kw">throw new</span> Error(<span class="str">'useAuth must be inside AuthProvider'</span>);
  <span class="kw">return</span> ctx;
<span class="kw">}</span>`}</Code>
  </div>
)

const S13_Lifecycle = () => (
  <div>
    <SH>Class Lifecycle Methods</SH>
    <Tbl
      headers={["Phase", "Method", "Purpose"]}
      rows={[
        ["Mount", "constructor()", "Initialize state, bind methods"],
        ["Mount", "render()", "Return JSX"],
        ["Mount", "componentDidMount()", "Fetch data, add listeners"],
        ["Update", "shouldComponentUpdate()", "Return false to skip render"],
        ["Update", "componentDidUpdate(prev)", "React to prop/state changes"],
        ["Unmount", "componentWillUnmount()", "Cleanup timers, subscriptions"],
        ["Error", "getDerivedStateFromError()", "Render fallback UI"],
        ["Error", "componentDidCatch()", "Log error to service"],
      ]}
    />

    <SH>Functional Equivalents</SH>
    <Code>{`componentDidMount    <span class="cmt">→</span> useEffect(() =&gt; <span class="kw">{</span> ... <span class="kw">}</span>, [])
componentDidUpdate  <span class="cmt">→</span> useEffect(() =&gt; <span class="kw">{</span> ... <span class="kw">}</span>, [dep])
componentWillUnmount <span class="cmt">→</span> useEffect(() =&gt; <span class="kw">{</span> <span class="kw">return</span> () =&gt; cleanup(); <span class="kw">}</span>, [])
shouldComponentUpdate <span class="cmt">→</span> React.memo + useMemo / useCallback`}</Code>
  </div>
)

const S14_Performance = () => (
  <div>
    <SH>React.memo</SH>
    <Code>{`<span class="cmt">// Skips re-render if props haven't changed (shallow compare)</span>
<span class="kw">const</span> UserCard = React.memo(<span class="kw">function</span> <span class="fn">UserCard</span>(<span class="kw">{</span> user <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">return</span> <span class="typ">&lt;p&gt;</span><span class="kw">{</span>user.name<span class="kw">}</span><span class="typ">&lt;/p&gt;</span>;
<span class="kw">}</span>);

<span class="cmt">// Custom comparator</span>
<span class="kw">const</span> UserCard = React.memo(UserCard, (prev, next) =&gt; prev.user.id === next.user.id);`}</Code>

    <SH>Code Splitting (lazy + Suspense)</SH>
    <Code>{`<span class="kw">const</span> Dashboard = lazy(() =&gt; import(<span class="str">'./Dashboard'</span>));

<span class="typ">&lt;Suspense</span> fallback=<span class="kw">{</span><span class="typ">&lt;Spinner /&gt;</span><span class="kw">}</span><span class="typ">&gt;</span>
  <span class="typ">&lt;Dashboard /&gt;</span>
<span class="typ">&lt;/Suspense&gt;</span>`}</Code>

    <SH>Virtualization (react-window)</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> FixedSizeList <span class="kw">}</span> <span class="kw">from</span> <span class="str">'react-window'</span>;

<span class="typ">&lt;FixedSizeList</span> height=<span class="kw">{</span><span class="num">600</span><span class="kw">}</span> itemCount=<span class="kw">{</span><span class="num">10000</span><span class="kw">}</span> itemSize=<span class="kw">{</span><span class="num">35</span><span class="kw">}</span><span class="typ">&gt;</span>
  <span class="kw">{</span>(<span class="kw">{</span> index, style <span class="kw">}</span>) =&gt; <span class="typ">&lt;div</span> style=<span class="kw">{</span>style<span class="kw">}</span><span class="typ">&gt;</span>Row <span class="kw">{</span>index<span class="kw">}</span><span class="typ">&lt;/div&gt;</span><span class="kw">}</span>
<span class="typ">&lt;/FixedSizeList&gt;</span>`}</Code>

    <Tip>
      Avoid creating new objects/arrays inline during render — they break
      memoization. Move them outside the component or wrap in{" "}
      <code>useMemo</code>.
    </Tip>
  </div>
)

const S16_HOC = () => (
  <div>
    <Body>
      Higher-Order Components are functions that take a component and return an
      enhanced version.
    </Body>
    <Code>{`<span class="kw">function</span> <span class="fn">withAuth</span>(WrappedComponent: <span class="typ">ComponentType</span>) <span class="kw">{</span>
  <span class="kw">return function</span> <span class="fn">Protected</span>(props: <span class="typ">any</span>) <span class="kw">{</span>
    <span class="kw">const</span> <span class="kw">{</span> isLoggedIn <span class="kw">}</span> = useAuth();
    <span class="kw">if</span> (!isLoggedIn) <span class="kw">return</span> <span class="typ">&lt;Redirect</span> to=<span class="str">"/login"</span> <span class="typ">/&gt;</span>;
    <span class="kw">return</span> <span class="typ">&lt;WrappedComponent</span> <span class="kw">{...props}</span> <span class="typ">/&gt;</span>;  <span class="cmt">// always spread props through</span>
  <span class="kw">}</span>;
<span class="kw">}</span>

<span class="kw">const</span> ProtectedDashboard = withAuth(Dashboard);`}</Code>
    <Note>
      Modern React prefers custom hooks over HOCs. Use HOCs mainly for
      cross-cutting concerns like auth, analytics, or error boundaries.
    </Note>
  </div>
)

const S17_RenderProps = () => (
  <div>
    <Code>{`<span class="kw">function</span> <span class="fn">MouseTracker</span>(<span class="kw">{</span> render <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">const</span> [pos, setPos] = useState(<span class="kw">{</span> x: <span class="num">0</span>, y: <span class="num">0</span> <span class="kw">}</span>);
  <span class="kw">return</span> (
    <span class="typ">&lt;div</span> onMouseMove=<span class="kw">{</span>e =&gt; setPos(<span class="kw">{</span> x: e.clientX, y: e.clientY <span class="kw">}</span>)<span class="kw">}</span><span class="typ">&gt;</span>
      <span class="kw">{</span>render(pos)<span class="kw">}</span>
    <span class="typ">&lt;/div&gt;</span>
  );
<span class="kw">}</span>

<span class="cmt">// Usage</span>
<span class="typ">&lt;MouseTracker</span> render=<span class="kw">{</span>(<span class="kw">{</span> x, y <span class="kw">}</span>) =&gt; <span class="typ">&lt;p&gt;</span>Mouse: <span class="kw">{</span>x<span class="kw">}</span>, <span class="kw">{</span>y<span class="kw">}</span><span class="typ">&lt;/p&gt;</span><span class="kw">}</span> <span class="typ">/&gt;</span>

<span class="cmt">// Children-as-function variant</span>
<span class="typ">&lt;MouseTracker&gt;</span><span class="kw">{</span>(<span class="kw">{</span> x, y <span class="kw">}</span>) =&gt; <span class="typ">&lt;p&gt;</span>Mouse: <span class="kw">{</span>x<span class="kw">}</span>, <span class="kw">{</span>y<span class="kw">}</span><span class="typ">&lt;/p&gt;</span><span class="kw">}</span><span class="typ">&lt;/MouseTracker&gt;</span>`}</Code>
  </div>
)

const S18_ErrorBoundaries = () => (
  <div>
    <Note>
      Error boundaries must be class components. They don't catch errors in
      event handlers, async code, or SSR.
    </Note>
    <Code>{`<span class="kw">class</span> <span class="typ">ErrorBoundary</span> <span class="kw">extends</span> Component <span class="kw">{</span>
  state = <span class="kw">{</span> hasError: <span class="kw">false</span>, error: <span class="kw">null</span> <span class="kw">}</span>;

  <span class="kw">static</span> <span class="fn">getDerivedStateFromError</span>(error) <span class="kw">{</span>
    <span class="kw">return</span> <span class="kw">{</span> hasError: <span class="kw">true</span>, error <span class="kw">}</span>;
  <span class="kw">}</span>

  <span class="fn">componentDidCatch</span>(error, info) <span class="kw">{</span>
    <span class="fn">logToService</span>(error, info.componentStack);
  <span class="kw">}</span>

  <span class="fn">render</span>() <span class="kw">{</span>
    <span class="kw">if</span> (<span class="kw">this</span>.state.hasError)
      <span class="kw">return</span> <span class="typ">&lt;h2&gt;</span>Something went wrong.<span class="typ">&lt;/h2&gt;</span>;
    <span class="kw">return</span> <span class="kw">this</span>.props.children;
  <span class="kw">}</span>
<span class="kw">}</span>

<span class="cmt">// Wrap any subtree</span>
<span class="typ">&lt;ErrorBoundary&gt;</span><span class="typ">&lt;RiskyComponent /&gt;</span><span class="typ">&lt;/ErrorBoundary&gt;</span>`}</Code>
  </div>
)

const S19_Portals = () => (
  <div>
    <Body>
      Render children outside the parent DOM hierarchy — ideal for modals,
      tooltips, and overlays.
    </Body>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> createPortal <span class="kw">}</span> <span class="kw">from</span> <span class="str">'react-dom'</span>;

<span class="kw">function</span> <span class="fn">Modal</span>(<span class="kw">{</span> isOpen, onClose, children <span class="kw">}</span>) <span class="kw">{</span>
  <span class="kw">if</span> (!isOpen) <span class="kw">return null</span>;
  <span class="kw">return</span> createPortal(
    <span class="typ">&lt;div</span> className=<span class="str">"overlay"</span> onClick=<span class="kw">{</span>onClose<span class="kw">}</span><span class="typ">&gt;</span>
      <span class="typ">&lt;div</span> onClick=<span class="kw">{</span>e =&gt; e.stopPropagation()<span class="kw">}</span><span class="typ">&gt;</span><span class="kw">{</span>children<span class="kw">}</span><span class="typ">&lt;/div&gt;</span>
    <span class="typ">&lt;/div&gt;</span>,
    document.getElementById(<span class="str">'modal-root'</span>)!
  );
<span class="kw">}</span>

<span class="cmt">// index.html needs: &lt;div id="modal-root"&gt;&lt;/div&gt;</span>`}</Code>
  </div>
)

const S20_Suspense = () => (
  <div>
    <SH>Lazy Loading</SH>
    <Code>{`<span class="kw">const</span> HeavyChart = lazy(() =&gt; import(<span class="str">'./HeavyChart'</span>));

<span class="kw">function</span> <span class="fn">Dashboard</span>() <span class="kw">{</span>
  <span class="kw">return</span> (
    <span class="typ">&lt;Suspense</span> fallback=<span class="kw">{</span><span class="typ">&lt;div&gt;</span>Loading...<span class="typ">&lt;/div&gt;</span><span class="kw">}</span><span class="typ">&gt;</span>
      <span class="typ">&lt;HeavyChart /&gt;</span>
    <span class="typ">&lt;/Suspense&gt;</span>
  );
<span class="kw">}</span>`}</Code>

    <SH>Data Fetching (React 18 + frameworks)</SH>
    <Code>{`<span class="cmt">// Requires Suspense-compatible data layer (Next.js, TanStack Query, SWR)</span>
<span class="kw">function</span> <span class="fn">Profile</span>() <span class="kw">{</span>
  <span class="kw">const</span> user = use(<span class="fn">fetchUser</span>());  <span class="cmt">// React 19 use() hook</span>
  <span class="kw">return</span> <span class="typ">&lt;p&gt;</span><span class="kw">{</span>user.name<span class="kw">}</span><span class="typ">&lt;/p&gt;</span>;
<span class="kw">}</span>

<span class="typ">&lt;Suspense</span> fallback=<span class="kw">{</span><span class="typ">&lt;Skeleton /&gt;</span><span class="kw">}</span><span class="typ">&gt;</span><span class="typ">&lt;Profile /&gt;</span><span class="typ">&lt;/Suspense&gt;</span>`}</Code>
  </div>
)

const S21_TypeScript = () => (
  <div>
    <SH>Typing Props</SH>
    <Code>{`<span class="kw">type</span> <span class="typ">ButtonProps</span> = <span class="kw">{</span>
  label:     <span class="typ">string</span>;
  onClick:   <span class="typ">() =&gt; void</span>;
  variant?:  <span class="str">'primary'</span> | <span class="str">'secondary'</span>;
  disabled?: <span class="typ">boolean</span>;
<span class="kw">}</span>;

<span class="kw">const</span> <span class="fn">Button</span>: React.FC&lt;<span class="typ">ButtonProps</span>&gt; = (<span class="kw">{</span> label, onClick, variant = <span class="str">'primary'</span> <span class="kw">}</span>) =&gt; (
  <span class="typ">&lt;button</span> className=<span class="kw">{</span>variant<span class="kw">}</span> onClick=<span class="kw">{</span>onClick<span class="kw">}</span><span class="typ">&gt;</span><span class="kw">{</span>label<span class="kw">}</span><span class="typ">&lt;/button&gt;</span>
);`}</Code>

    <SH>Typing Events</SH>
    <Code>{`<span class="kw">const</span> <span class="fn">handleChange</span> = (e: <span class="typ">React.ChangeEvent&lt;HTMLInputElement&gt;</span>) =&gt; <span class="kw">{</span> ... <span class="kw">}</span>;
<span class="kw">const</span> <span class="fn">handleSubmit</span> = (e: <span class="typ">React.FormEvent&lt;HTMLFormElement&gt;</span>) =&gt; <span class="kw">{</span> ... <span class="kw">}</span>;
<span class="kw">const</span> <span class="fn">handleClick</span>  = (e: <span class="typ">React.MouseEvent&lt;HTMLButtonElement&gt;</span>) =&gt; <span class="kw">{</span> ... <span class="kw">}</span>;
<span class="kw">const</span> <span class="fn">handleKey</span>    = (e: <span class="typ">React.KeyboardEvent&lt;HTMLInputElement&gt;</span>) =&gt; <span class="kw">{</span> ... <span class="kw">}</span>;`}</Code>

    <SH>Typing useReducer</SH>
    <Code>{`<span class="kw">type</span> <span class="typ">State</span>  = <span class="kw">{</span> count: <span class="typ">number</span> <span class="kw">}</span>;
<span class="kw">type</span> <span class="typ">Action</span> = <span class="kw">{</span> type: <span class="str">'inc'</span> <span class="kw">}</span> | <span class="kw">{</span> type: <span class="str">'dec'</span> <span class="kw">}</span> | <span class="kw">{</span> type: <span class="str">'reset'</span>; payload: <span class="typ">number</span> <span class="kw">}</span>;

<span class="kw">function</span> <span class="fn">reducer</span>(state: <span class="typ">State</span>, action: <span class="typ">Action</span>): <span class="typ">State</span> <span class="kw">{</span>
  <span class="kw">switch</span> (action.type) <span class="kw">{</span>
    <span class="kw">case</span> <span class="str">'inc'</span>:   <span class="kw">return</span> <span class="kw">{</span> count: state.count + <span class="num">1</span> <span class="kw">}</span>;
    <span class="kw">case</span> <span class="str">'reset'</span>: <span class="kw">return</span> <span class="kw">{</span> count: action.payload <span class="kw">}</span>;
  <span class="kw">}</span>
<span class="kw">}</span>`}</Code>

    <SH>Typing Context</SH>
    <Code>{`<span class="kw">type</span> <span class="typ">ThemeCtx</span> = <span class="kw">{</span> theme: <span class="str">'light'</span> | <span class="str">'dark'</span>; toggle: <span class="typ">() =&gt; void</span> <span class="kw">}</span>;
<span class="kw">const</span> ThemeContext = createContext&lt;<span class="typ">ThemeCtx | undefined</span>&gt;(<span class="kw">undefined</span>);

<span class="kw">export function</span> <span class="fn">useTheme</span>(): <span class="typ">ThemeCtx</span> <span class="kw">{</span>
  <span class="kw">const</span> ctx = useContext(ThemeContext);
  <span class="kw">if</span> (!ctx) <span class="kw">throw new</span> Error(<span class="str">'useTheme must be inside ThemeProvider'</span>);
  <span class="kw">return</span> ctx;
<span class="kw">}</span>`}</Code>
  </div>
)

const S22_Patterns = () => (
  <div>
    <SH>Folder Structure</SH>
    <Code>{`src/
  components/
    Button/
      Button.tsx        <span class="cmt">// component</span>
      Button.test.tsx   <span class="cmt">// tests</span>
      Button.module.css <span class="cmt">// styles</span>
      index.ts          <span class="cmt">// re-export</span>
  hooks/         <span class="cmt">// custom hooks</span>
  context/       <span class="cmt">// context providers</span>
  pages/         <span class="cmt">// route-level components</span>
  utils/         <span class="cmt">// pure helper functions</span>
  types/         <span class="cmt">// shared TypeScript types</span>`}</Code>

    <SH>Derived State — Compute, Don't Store</SH>
    <Code>{`<span class="cmt">// ❌ Don't sync derived state into useState</span>
<span class="kw">const</span> [fullName, setFullName] = useState(<span class="str">\`\${first} \${last}\`</span>);

<span class="cmt">// ✅ Compute directly from existing state</span>
<span class="kw">const</span> fullName = <span class="str">\`\${first} \${last}\`</span>;`}</Code>

    <SH>Stale Closures</SH>
    <Code>{`<span class="cmt">// ❌ Stale closure — count never updates inside interval</span>
useEffect(() =&gt; <span class="kw">{</span>
  <span class="kw">const</span> id = setInterval(() =&gt; console.log(count), <span class="num">1000</span>);
  <span class="kw">return</span> () =&gt; clearInterval(id);
<span class="kw">}</span>, []);

<span class="cmt">// ✅ Use functional updater — always has latest value</span>
useEffect(() =&gt; <span class="kw">{</span>
  <span class="kw">const</span> id = setInterval(() =&gt; setCount(c =&gt; c + <span class="num">1</span>), <span class="num">1000</span>);
  <span class="kw">return</span> () =&gt; clearInterval(id);
<span class="kw">}</span>, []);`}</Code>

    <SH>Avoid useEffect for Transforms</SH>
    <Code>{`<span class="cmt">// ❌ Using useEffect to transform state</span>
useEffect(() =&gt; setFiltered(items.filter(i =&gt; i.active)), [items]);

<span class="cmt">// ✅ Derive inline (or useMemo if expensive)</span>
<span class="kw">const</span> filtered = items.filter(i =&gt; i.active);`}</Code>
  </div>
)

/* ══════════════════════════════════════════════════
   SECTION CONTENT — LIBRARIES
══════════════════════════════════════════════════ */

const S23_Zod = () => (
  <div>
    <SH>Schema Definition</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> z <span class="kw">}</span> <span class="kw">from</span> <span class="str">'zod'</span>;

<span class="kw">const</span> UserSchema = z.object(<span class="kw">{</span>
  id:    z.number(),
  name:  z.string().min(<span class="num">1</span>),
  email: z.string().email(),
  age:   z.number().int().min(<span class="num">0</span>).optional(),
  role:  z.enum([<span class="str">'admin'</span>, <span class="str">'user'</span>, <span class="str">'guest'</span>]),
<span class="kw">}</span>);

<span class="cmt">// Infer TypeScript type from schema — no duplication</span>
<span class="kw">type</span> <span class="typ">User</span> = z.infer&lt;<span class="kw">typeof</span> UserSchema&gt;;`}</Code>

    <SH>Parsing</SH>
    <Code>{`<span class="cmt">// parse — throws ZodError on failure</span>
<span class="kw">const</span> user = UserSchema.parse(rawData);

<span class="cmt">// safeParse — never throws</span>
<span class="kw">const</span> result = UserSchema.safeParse(rawData);
<span class="kw">if</span> (result.success) <span class="kw">{</span>
  console.log(result.data);             <span class="cmt">// typed User</span>
<span class="kw">}</span> <span class="kw">else</span> <span class="kw">{</span>
  <span class="kw">const</span> flat = result.error.flatten();
  console.log(flat.fieldErrors);        <span class="cmt">// { email: ['Invalid email'] }</span>
<span class="kw">}</span>`}</Code>

    <SH>Common Validators</SH>
    <Code>{`z.string().min(<span class="num">3</span>).max(<span class="num">100</span>).email().url().uuid().regex(<span class="kw">/pattern/</span>)
z.number().int().positive().min(<span class="num">0</span>).max(<span class="num">100</span>).multipleOf(<span class="num">5</span>)
z.array(z.string()).min(<span class="num">1</span>).max(<span class="num">10</span>)
z.object(<span class="kw">{</span>...<span class="kw">}</span>).partial()           <span class="cmt">// all fields optional</span>
z.object(<span class="kw">{</span>...<span class="kw">}</span>).pick(<span class="kw">{</span> name: <span class="kw">true</span> <span class="kw">}</span>)  <span class="cmt">// only name field</span>
z.union([z.string(), z.number()])
z.discriminatedUnion(<span class="str">'status'</span>, [<span class="kw">{</span>...<span class="kw">}</span>, <span class="kw">{</span>...<span class="kw">}</span>])
z.enum([<span class="str">'a'</span>, <span class="str">'b'</span>]).options           <span class="cmt">// ['a', 'b']</span>
z.coerce.number()                    <span class="cmt">// coerce string → number</span>
z.string().default(<span class="str">'anon'</span>)
z.string().nullable()                <span class="cmt">// string | null</span>
z.string().nullish()                 <span class="cmt">// string | null | undefined</span>`}</Code>

    <SH>Transforms & Refine</SH>
    <Code>{`z.string().transform(v =&gt; parseInt(v, <span class="num">10</span>))  <span class="cmt">// parse then transform</span>

z.string().refine(v =&gt; v.length &gt;= <span class="num">8</span>, <span class="kw">{</span> message: <span class="str">'Too short'</span> <span class="kw">}</span>)

z.object(<span class="kw">{</span> pw: z.string(), confirm: z.string() <span class="kw">}</span>)
  .superRefine((<span class="kw">{</span> pw, confirm <span class="kw">}</span>, ctx) =&gt; <span class="kw">{</span>
    <span class="kw">if</span> (pw !== confirm)
      ctx.addIssue(<span class="kw">{</span> code: z.ZodIssueCode.custom, message: <span class="str">'No match'</span>, path: [<span class="str">'confirm'</span>] <span class="kw">}</span>);
  <span class="kw">}</span>);`}</Code>

    <SH>React Hook Form Integration</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> zodResolver <span class="kw">}</span> <span class="kw">from</span> <span class="str">'@hookform/resolvers/zod'</span>;

<span class="kw">const</span> schema = z.object(<span class="kw">{</span>
  name:  z.string().min(<span class="num">2</span>, <span class="str">'At least 2 chars'</span>),
  email: z.string().email(<span class="str">'Invalid email'</span>),
<span class="kw">}</span>);
<span class="kw">type</span> <span class="typ">FormData</span> = z.infer&lt;<span class="kw">typeof</span> schema&gt;;

<span class="kw">const</span> <span class="kw">{</span> register, handleSubmit, formState: <span class="kw">{</span> errors <span class="kw">}</span> <span class="kw">}</span> =
  useForm&lt;<span class="typ">FormData</span>&gt;(<span class="kw">{</span> resolver: zodResolver(schema) <span class="kw">}</span>);`}</Code>
  </div>
)

const S24_Axios = () => (
  <div>
    <SH>Axios Instance (Recommended)</SH>
    <Code>{`<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">const</span> api = axios.create(<span class="kw">{</span>
  baseURL: import.meta.env.VITE_API_URL,
  timeout: <span class="num">10_000</span>,
  headers: <span class="kw">{</span> <span class="str">'Content-Type'</span>: <span class="str">'application/json'</span> <span class="kw">}</span>,
<span class="kw">}</span>);

<span class="kw">export default</span> api;`}</Code>

    <SH>CRUD Methods</SH>
    <Code>{`<span class="kw">const</span> res = <span class="kw">await</span> api.get&lt;<span class="typ">User[]</span>&gt;(<span class="str">'/users'</span>);                        <span class="cmt">// GET</span>
<span class="kw">const</span> res = <span class="kw">await</span> api.get(<span class="str">'/users'</span>, <span class="kw">{</span> params: <span class="kw">{</span> page: <span class="num">1</span>, limit: <span class="num">10</span> <span class="kw">}</span> <span class="kw">}</span>); <span class="cmt">// query string</span>
<span class="kw">await</span> api.post&lt;<span class="typ">User</span>&gt;(<span class="str">'/users'</span>, <span class="kw">{</span> name: <span class="str">'Alice'</span> <span class="kw">}</span>);                  <span class="cmt">// POST</span>
<span class="kw">await</span> api.patch(<span class="str">'/users/1'</span>, <span class="kw">{</span> name: <span class="str">'Updated'</span> <span class="kw">}</span>);                   <span class="cmt">// PATCH</span>
<span class="kw">await</span> api.delete(<span class="str">'/users/1'</span>);                                        <span class="cmt">// DELETE</span>`}</Code>

    <SH>Interceptors</SH>
    <Code>{`<span class="cmt">// Attach auth token to every request</span>
api.interceptors.request.use(config =&gt; <span class="kw">{</span>
  <span class="kw">const</span> token = localStorage.getItem(<span class="str">'token'</span>);
  <span class="kw">if</span> (token) config.headers.Authorization = <span class="str">\`Bearer \${token}\`</span>;
  <span class="kw">return</span> config;
<span class="kw">}</span>);

<span class="cmt">// Global 401 redirect</span>
api.interceptors.response.use(
  res =&gt; res,
  err =&gt; <span class="kw">{</span>
    <span class="kw">if</span> (err.response?.status === <span class="num">401</span>) window.location.href = <span class="str">'/login'</span>;
    <span class="kw">return</span> Promise.reject(err);
  <span class="kw">}</span>
);`}</Code>

    <SH>Error Handling</SH>
    <Code>{`<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">try</span> <span class="kw">{</span>
  <span class="kw">await</span> api.get(<span class="str">'/users/999'</span>);
<span class="kw">}</span> <span class="kw">catch</span> (err) <span class="kw">{</span>
  <span class="kw">if</span> (axios.isAxiosError(err)) <span class="kw">{</span>
    console.log(err.response?.status);   <span class="cmt">// 404</span>
    console.log(err.response?.data);     <span class="cmt">// server error body</span>
  <span class="kw">}</span>
<span class="kw">}</span>`}</Code>

    <SH>Cancellation</SH>
    <Code>{`useEffect(() =&gt; <span class="kw">{</span>
  <span class="kw">const</span> controller = <span class="kw">new</span> AbortController();

  api.get(<span class="str">'/search'</span>, <span class="kw">{</span> params: <span class="kw">{</span> q: query <span class="kw">}</span>, signal: controller.signal <span class="kw">}</span>)
    .then(res =&gt; setResults(res.data))
    .catch(err =&gt; <span class="kw">{</span> <span class="kw">if</span> (!axios.isCancel(err)) setError(err.message); <span class="kw">}</span>);

  <span class="kw">return</span> () =&gt; controller.abort();   <span class="cmt">// cancel on query change or unmount</span>
<span class="kw">}</span>, [query]);`}</Code>

    <SH>File Upload</SH>
    <Code>{`<span class="kw">const</span> fd = <span class="kw">new</span> FormData();
fd.append(<span class="str">'avatar'</span>, file);
<span class="kw">await</span> api.post(<span class="str">'/upload'</span>, fd, <span class="kw">{</span>
  headers: <span class="kw">{</span> <span class="str">'Content-Type'</span>: <span class="str">'multipart/form-data'</span> <span class="kw">}</span>,
  onUploadProgress: e =&gt; setProgress(Math.round(e.loaded * <span class="num">100</span> / (e.total ?? <span class="num">1</span>))),
<span class="kw">}</span>);`}</Code>
  </div>
)

const S25_JsonServer = () => (
  <div>
    <SH>Setup</SH>
    <Code>{`<span class="cmt">// 1. db.json</span>
<span class="kw">{</span>
  <span class="str">"users"</span>: [
    <span class="kw">{</span> <span class="str">"id"</span>: <span class="num">1</span>, <span class="str">"name"</span>: <span class="str">"Alice"</span>, <span class="str">"role"</span>: <span class="str">"admin"</span> <span class="kw">}</span>,
    <span class="kw">{</span> <span class="str">"id"</span>: <span class="num">2</span>, <span class="str">"name"</span>: <span class="str">"Bob"</span>,   <span class="str">"role"</span>: <span class="str">"user"</span>  <span class="kw">}</span>
  <span class="kw">]</span>,
  <span class="str">"posts"</span>: [<span class="kw">{</span> <span class="str">"id"</span>: <span class="num">1</span>, <span class="str">"title"</span>: <span class="str">"Hello"</span>, <span class="str">"userId"</span>: <span class="num">1</span> <span class="kw">}</span>]
<span class="kw">}</span>

<span class="cmt">// 2. package.json script</span>
<span class="str">"server"</span>: <span class="str">"json-server --watch db.json --port 3001"</span>`}</Code>

    <SH>Auto-Generated Endpoints</SH>
    <Tbl
      headers={["Method", "URL", "Action"]}
      rows={[
        ["GET", "/users", "Get all"],
        ["GET", "/users/1", "Get by id"],
        ["POST", "/users", "Create (id auto-assigned)"],
        ["PUT", "/users/1", "Full replace"],
        ["PATCH", "/users/1", "Partial update"],
        ["DELETE", "/users/1", "Delete"],
      ]}
    />

    <SH>Query Params</SH>
    <Code>{`GET /users?role=admin                    <span class="cmt">// filter by field</span>
GET /users?q=alice                       <span class="cmt">// full-text search</span>
GET /posts?_sort=title&_order=desc       <span class="cmt">// sort</span>
GET /posts?_page=1&_per_page=10         <span class="cmt">// paginate</span>
GET /posts?_limit=5&_start=10           <span class="cmt">// limit + offset</span>
GET /posts?_embed=comments              <span class="cmt">// embed child resources</span>
GET /comments?_expand=post              <span class="cmt">// expand parent resource</span>
GET /posts/1/comments                   <span class="cmt">// nested route</span>`}</Code>

    <SH>Seeding with Faker</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> faker <span class="kw">}</span> <span class="kw">from</span> <span class="str">'@faker-js/faker'</span>;
<span class="kw">import</span> <span class="kw">{</span> writeFileSync <span class="kw">}</span> <span class="kw">from</span> <span class="str">'fs'</span>;

<span class="kw">const</span> db = <span class="kw">{</span>
  users: Array.from(<span class="kw">{</span> length: <span class="num">20</span> <span class="kw">}</span>, (_, i) =&gt; (<span class="kw">{</span>
    id:   i + <span class="num">1</span>,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  <span class="kw">}</span>)),
<span class="kw">}</span>;

writeFileSync(<span class="str">'db.json'</span>, JSON.stringify(db, <span class="kw">null</span>, <span class="num">2</span>));`}</Code>
  </div>
)

const S26_Zustand = () => (
  <div>
    <SH>Basic Store</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> create <span class="kw">}</span> <span class="kw">from</span> <span class="str">'zustand'</span>;

<span class="kw">type</span> <span class="typ">Store</span> = <span class="kw">{</span>
  count:     <span class="typ">number</span>;
  increment: <span class="typ">() =&gt; void</span>;
  reset:     <span class="typ">() =&gt; void</span>;
<span class="kw">}</span>;

<span class="kw">const</span> useCounterStore = create&lt;<span class="typ">Store</span>&gt;()(set =&gt; (<span class="kw">{</span>
  count:     <span class="num">0</span>,
  increment: () =&gt; set(s =&gt; (<span class="kw">{</span> count: s.count + <span class="num">1</span> <span class="kw">}</span>)),
  reset:     () =&gt; set(<span class="kw">{</span> count: <span class="num">0</span> <span class="kw">}</span>),
<span class="kw">}</span>));

<span class="cmt">// No Provider needed — use anywhere</span>
<span class="kw">const</span> count     = useCounterStore(s =&gt; s.count);      <span class="cmt">// ✅ select slice</span>
<span class="kw">const</span> increment = useCounterStore(s =&gt; s.increment);`}</Code>

    <SH>Selecting State (Prevent Re-renders)</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> useShallow <span class="kw">}</span> <span class="kw">from</span> <span class="str">'zustand/react/shallow'</span>;

<span class="cmt">// Re-renders only when count or status actually change</span>
<span class="kw">const</span> <span class="kw">{</span> count, status <span class="kw">}</span> = useStore(
  useShallow(s =&gt; (<span class="kw">{</span> count: s.count, status: s.status <span class="kw">}</span>))
);

<span class="cmt">// ❌ Avoid — subscribes to entire store</span>
<span class="kw">const</span> store = useStore();`}</Code>

    <SH>Async Actions</SH>
    <Code>{`<span class="kw">const</span> useUserStore = create&lt;<span class="typ">UserStore</span>&gt;()(set =&gt; (<span class="kw">{</span>
  users: [], loading: <span class="kw">false</span>, error: <span class="kw">null</span>,

  fetchUsers: async () =&gt; <span class="kw">{</span>
    set(<span class="kw">{</span> loading: <span class="kw">true</span>, error: <span class="kw">null</span> <span class="kw">}</span>);
    <span class="kw">try</span> <span class="kw">{</span>
      <span class="kw">const</span> res = <span class="kw">await</span> api.get(<span class="str">'/users'</span>);
      set(<span class="kw">{</span> users: res.data, loading: <span class="kw">false</span> <span class="kw">}</span>);
    <span class="kw">}</span> <span class="kw">catch</span> (e) <span class="kw">{</span>
      set(<span class="kw">{</span> error: getErrorMessage(e), loading: <span class="kw">false</span> <span class="kw">}</span>);
    <span class="kw">}</span>
  <span class="kw">}</span>,
<span class="kw">}</span>));`}</Code>

    <SH>Middleware</SH>
    <Code>{`<span class="kw">import</span> <span class="kw">{</span> persist, devtools <span class="kw">}</span> <span class="kw">from</span> <span class="str">'zustand/middleware'</span>;
<span class="kw">import</span> <span class="kw">{</span> immer <span class="kw">}</span> <span class="kw">from</span> <span class="str">'zustand/middleware/immer'</span>;

<span class="kw">const</span> useStore = create&lt;<span class="typ">Store</span>&gt;()(
  devtools(
    persist(
      immer(set =&gt; (<span class="kw">{</span>
        user: <span class="kw">{</span> name: <span class="str">'Alice'</span>, address: <span class="kw">{</span> city: <span class="str">'NYC'</span> <span class="kw">}</span> <span class="kw">}</span>,
        setCity: (city: <span class="typ">string</span>) =&gt; set(s =&gt; <span class="kw">{</span>
          s.user.address.city = city;  <span class="cmt">// mutate directly — Immer handles it</span>
        <span class="kw">}</span>),
      <span class="kw">}</span>)),
      <span class="kw">{</span> name: <span class="str">'app-store'</span> <span class="kw">}</span>  <span class="cmt">// localStorage key</span>
    )
  )
);`}</Code>

    <SH>Outside React</SH>
    <Code>{`useStore.getState().count             <span class="cmt">// read</span>
useStore.setState(<span class="kw">{</span> count: <span class="num">0</span> <span class="kw">}</span>)        <span class="cmt">// write</span>
<span class="kw">const</span> unsub = useStore.subscribe(s =&gt; console.log(s.count)); <span class="cmt">// watch</span>
unsub();                              <span class="cmt">// unsubscribe`}</Code>

    <SH>Zustand vs Context</SH>
    <Tbl
      headers={["", "Zustand", "Context API"]}
      rows={[
        ["Boilerplate", "Minimal", "Provider + hook"],
        [
          "Re-render control",
          "Fine-grained selectors",
          "All consumers re-render",
        ],
        ["Async actions", "Built-in", "Manual"],
        ["DevTools", "devtools middleware", "React DevTools only"],
        ["Persistence", "persist middleware", "Manual"],
      ]}
    />
  </div>
)

/* ══════════════════════════════════════════════════
   TAB CONFIG
══════════════════════════════════════════════════ */
type SectionDef = {
  id: string
  num: number
  title: string
  tag?: string
  tags?: Array<{
    color: "orange" | "blue" | "green" | "purple" | "cyan"
    label: string
  }>
  Content: React.FC
}

const TABS: { id: string; label: string; sections: SectionDef[] }[] = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    sections: [
      {
        id: "core-concepts",
        num: 1,
        title: "Core Concepts",
        tag: "concepts",
        Content: S01_CoreConcepts,
      },
      { id: "jsx", num: 2, title: "JSX", tag: "syntax", Content: S02_JSX },
      {
        id: "components",
        num: 3,
        title: "Components",
        tag: "building blocks",
        Content: S03_Components,
      },
      {
        id: "props",
        num: 4,
        title: "Props",
        tag: "data flow",
        Content: S04_Props,
      },
      {
        id: "state",
        num: 5,
        title: "State",
        tag: "reactivity",
        Content: S05_State,
      },
    ],
  },
  {
    id: "hooks",
    label: "Hooks",
    sections: [
      {
        id: "builtin-hooks",
        num: 6,
        title: "Built-in Hooks",
        tag: "react core",
        Content: S06_BuiltinHooks,
      },
      {
        id: "custom-hooks",
        num: 15,
        title: "Custom Hooks",
        tag: "reusability",
        Content: S15_CustomHooks,
      },
    ],
  },
  {
    id: "ui-patterns",
    label: "UI Patterns",
    sections: [
      {
        id: "events",
        num: 7,
        title: "Event Handling",
        tag: "interaction",
        Content: S07_Events,
      },
      {
        id: "conditional",
        num: 8,
        title: "Conditional Rendering",
        tag: "branching",
        Content: S08_Conditional,
      },
      {
        id: "lists",
        num: 9,
        title: "Lists & Keys",
        tag: "iteration",
        Content: S09_Lists,
      },
      {
        id: "forms",
        num: 10,
        title: "Forms",
        tag: "controlled",
        Content: S10_Forms,
      },
      {
        id: "refs",
        num: 11,
        title: "Refs",
        tag: "imperative",
        Content: S11_Refs,
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    sections: [
      {
        id: "context",
        num: 12,
        title: "Context API",
        tag: "global state",
        Content: S12_Context,
      },
      {
        id: "lifecycle",
        num: 13,
        title: "Component Lifecycle",
        tag: "class api",
        Content: S13_Lifecycle,
      },
      {
        id: "performance",
        num: 14,
        title: "Performance",
        tag: "optimization",
        Content: S14_Performance,
      },
      {
        id: "hoc",
        num: 16,
        title: "Higher-Order Components",
        tag: "HOC",
        Content: S16_HOC,
      },
      {
        id: "render-props",
        num: 17,
        title: "Render Props",
        tag: "pattern",
        Content: S17_RenderProps,
      },
      {
        id: "error-boundaries",
        num: 18,
        title: "Error Boundaries",
        tag: "resilience",
        Content: S18_ErrorBoundaries,
      },
      {
        id: "portals",
        num: 19,
        title: "Portals",
        tag: "DOM escape",
        Content: S19_Portals,
      },
      {
        id: "suspense",
        num: 20,
        title: "Suspense & Lazy",
        tag: "code splitting",
        Content: S20_Suspense,
      },
      {
        id: "typescript",
        num: 21,
        title: "TypeScript",
        tag: "types",
        Content: S21_TypeScript,
      },
    ],
  },
  {
    id: "patterns",
    label: "Best Practices",
    sections: [
      {
        id: "patterns",
        num: 22,
        title: "Common Patterns & Best Practices",
        tag: "guidelines",
        Content: S22_Patterns,
      },
    ],
  },
  {
    id: "libraries",
    label: "Libraries",
    sections: [
      {
        id: "zod",
        num: 23,
        title: "Zod",
        tag: "schema validation",
        Content: S23_Zod,
      },
      {
        id: "axios",
        num: 24,
        title: "Axios",
        tag: "http client",
        Content: S24_Axios,
      },
      {
        id: "json-server",
        num: 25,
        title: "json-server",
        tag: "mock api",
        Content: S25_JsonServer,
      },
      {
        id: "zustand",
        num: 26,
        title: "Zustand",
        tag: "state management",
        Content: S26_Zustand,
      },
    ],
  },
]

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function CheatSheet() {
  return (
    <div className="cs-root">
      <GlobalStyles />

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #27272a",
          padding: "28px 32px 24px",
          background:
            "linear-gradient(180deg, #var(--background) 0%, #var(--background) 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 8,
          }}
        >
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#f4f4f5",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Docs
          </h1>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#52525b",
              background: "#18181b",
              border: "1px solid #27272a",
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            v18+ · TypeScript · 2026
          </span>
        </div>
        <p style={{ color: "#71717a", fontSize: 13.5, margin: 0 }}>
          26 sections · Fundamentals · Hooks · UI Patterns · Advanced ·
          Libraries
        </p>
      </div>

      {/* Tabs */}
      <div style={{ padding: "20px 32px 40px" }}>
        <Tabs defaultValue="fundamentals">
          <ScrollArea>
            <TabsList style={{ marginBottom: 24, width: "100%" }}>
              {TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Accordion type="multiple" defaultValue={[tab.sections[0].id]}>
                {tab.sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flex: 1,
                          paddingRight: 12,
                        }}
                      >
                        <NumBadge n={section.num} />
                        <span>{section.title}</span>
                        {section.tag && (
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10.5,
                              color: "#52525b",
                              marginLeft: "auto",
                              marginRight: 4,
                            }}
                          >
                            // {section.tag}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div style={{ paddingTop: 4 }}>
                        <section.Content />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #1c1c1f",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#3f3f46",
          }}
        >
          react-cheatsheet.tsx
        </span>
        <span style={{ fontSize: 12, color: "#3f3f46" }}>
          Generated March 2026 · React 18+ · shadcn/ui
        </span>
      </div>
    </div>
  )
}
