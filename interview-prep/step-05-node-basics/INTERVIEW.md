# Step 5 — Node.js Fundamentals

## Must-Know Questions

### 1. What is Node.js?
JavaScript runtime on V8. **Single-threaded** event loop, non-blocking I/O.

### 2. Event Loop phases?
timers → pending callbacks → idle → poll → check → close callbacks

### 3. CommonJS vs ES Modules?
- `require` / `module.exports` vs `import` / `export`
- Node supports both; `"type": "module"` in package.json for ESM

### 4. Streams?
Readable, Writable, Duplex, Transform — process data in chunks (memory efficient).

### 5. process.nextTick vs setImmediate?
`nextTick` runs before next event loop phase (microtask-like priority).

---

## Run
```bash
node step-05-node-basics/01-event-loop.js
node step-05-node-basics/02-streams.js
```
