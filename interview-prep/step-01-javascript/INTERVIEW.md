# Step 1 — JavaScript Core (Interview Questions)

## Must-Know Questions

### 1. What is a closure?
A function that remembers variables from its **lexical scope** even after the outer function has returned.

**Follow-up:** Used for data privacy, factory functions, debounce/throttle.

### 2. Difference between `==` and `===`?
`===` checks value **and** type. `==` coerces types before comparing.

### 3. Explain the Event Loop
Call Stack → Microtask Queue (Promises) → Macrotask Queue (setTimeout).  
Microtasks run **before** the next macrotask.

### 4. `var` vs `let` vs `const`?
- `var`: function-scoped, hoisted
- `let`/`const`: block-scoped; `const` binding is immutable (object contents can change)

### 5. What is `this`?
Depends on **how** a function is called: default binding, implicit (object.method), explicit (call/apply/bind), `new` binding, arrow functions (lexical `this`).

### 6. Promise vs async/await?
Same underlying mechanism. async/await is syntactic sugar; errors use try/catch instead of `.catch()`.

### 7. Debounce vs Throttle?
- **Debounce:** wait until user stops (search input)
- **Throttle:** run at most once per interval (scroll handler)

---

## Exercise (do before Step 2)

Implement `debounce(fn, delay)` and `deepClone(obj)` without libraries.
Answers in `03-exercises.js` (commented at bottom).
