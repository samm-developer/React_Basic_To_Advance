# Step 3 — React Hooks (Deep Dive)

## Must-Know Questions

### 1. Rules of Hooks?
- Only call at **top level** (not in loops/conditions)
- Only call from **React functions** (components or custom hooks)

### 2. useState vs useReducer?
`useReducer` when state logic is complex or next state depends on previous in non-trivial ways.

### 3. useEffect — dependency array?
- `[]` → mount only
- `[a, b]` → run when a or b changes
- omitted → every render (usually a bug)

### 4. useMemo vs useCallback?
- `useMemo` → memoize a **computed value**
- `useCallback` → memoize a **function reference**

### 5. useRef use cases?
DOM access, storing mutable values without re-render, previous value tracking.

### 6. Custom hooks — why?
Extract and reuse **stateful logic** (not UI). Must start with `use`.

---

## Study Files
- `01-core-hooks.jsx`
- `02-custom-hooks.jsx`
- `03-useEffect-patterns.jsx`

## Exercise
Build `useFetch(url)` custom hook with loading, data, error states.
