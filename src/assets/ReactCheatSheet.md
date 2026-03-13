# ⚛️ React Cheat Sheet

> A comprehensive reference for React — from fundamentals to advanced patterns.

---

## Table of Contents

1. [Core Concepts](#1-core-concepts)
2. [JSX](#2-jsx)
3. [Components](#3-components)
4. [Props](#4-props)
5. [State](#5-state)
6. [Hooks — Built-in](#6-hooks--built-in)
7. [Event Handling](#7-event-handling)
8. [Conditional Rendering](#8-conditional-rendering)
9. [Lists & Keys](#9-lists--keys)
10. [Forms & Controlled Components](#10-forms--controlled-components)
11. [Refs](#11-refs)
12. [Context API](#12-context-api)
13. [Component Lifecycle (Class)](#13-component-lifecycle-class)
14. [Performance Optimization](#14-performance-optimization)
15. [Custom Hooks](#15-custom-hooks)
16. [Higher-Order Components (HOC)](#16-higher-order-components-hoc)
17. [Render Props](#17-render-props)
18. [Error Boundaries](#18-error-boundaries)
19. [Portals](#19-portals)
20. [Suspense & Lazy Loading](#20-suspense--lazy-loading)
21. [TypeScript with React](#21-typescript-with-react)
22. [Common Patterns & Best Practices](#22-common-patterns--best-practices)
23. [Zod — Schema Validation](#23-zod--schema-validation)
24. [Axios — HTTP Client](#24-axios--http-client)
25. [json-server — Mock REST API](#25-json-server--mock-rest-api)
26. [Zustand — State Management](#26-zustand--state-management)

---

## 1. Core Concepts

| Concept | Description |
|---|---|
| **Component** | A reusable UI building block (function or class) |
| **Props** | Read-only data passed from parent to child |
| **State** | Mutable data managed inside a component |
| **Virtual DOM** | React's in-memory representation of the real DOM |
| **Reconciliation** | Process of diffing the virtual DOM to update the real DOM |
| **One-way data flow** | Data flows down from parent → child via props |
| **JSX** | Syntax extension that looks like HTML inside JavaScript |

---

## 2. JSX

### Basic Syntax
```jsx
const element = <h1 className="title">Hello, World!</h1>;
```

### Rules
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- All tags must be closed: `<br />`, `<img />`
- Return a single root element (or use a Fragment)
- JavaScript expressions go in `{ }`

### Fragments
```jsx
// Long form
<React.Fragment>
  <h1>Title</h1>
  <p>Paragraph</p>
</React.Fragment>

// Short form
<>
  <h1>Title</h1>
  <p>Paragraph</p>
</>
```

### Expressions in JSX
```jsx
const name = "Alice";
const el = <p>Hello, {name.toUpperCase()}!</p>;

// Ternary
const el = <p>{isLoggedIn ? "Welcome" : "Please log in"}</p>;

// Inline styles (object syntax)
const el = <div style={{ color: "red", fontSize: 16 }}>Styled</div>;
```

### Spreading Props
```jsx
const props = { id: "box", className: "container" };
const el = <div {...props}>Content</div>;
```

---

## 3. Components

### Function Component
```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;
```

### Class Component
```jsx
import React, { Component } from "react";

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Default Export vs Named Export
```jsx
// Default
export default function App() { ... }
import App from "./App";

// Named
export function Button() { ... }
import { Button } from "./Button";
```

### Composing Components
```jsx
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
```

---

## 4. Props

### Passing & Receiving Props
```jsx
// Parent
<UserCard name="Alice" age={30} isAdmin={true} />

// Child
function UserCard({ name, age, isAdmin }) {
  return <p>{name} – {age} {isAdmin && "(Admin)"}</p>;
}
```

### Default Props
```jsx
function Button({ label = "Click me", color = "blue" }) {
  return <button style={{ background: color }}>{label}</button>;
}

// Class component
Button.defaultProps = { label: "Click me", color: "blue" };
```

### PropTypes (Runtime Validation)
```jsx
import PropTypes from "prop-types";

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  count: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  status: PropTypes.oneOf(["active", "inactive"]),
};
```

### Children Prop
```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Usage
<Card title="Info">
  <p>This is inside the card.</p>
</Card>
```

### Prop Drilling vs Context
```
Parent → Child → GrandChild  (prop drilling — avoid for deep trees)
Use Context API or state manager for deeply nested data.
```

---

## 5. State

### useState
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
    </div>
  );
}
```

### State with Objects
```jsx
const [user, setUser] = useState({ name: "Alice", age: 25 });

// Always spread — don't mutate directly
setUser(prev => ({ ...prev, age: 26 }));
```

### State with Arrays
```jsx
const [items, setItems] = useState([]);

// Add
setItems(prev => [...prev, newItem]);

// Remove
setItems(prev => prev.filter(item => item.id !== id));

// Update
setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
```

### Lazy Initial State
```jsx
// Pass a function — only runs once on mount
const [state, setState] = useState(() => expensiveComputation());
```

### Class Component State
```jsx
class Counter extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

---

## 6. Hooks — Built-in

### useState
```jsx
const [value, setValue] = useState(initialValue);
```

### useEffect
```jsx
import { useEffect } from "react";

// Runs after every render
useEffect(() => { doSomething(); });

// Runs once on mount
useEffect(() => { fetchData(); }, []);

// Runs when `id` changes
useEffect(() => { fetchUser(id); }, [id]);

// Cleanup (on unmount or before next effect)
useEffect(() => {
  const sub = subscribe(id);
  return () => sub.unsubscribe();
}, [id]);
```

### useContext
```jsx
const theme = useContext(ThemeContext);
```

### useReducer
```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return { count: 0 };
    default: throw new Error("Unknown action");
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}
```

### useRef
```jsx
import { useRef } from "react";

// DOM reference
function TextInput() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}

// Mutable value (no re-render on change)
const renderCount = useRef(0);
renderCount.current += 1;
```

### useMemo
```jsx
import { useMemo } from "react";

const sortedList = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]  // recompute only when items changes
);
```

### useCallback
```jsx
import { useCallback } from "react";

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);  // stable reference unless id changes
```

### useLayoutEffect
```jsx
// Like useEffect but fires synchronously after DOM mutations
// Use for reading layout / measuring DOM before paint
useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
}, []);
```

### useId (React 18)
```jsx
import { useId } from "react";

function LabeledInput() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} />
    </>
  );
}
```

### useTransition (React 18)
```jsx
import { useTransition } from "react";

const [isPending, startTransition] = useTransition();

startTransition(() => {
  setFilteredList(heavyFilter(items));
});

return isPending ? <Spinner /> : <List items={filteredList} />;
```

### useDeferredValue (React 18)
```jsx
import { useDeferredValue } from "react";

const deferredQuery = useDeferredValue(query);
// Use deferredQuery in expensive renders — it lags behind `query`
```

### useImperativeHandle
```jsx
import { useImperativeHandle, forwardRef } from "react";

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ""; },
  }));

  return <input ref={inputRef} />;
});
```

### useDebugValue
```jsx
// Displays a label in React DevTools for custom hooks
useDebugValue(isOnline ? "Online" : "Offline");
```

---

## 7. Event Handling

### Basic Events
```jsx
function Button() {
  function handleClick(e) {
    e.preventDefault();
    console.log("clicked", e.target);
  }
  return <button onClick={handleClick}>Click</button>;
}
```

### Common Event Types
```jsx
onClick         // Mouse click
onDoubleClick   // Double click
onChange        // Input/select value change
onSubmit        // Form submission
onKeyDown       // Key pressed
onKeyUp         // Key released
onFocus         // Element focused
onBlur          // Element loses focus
onMouseEnter    // Mouse enters element
onMouseLeave    // Mouse leaves element
onScroll        // Scroll event
onDragStart     // Drag begins
onDrop          // Drop event
```

### Passing Arguments
```jsx
// Arrow function in JSX
<button onClick={() => handleDelete(item.id)}>Delete</button>

// Using data attributes
<button data-id={item.id} onClick={handleDelete}>Delete</button>
function handleDelete(e) {
  const id = e.currentTarget.dataset.id;
}
```

### Synthetic Events
React wraps native browser events in a `SyntheticEvent` for cross-browser consistency. Key methods:
```jsx
e.preventDefault()    // Prevent default browser behavior
e.stopPropagation()  // Stop event bubbling
e.target             // Element that triggered the event
e.currentTarget      // Element the handler is attached to
e.nativeEvent        // The underlying native event
```

---

## 8. Conditional Rendering

### if Statement
```jsx
if (!isLoggedIn) return <Login />;
return <Dashboard />;
```

### Ternary Operator
```jsx
return isLoggedIn ? <Dashboard /> : <Login />;
```

### Logical AND (`&&`)
```jsx
return (
  <div>
    {hasError && <ErrorBanner message={error} />}
    <Content />
  </div>
);
```
> ⚠️ Avoid `count && <Component />` — if `count` is `0`, React renders `0`. Use `count > 0 && <Component />`.

### Nullish / Null Guard
```jsx
return user ? <Profile user={user} /> : null;
```

### Switch / Object Map Pattern
```jsx
const views = {
  home:     <Home />,
  about:    <About />,
  contact:  <Contact />,
};

return views[currentView] ?? <NotFound />;
```

---

## 9. Lists & Keys

### Rendering Lists
```jsx
const fruits = ["Apple", "Banana", "Cherry"];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
);
```

### Key Rules
- Keys must be **unique among siblings**
- Use **stable IDs** from data (not array index if list can reorder/filter)
- Keys are not accessible as props in the child component

### When Index as Key is Acceptable
```jsx
// OK: static, non-reorderable list
{staticTabs.map((tab, i) => <Tab key={i} label={tab} />)}

// BAD: dynamic lists that reorder, add, or delete items
```

### Rendering Components from Data
```jsx
const users = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob",   role: "User" },
];

return (
  <ul>
    {users.map(user => (
      <UserRow key={user.id} {...user} />
    ))}
  </ul>
);
```

---

## 10. Forms & Controlled Components

### Controlled Input
```jsx
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

### Controlled Form (Multiple Fields)
```jsx
function SignupForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email"    value={form.email}    onChange={handleChange} />
      <input name="password" value={form.password} onChange={handleChange} type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Checkbox & Radio
```jsx
// Checkbox
<input
  type="checkbox"
  checked={isChecked}
  onChange={e => setIsChecked(e.target.checked)}
/>

// Radio
<input
  type="radio"
  value="option1"
  checked={selected === "option1"}
  onChange={e => setSelected(e.target.value)}
/>
```

### Select
```jsx
<select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

### Uncontrolled Input (useRef)
```jsx
function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="initial" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 11. Refs

### Accessing DOM Nodes
```jsx
const divRef = useRef(null);

useEffect(() => {
  console.log(divRef.current.offsetWidth);
}, []);

return <div ref={divRef}>Measured</div>;
```

### Callback Refs
```jsx
function MeasuredDiv() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node) setHeight(node.getBoundingClientRect().height);
  }, []);

  return <div ref={measuredRef}>Height: {height}px</div>;
}
```

### forwardRef
```jsx
const Input = forwardRef(function Input({ label, ...props }, ref) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
    </label>
  );
});

// Parent
const inputRef = useRef();
<Input ref={inputRef} label="Name" />
inputRef.current.focus();
```

---

## 12. Context API

### Create & Provide
```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light"); // default value

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

### Consume with useContext
```jsx
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === "dark" ? "#333" : "#fff" }}
      onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
    >
      Toggle Theme
    </button>
  );
}
```

### Pattern: Custom Hook for Context
```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
```

---

## 13. Component Lifecycle (Class)

```
Mount  →  Update  →  Unmount
```

| Phase | Method | Notes |
|---|---|---|
| Mount | `constructor()` | Initialize state, bind methods |
| Mount | `render()` | Return JSX |
| Mount | `componentDidMount()` | Fetch data, add listeners |
| Update | `shouldComponentUpdate(nextProps, nextState)` | Return false to skip render |
| Update | `render()` | Re-render |
| Update | `componentDidUpdate(prevProps, prevState)` | React to prop/state changes |
| Unmount | `componentWillUnmount()` | Cleanup timers, subscriptions |
| Error | `componentDidCatch(error, info)` | Handle errors in children |
| Error | `getDerivedStateFromError(error)` | Render fallback UI |

### Functional Equivalents
```
componentDidMount     → useEffect(() => {}, [])
componentDidUpdate    → useEffect(() => {}, [dep])
componentWillUnmount  → useEffect(() => { return () => cleanup(); }, [])
shouldComponentUpdate → React.memo + useMemo/useCallback
```

---

## 14. Performance Optimization

### React.memo
```jsx
// Prevents re-render if props haven't changed
const UserCard = React.memo(function UserCard({ user }) {
  return <p>{user.name}</p>;
});

// Custom comparison
const UserCard = React.memo(UserCard, (prev, next) => {
  return prev.user.id === next.user.id;
});
```

### useMemo
```jsx
// Memoize expensive computations
const total = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price, 0);
}, [cart]);
```

### useCallback
```jsx
// Stable function reference for child components / effect deps
const handleAdd = useCallback((item) => {
  setCart(prev => [...prev, item]);
}, []); // no deps → always same reference
```

### Code Splitting with lazy + Suspense
```jsx
const Dashboard = lazy(() => import("./Dashboard"));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

### Virtualization (Long Lists)
```jsx
// Use react-window or react-virtual for huge lists
import { FixedSizeList } from "react-window";

<FixedSizeList height={600} itemCount={10000} itemSize={35}>
  {({ index, style }) => (
    <div style={style}>Row {index}</div>
  )}
</FixedSizeList>
```

### Keys & Reconciliation Tips
- Stable, unique keys prevent unnecessary unmount/remount
- Avoid creating new objects/arrays in render (breaks memoization)
- Keep component trees shallow when possible
- Split large components into smaller ones

---

## 15. Custom Hooks

Custom hooks are **functions starting with `use`** that encapsulate stateful logic.

### useFetch
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => { if (!cancelled) setData(data); })
      .catch(err => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch("/api/users");
```

### useLocalStorage
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = (val) => {
    setValue(val);
    window.localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setStoredValue];
}
```

### useDebounce
```jsx
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

### useWindowSize
```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
}
```

### useOnClickOutside
```jsx
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}
```

---

## 16. Higher-Order Components (HOC)

```jsx
// A function that takes a component and returns an enhanced component
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### HOC Rules
- Don't mutate the original component
- Pass through unrelated props with `{...props}`
- Wrap displayName for DevTools: `AuthenticatedComponent.displayName = \`withAuth(\${WrappedComponent.displayName})\``
- Modern React prefers custom hooks over HOCs

---

## 17. Render Props

```jsx
// Component accepts a function as `render` prop
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />

// Also works with children-as-function
<MouseTracker>
  {({ x, y }) => <p>Mouse: {x}, {y}</p>}
</MouseTracker>
```

---

## 18. Error Boundaries

> Must be a **class component**. Can be wrapped around any part of the tree.

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong: {this.state.error.message}</h2>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>
```

> ⚠️ Error boundaries do **not** catch errors in: event handlers, async code, SSR, or errors in the boundary itself.

---

## 19. Portals

Render children outside the parent DOM hierarchy (e.g., modals, tooltips).

```jsx
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") // target DOM node
  );
}
```

```html
<!-- index.html -->
<div id="root"></div>
<div id="modal-root"></div>
```

---

## 20. Suspense & Lazy Loading

### Lazy Component Loading
```jsx
import { lazy, Suspense } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Data Fetching with Suspense (React 18 + frameworks)
```jsx
// Requires Suspense-compatible data fetching (e.g. Next.js, React Query v5, SWR)
function Profile() {
  const user = use(fetchUser()); // React 19 `use()` hook
  return <p>{user.name}</p>;
}

<Suspense fallback={<Skeleton />}>
  <Profile />
</Suspense>
```

---

## 21. TypeScript with React

### Typing Props
```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", disabled = false }) => (
  <button className={variant} onClick={onClick} disabled={disabled}>
    {label}
  </button>
);
```

### Typing useState
```tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

### Typing useRef
```tsx
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
```

### Typing Events
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {};
```

### Typing Children
```tsx
type Props = {
  children: React.ReactNode;       // Any renderable content
  child: React.ReactElement;       // Single React element
  render: () => React.ReactNode;   // Render prop
};
```

### Typing useReducer
```tsx
type State = { count: number };
type Action = { type: "inc" } | { type: "dec" } | { type: "reset"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "inc":   return { count: state.count + 1 };
    case "dec":   return { count: state.count - 1 };
    case "reset": return { count: action.payload };
  }
}
```

### Typing Context
```tsx
type ThemeContextType = {
  theme: "light" | "dark";
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
```

---

## 22. Common Patterns & Best Practices

### Component Folder Structure
```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
      Button.module.css
      index.ts         ← re-export
  hooks/
    useFetch.ts
  context/
    AuthContext.tsx
  pages/
    Home.tsx
  utils/
    formatDate.ts
```

### Derived State (Compute, Don't Store)
```jsx
// ❌ Don't sync derived state
const [fullName, setFullName] = useState(`${first} ${last}`);

// ✅ Compute from existing state
const fullName = `${first} ${last}`;
```

### Lifting State Up
```jsx
// Move shared state to the closest common ancestor
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <List onSelect={setSelected} />
      <Detail item={selected} />
    </>
  );
}
```

### Colocation
> Keep state as close to where it's used as possible.
> Only lift state when necessary for sharing.

### Avoid useEffect for Everything
```jsx
// ❌ Don't use useEffect to transform state
useEffect(() => setFiltered(items.filter(i => i.active)), [items]);

// ✅ Derive it directly
const filtered = items.filter(i => i.active);
```

### Stale Closures Trap
```jsx
// ❌ Stale closure — captures old count
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []); // count never updates inside

// ✅ Use functional updater or include dep
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```

### Immutability
```jsx
// ❌ Direct mutation
state.user.name = "Bob";
setState(state);

// ✅ Create new references
setState(prev => ({ ...prev, user: { ...prev.user, name: "Bob" } }));
```

### Key Quick-Reference

| Hook | When to Use |
|---|---|
| `useState` | Local UI state |
| `useReducer` | Complex state with multiple sub-values or actions |
| `useEffect` | Side effects (fetch, subscriptions, timers) |
| `useMemo` | Expensive computations |
| `useCallback` | Stable function references passed to memoized children |
| `useRef` | DOM access, mutable value without re-render |
| `useContext` | Global/shared data without prop drilling |
| `useTransition` | Non-urgent state updates (React 18) |

---

---

## 23. Zod — Schema Validation

> Zod is a TypeScript-first schema declaration and validation library. Commonly used with React forms, API responses, and environment variables.

```bash
npm install zod
```

---

### Basic Primitives
```ts
import { z } from "zod";

z.string()
z.number()
z.boolean()
z.date()
z.undefined()
z.null()
z.any()
z.unknown()
z.never()
z.void()
```

### String Validations
```ts
z.string().min(3)
z.string().max(100)
z.string().length(10)
z.string().email()
z.string().url()
z.string().uuid()
z.string().regex(/^[a-z]+$/)
z.string().startsWith("https://")
z.string().endsWith(".com")
z.string().trim()
z.string().toLowerCase()
z.string().nonempty()            // shorthand for .min(1)
z.string().optional()            // string | undefined
z.string().nullable()            // string | null
```

### Number Validations
```ts
z.number().min(0)
z.number().max(100)
z.number().positive()            // > 0
z.number().negative()            // < 0
z.number().nonnegative()         // >= 0
z.number().int()                 // integer only
z.number().finite()
z.number().multipleOf(5)
```

---

### Object Schemas
```ts
const UserSchema = z.object({
  id:        z.number(),
  name:      z.string().min(1),
  email:     z.string().email(),
  age:       z.number().int().min(0).optional(),
  role:      z.enum(["admin", "user", "guest"]),
  createdAt: z.date(),
});

// Infer the TypeScript type from the schema
type User = z.infer<typeof UserSchema>;
```

### Object Modifiers
```ts
const schema = z.object({ name: z.string(), age: z.number() });

schema.partial()                 // all fields optional
schema.partial({ age: true })    // only age optional
schema.required()                // all fields required
schema.pick({ name: true })      // only name
schema.omit({ age: true })       // everything except age
schema.extend({ email: z.string().email() }) // add fields
schema.merge(otherSchema)        // merge two object schemas
schema.strip()                   // (default) remove unknown keys
schema.strict()                  // error on unknown keys
schema.passthrough()             // allow unknown keys through
```

---

### Arrays
```ts
z.array(z.string())              // string[]
z.array(z.string()).min(1)
z.array(z.string()).max(10)
z.array(z.string()).length(3)    // exactly 3 items
z.array(z.string()).nonempty()   // at least 1

// Typed tuple
z.tuple([z.string(), z.number(), z.boolean()])
```

---

### Unions & Intersections
```ts
// Union — one of several types
const StringOrNumber = z.union([z.string(), z.number()]);
// Shorthand:
const StringOrNumber = z.string().or(z.number());

// Discriminated union — faster, based on a literal field
const Result = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("error"),   message: z.string() }),
]);

// Intersection — must satisfy both
const Combined = z.intersection(SchemaA, SchemaB);
// Shorthand:
const Combined = SchemaA.and(SchemaB);
```

### Enums & Literals
```ts
// Zod enum (preferred for string unions)
const RoleSchema = z.enum(["admin", "user", "guest"]);
type Role = z.infer<typeof RoleSchema>; // "admin" | "user" | "guest"
RoleSchema.options; // ["admin", "user", "guest"]

// Literal — exact value
z.literal("dark")
z.literal(42)
z.literal(true)

// Native TS enum
enum Direction { Up, Down, Left, Right }
z.nativeEnum(Direction)
```

---

### Parsing & Validation
```ts
const schema = z.object({ name: z.string(), age: z.number() });

// parse — throws ZodError on failure
const result = schema.parse({ name: "Alice", age: 30 });

// safeParse — returns { success, data } or { success, error }
const result = schema.safeParse({ name: "Alice", age: "30" });

if (result.success) {
  console.log(result.data);       // typed & validated
} else {
  console.log(result.error);      // ZodError
}

// async versions
await schema.parseAsync(data);
await schema.safeParseAsync(data);
```

### Reading ZodError
```ts
const result = schema.safeParse(badData);

if (!result.success) {
  result.error.issues.forEach(issue => {
    console.log(issue.path);      // ["email"]
    console.log(issue.message);   // "Invalid email"
    console.log(issue.code);      // "invalid_string"
  });

  // Flatten for easy form error display
  const flat = result.error.flatten();
  // flat.fieldErrors → { email: ["Invalid email"] }
  // flat.formErrors  → top-level errors
}
```

---

### Transforms & Preprocessing
```ts
// Transform — parse then transform the value
const StringToNumber = z.string().transform(val => parseInt(val, 10));

// Refine — custom validation logic
const PasswordSchema = z.string().refine(
  val => val.length >= 8,
  { message: "Password must be at least 8 characters" }
);

// Refine with async
const UniqueEmail = z.string().email().refine(
  async email => !(await emailExists(email)),
  { message: "Email already in use" }
);

// Superrefine — multiple issues, full control
z.object({ password: z.string(), confirm: z.string() })
  .superRefine(({ password, confirm }, ctx) => {
    if (password !== confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm"],
      });
    }
  });

// Preprocess — coerce before validation
const CoercedNumber = z.preprocess(
  val => Number(val),
  z.number()
);
// Or use built-in coerce:
z.coerce.number()     // coerces string → number
z.coerce.string()
z.coerce.boolean()
z.coerce.date()
```

---

### Default Values & Optional Chaining
```ts
z.string().default("anonymous")
z.number().default(0)

// Optional (value | undefined) vs Nullable (value | null)
z.string().optional()       // string | undefined
z.string().nullable()       // string | null
z.string().nullish()        // string | null | undefined

// Unwrap optional/nullable back to base type
z.string().optional().unwrap() // → z.string()
```

---

### Records & Maps
```ts
// Record — object with dynamic string keys
const Scores = z.record(z.string(), z.number());
// { [key: string]: number }

// Map
const MapSchema = z.map(z.string(), z.number());

// Set
const SetSchema = z.set(z.string());
```

---

### React Hook Form Integration
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name:  z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  age:   z.coerce.number().int().min(18, "Must be 18+"),
});

type FormData = z.infer<typeof schema>;

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("age")} type="number" />
      {errors.age && <p>{errors.age.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Validating API Responses
```ts
const PostSchema = z.object({
  id:    z.number(),
  title: z.string(),
  body:  z.string(),
});

const PostsSchema = z.array(PostSchema);
type Post = z.infer<typeof PostSchema>;

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  const json = await res.json();
  return PostsSchema.parse(json); // throws if API shape changes
}
```

### Validating Environment Variables
```ts
// env.ts — validate at startup
const EnvSchema = z.object({
  VITE_API_URL:     z.string().url(),
  VITE_APP_VERSION: z.string(),
  NODE_ENV:         z.enum(["development", "production", "test"]),
});

export const env = EnvSchema.parse(import.meta.env);
// env.VITE_API_URL is now typed & validated
```

---

### Zod Quick Reference

| Method | Purpose |
|---|---|
| `z.infer<typeof Schema>` | Extract TypeScript type from schema |
| `.parse(data)` | Validate; throws on failure |
| `.safeParse(data)` | Validate; returns `{ success, data \| error }` |
| `.optional()` | Adds `\| undefined` |
| `.nullable()` | Adds `\| null` |
| `.default(val)` | Provides fallback value |
| `.transform(fn)` | Transform value after parsing |
| `.refine(fn, msg)` | Custom validation rule |
| `.superRefine(fn)` | Multiple custom issues |
| `z.coerce.*` | Coerce input type before validation |
| `.partial()` | All fields optional |
| `.pick() / .omit()` | Select/exclude fields |
| `.extend()` | Add fields to object schema |
| `.merge()` | Combine two object schemas |
| `.flatten()` | Flatten errors for form display |

---

## 24. Axios — HTTP Client

> Axios is a promise-based HTTP client with automatic JSON parsing, request/response interceptors, and better error handling than `fetch`.

```bash
npm install axios
```

---

### Basic Requests
```ts
import axios from "axios";

// GET
const res = await axios.get("/api/users");
console.log(res.data); // already parsed JSON

// POST
const res = await axios.post("/api/users", { name: "Alice", email: "alice@example.com" });

// PUT / PATCH
await axios.put("/api/users/1", { name: "Alice Updated" });
await axios.patch("/api/users/1", { name: "Alice Updated" });

// DELETE
await axios.delete("/api/users/1");
```

### Request Config
```ts
const res = await axios.get("/api/users", {
  params: { page: 1, limit: 10 },       // → /api/users?page=1&limit=10
  headers: { Authorization: "Bearer TOKEN" },
  timeout: 5000,                          // ms — AbortError after 5s
  signal: controller.signal,             // AbortController support
});
```

---

### Axios Instance (Recommended)
```ts
// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. "http://localhost:3001"
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

export default api;

// Usage — no need to repeat baseURL
import api from "@/lib/axios";
const res = await api.get("/users");
```

---

### Interceptors

#### Request Interceptor (e.g. attach auth token)
```ts
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
```

#### Response Interceptor (e.g. global error handling)
```ts
api.interceptors.response.use(
  (response) => response,             // 2xx — pass through
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

#### Removing an Interceptor
```ts
const id = api.interceptors.request.use(handler);
api.interceptors.request.eject(id);
```

---

### Error Handling
```ts
import axios from "axios";

try {
  const res = await api.get("/users/999");
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.status);   // 404
    console.log(error.response?.data);     // server error body
    console.log(error.request);            // request was made but no response
    console.log(error.message);            // "Request failed with status code 404"
  } else {
    // Non-Axios error
    throw error;
  }
}
```

### Error Handling Helper
```ts
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return "An unknown error occurred";
}
```

---

### Cancellation (AbortController)
```ts
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    api.get("/search", { params: { q: query }, signal: controller.signal })
      .then(res => setResults(res.data))
      .catch(err => {
        if (axios.isCancel(err)) return; // ignore cancellation
        console.error(err);
      });

    return () => controller.abort(); // cancel on cleanup
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

---

### Uploading Files
```ts
const formData = new FormData();
formData.append("avatar", file);       // File from <input type="file">
formData.append("userId", "42");

await api.post("/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
  onUploadProgress: (event) => {
    const percent = Math.round((event.loaded * 100) / (event.total ?? 1));
    setProgress(percent);
  },
});
```

### Downloading Files
```ts
const res = await api.get("/report.pdf", { responseType: "blob" });
const url = URL.createObjectURL(res.data);
const a = document.createElement("a");
a.href = url;
a.download = "report.pdf";
a.click();
URL.revokeObjectURL(url);
```

---

### Typed Responses with TypeScript
```ts
type User = { id: number; name: string; email: string };

// Generic on the data type
const res = await api.get<User[]>("/users");
const users: User[] = res.data; // fully typed

const res = await api.post<User>("/users", { name: "Alice", email: "a@b.com" });
const newUser: User = res.data;
```

### With Zod Validation
```ts
const res = await api.get("/users");
const users = UsersSchema.parse(res.data); // validate API shape at runtime
```

---

### Axios + React Custom Hook
```ts
function useAxios<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    api.get<T>(url, { signal: controller.signal })
      .then(res => setData(res.data))
      .catch(err => {
        if (!axios.isCancel(err)) setError(getErrorMessage(err));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data: users, loading } = useAxios<User[]>("/users");
```

---

### Axios Quick Reference

| Method | Usage |
|---|---|
| `axios.get(url, config)` | Fetch data |
| `axios.post(url, data, config)` | Create resource |
| `axios.put(url, data, config)` | Replace resource |
| `axios.patch(url, data, config)` | Partial update |
| `axios.delete(url, config)` | Delete resource |
| `axios.create(config)` | Create a custom instance |
| `axios.isAxiosError(err)` | Type-guard for Axios errors |
| `axios.isCancel(err)` | True if request was cancelled |
| `instance.interceptors.request.use()` | Attach request middleware |
| `instance.interceptors.response.use()` | Attach response middleware |
| `config.params` | Query string parameters |
| `config.signal` | AbortController signal |
| `config.responseType` | `"json"` \| `"blob"` \| `"arraybuffer"` \| `"text"` |

---

## 25. json-server — Mock REST API

> json-server turns a plain JSON file into a full REST API in seconds — perfect for prototyping and front-end development without a real backend.

```bash
npm install -D json-server
```

---

### Setup

#### 1. Create `db.json`
```json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com", "role": "admin" },
    { "id": 2, "name": "Bob",   "email": "bob@example.com",   "role": "user" }
  ],
  "posts": [
    { "id": 1, "title": "Hello World", "body": "First post", "userId": 1 },
    { "id": 2, "title": "React Tips",  "body": "Use hooks!",  "userId": 2 }
  ],
  "comments": [
    { "id": 1, "text": "Great post!", "postId": 1, "userId": 2 }
  ]
}
```

#### 2. Add script to `package.json`
```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3001",
    "dev":    "vite",
    "start":  "concurrently \"npm run server\" \"npm run dev\""
  }
}
```

```bash
npm run server
# → Resources available at http://localhost:3001
```

---

### Auto-Generated REST Endpoints

For each top-level key in `db.json`, json-server creates:

| Method | URL | Action |
|---|---|---|
| `GET` | `/users` | Get all users |
| `GET` | `/users/1` | Get user by id |
| `POST` | `/users` | Create new user (id auto-assigned) |
| `PUT` | `/users/1` | Replace user (full update) |
| `PATCH` | `/users/1` | Partial update |
| `DELETE` | `/users/1` | Delete user |

---

### Filtering, Sorting & Pagination

```bash
# Filter by field value
GET /users?role=admin
GET /posts?userId=1

# Full-text search
GET /users?q=alice

# Sort (asc default)
GET /posts?_sort=title
GET /posts?_sort=title&_order=desc

# Pagination
GET /posts?_page=1&_per_page=10

# Limit & offset (alternative)
GET /posts?_limit=5&_start=10

# Select specific fields
GET /users?_fields=id,name

# Exclude fields
GET /users?_omit=email
```

### Relationships
```bash
# Expand related resource (_embed / _expand)
GET /posts?_embed=comments      # include comments inside each post
GET /comments?_expand=post      # include parent post in each comment

# Nested routes
GET /posts/1/comments            # comments belonging to post 1
```

---

### Custom Routes (`routes.json`)
```json
{
  "/api/*":        "/$1",
  "/blog/:id":     "/posts/:id",
  "/users/:id/profile": "/users/:id"
}
```

```bash
json-server --watch db.json --routes routes.json --port 3001
```

Now `/api/users` maps to `/users`.

---

### Custom Middleware (`server.js`)
```js
// server.js — for full control
import jsonServer from "json-server";

const server   = jsonServer.create();
const router   = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Add authentication middleware
server.use((req, res, next) => {
  if (req.method !== "GET" && !req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Add artificial delay (simulate real network)
server.use((req, res, next) => {
  setTimeout(next, 300);
});

server.use(middlewares);
server.use(router);
server.listen(3001, () => console.log("JSON Server running on port 3001"));
```

```bash
node server.js
```

---

### Seeding / Generating Data with faker
```bash
npm install -D @faker-js/faker
```

```js
// seed.js
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

const db = {
  users: Array.from({ length: 20 }, (_, i) => ({
    id:    i + 1,
    name:  faker.person.fullName(),
    email: faker.internet.email(),
    role:  faker.helpers.arrayElement(["admin", "user", "guest"]),
  })),
  posts: Array.from({ length: 50 }, (_, i) => ({
    id:     i + 1,
    title:  faker.lorem.sentence(),
    body:   faker.lorem.paragraph(),
    userId: faker.number.int({ min: 1, max: 20 }),
  })),
};

writeFileSync("db.json", JSON.stringify(db, null, 2));
console.log("✅ db.json seeded");
```

```bash
node seed.js
```

---

### Using with Axios Instance
```ts
// src/lib/axios.ts
const api = axios.create({
  baseURL: "http://localhost:3001",
});

// CRUD helpers
export const getUsers    = ()      => api.get<User[]>("/users");
export const getUser     = (id: number) => api.get<User>(`/users/${id}`);
export const createUser  = (data: Omit<User, "id">) => api.post<User>("/users", data);
export const updateUser  = (id: number, data: Partial<User>) => api.patch<User>(`/users/${id}`, data);
export const deleteUser  = (id: number) => api.delete(`/users/${id}`);
```

---

### json-server Quick Reference

| Feature | Syntax |
|---|---|
| Filter by field | `?field=value` |
| Full-text search | `?q=term` |
| Sort | `?_sort=field&_order=asc\|desc` |
| Paginate | `?_page=1&_per_page=10` |
| Limit / Offset | `?_limit=5&_start=0` |
| Select fields | `?_fields=id,name` |
| Embed children | `?_embed=comments` |
| Expand parent | `?_expand=user` |
| Nested resource | `GET /posts/1/comments` |

---

## 26. Zustand — State Management

> Zustand is a minimal, flexible global state manager for React. No boilerplate, no providers needed (unless using context), just a hook.

```bash
npm install zustand
```

---

### Basic Store
```ts
import { create } from "zustand";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset:     () => void;
};

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset:     () => set({ count: 0 }),
}));

// Usage in any component — no Provider needed
function Counter() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

---

### Selecting State (Avoid Unnecessary Re-renders)
```ts
// ✅ Subscribe to only what you need
const count     = useCounterStore((state) => state.count);
const increment = useCounterStore((state) => state.increment);

// ❌ Subscribes to entire store — re-renders on any change
const store = useCounterStore();
```

### Selecting Multiple Values
```ts
import { useShallow } from "zustand/react/shallow";

// Re-renders only when count or status actually change
const { count, status } = useCounterStore(
  useShallow((state) => ({ count: state.count, status: state.status }))
);
```

---

### Async Actions
```ts
type UserStore = {
  users:   User[];
  loading: boolean;
  error:   string | null;
  fetchUsers: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  users:   [],
  loading: false,
  error:   null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<User[]>("/users");
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: getErrorMessage(err), loading: false });
    }
  },
}));

// Usage
function UserList() {
  const { users, loading, fetchUsers } = useUserStore();

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  if (loading) return <Spinner />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

### Updating Nested State
```ts
type ProfileStore = {
  user: { name: string; age: number; address: { city: string } };
  setCity: (city: string) => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  user: { name: "Alice", age: 30, address: { city: "NYC" } },

  setCity: (city) =>
    set((state) => ({
      user: {
        ...state.user,
        address: { ...state.user.address, city },
      },
    })),
}));
```

### With Immer (Mutable Syntax for Nested Updates)
```bash
npm install immer
```
```ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useStore = create<ProfileStore>()(
  immer((set) => ({
    user: { name: "Alice", age: 30, address: { city: "NYC" } },

    setCity: (city) =>
      set((state) => {
        state.user.address.city = city; // mutate directly — Immer handles immutability
      }),
  }))
);
```

---

### Middleware

#### `persist` — Sync to localStorage / sessionStorage
```ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme:    "light",
      language: "en",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name:    "settings",                           // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }), // only persist theme
    }
  )
);
```

#### `devtools` — Redux DevTools Integration
```ts
import { devtools } from "zustand/middleware";

const useStore = create<Store>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((s) => ({ count: s.count + 1 }), false, "increment"),
      //                                                     ↑ replace  ↑ action name in DevTools
    }),
    { name: "CounterStore" }
  )
);
```

#### Combining Middleware
```ts
const useStore = create<Store>()(
  devtools(
    persist(
      immer((set) => ({
        // your store
      })),
      { name: "my-store" }
    )
  )
);
```

---

### Accessing Store Outside Components
```ts
// Read state
const count = useCounterStore.getState().count;

// Write state
useCounterStore.setState({ count: 0 });
useCounterStore.setState((state) => ({ count: state.count + 1 }));

// Subscribe to changes (returns unsubscribe function)
const unsubscribe = useCounterStore.subscribe(
  (state) => console.log("count changed:", state.count)
);
unsubscribe(); // stop listening
```

---

### Slices Pattern (Large Stores)
```ts
// slices/counterSlice.ts
type CounterSlice = {
  count: number;
  increment: () => void;
};

const createCounterSlice = (set: any): CounterSlice => ({
  count: 0,
  increment: () => set((s: any) => ({ count: s.count + 1 })),
});

// slices/authSlice.ts
type AuthSlice = {
  user: User | null;
  login:  (user: User) => void;
  logout: () => void;
};

const createAuthSlice = (set: any): AuthSlice => ({
  user: null,
  login:  (user) => set({ user }),
  logout: () => set({ user: null }),
});

// store.ts — combine slices
type RootStore = CounterSlice & AuthSlice;

const useStore = create<RootStore>()((...args) => ({
  ...createCounterSlice(...args),
  ...createAuthSlice(...args),
}));

export const useCounter = () => useStore((s) => ({ count: s.count, increment: s.increment }));
export const useAuth    = () => useStore((s) => ({ user: s.user, login: s.login, logout: s.logout }));
```

---

### Reset Store to Initial State
```ts
const initialState = { count: 0, user: null };

const useStore = create<Store>()((set) => ({
  ...initialState,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset:     () => set(initialState),
}));
```

---

### Zustand vs Context API

| | Zustand | Context API |
|---|---|---|
| Boilerplate | Minimal | Medium (Provider + hook) |
| Re-render control | Fine-grained selectors | Re-renders all consumers |
| Async actions | Built-in | Manual with useReducer/useEffect |
| DevTools | Yes (devtools middleware) | React DevTools only |
| Persistence | Yes (persist middleware) | Manual |
| Best for | Global app state | Config/theme/auth passed down tree |

---

### Zustand Quick Reference

| API | Usage |
|---|---|
| `create<T>()(fn)` | Create a store |
| `set(partial \| fn)` | Update state |
| `get()` | Read state inside actions |
| `useStore(selector)` | Subscribe to a slice of state |
| `useShallow(selector)` | Shallow-equal selector for objects |
| `useStore.getState()` | Read state outside React |
| `useStore.setState()` | Write state outside React |
| `useStore.subscribe(fn)` | Watch for changes outside React |
| `persist(fn, opts)` | Persist state to storage |
| `devtools(fn, opts)` | Connect to Redux DevTools |
| `immer(fn)` | Enable mutable state syntax |

---

*Generated with ❤️ — React 18+ — Last updated March 2026*
