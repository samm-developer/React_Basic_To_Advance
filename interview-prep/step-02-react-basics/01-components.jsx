/**
 * STEP 2 — Components, Props, Composition
 *
 * These are study files — paste into a Vite/CRA app or read as reference.
 * Key interview concepts are marked with // Q:
 */

import { useState } from "react";

// ─── Functional component (modern standard) ───────────────────────────────────
// Q: Why functional over class? Hooks, less boilerplate, easier testing.
function Greeting({ name, role = "Developer" }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Role: {role}</p>
    </div>
  );
}

// ─── Children & composition (preferred over inheritance) ──────────────────────
// Q: How do you share UI without HOCs? → Composition + children/render props
function Card({ title, children, footer }) {
  return (
    <article className="card">
      <header>{title}</header>
      <section>{children}</section>
      {footer && <footer>{footer}</footer>}
    </article>
  );
}

function App() {
  return (
    <Card title="Interview Prep" footer={<button>Save</button>}>
      <p>Study React + Node step by step.</p>
    </Card>
  );
}

// ─── Prop drilling vs Context (preview) ─────────────────────────────────────
// Q: When does prop drilling become a problem? → 3+ levels; use Context or state lib
function GrandParent() {
  const [theme, setTheme] = useState("light");
  return <Parent theme={theme} setTheme={setTheme} />;
}

function Parent({ theme, setTheme }) {
  return <Child theme={theme} setTheme={setTheme} />;
}

function Child({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle {theme}
    </button>
  );
}

export { Greeting, Card, App, GrandParent };
