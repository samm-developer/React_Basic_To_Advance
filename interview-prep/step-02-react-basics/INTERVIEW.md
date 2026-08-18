# Step 2 — React Fundamentals

## Must-Know Questions

### 1. What is React? Virtual DOM?
React is a UI library. It builds a **Virtual DOM** (JS object tree), diffs it against the previous tree (**reconciliation**), and updates only changed real DOM nodes.

### 2. Controlled vs Uncontrolled components?
- **Controlled:** React state is the single source of truth (`value` + `onChange`)
- **Uncontrolled:** DOM holds state (`useRef` + `.current.value`)

### 3. Props vs State?
- **Props:** read-only, passed parent → child
- **State:** mutable within component, triggers re-render

### 4. Keys in lists — why?
Help React identify which items changed/added/removed. **Never use index as key** if list can reorder.

### 5. Lifting state up?
When siblings need shared data, move state to their closest common parent.

### 6. Conditional rendering patterns?
`&&`, ternary, early return, separate components.

---

## Study Files
- `01-components.jsx` — props, children, composition
- `02-controlled-forms.jsx` — forms, validation
- `03-lifting-state.jsx` — shared state pattern

## Exercise
Build a Todo list: add, toggle complete, delete. Use lifted state in parent.
