/**
 * STEP 1 — EXERCISES (try yourself first!)
 * Run: node step-01-javascript/04-exercises.js
 */

// ─── YOUR TURN: Implement these before scrolling down ───────────────────────

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (inThrottle) return;
    fn.apply(this, args);
    inThrottle = true;
    setTimeout(() => (inThrottle = false), limit);
  };
}

function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);

  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], seen);
  }
  return clone;
}

// ─── Quick tests ──────────────────────────────────────────────────────────────
const search = debounce((q) => console.log("Searching:", q), 300);
search("a");
search("ab");
search("abc"); // only "abc" prints after 300ms

const logScroll = throttle(() => console.log("Scroll fired"), 1000);

const original = { a: 1, b: { c: [2, 3] }, d: new Date() };
const cloned = deepClone(original);
cloned.b.c.push(99);
console.log("\nDeep clone test:", original.b.c, "vs", cloned.b.c);
