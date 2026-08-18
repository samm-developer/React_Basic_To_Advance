/**
 * STEP 5 — Event Loop (run and predict output first!)
 * Run: node step-05-node-basics/01-event-loop.js
 */

console.log("1: sync start");

setTimeout(() => console.log("6: setTimeout 0"), 0);
setImmediate(() => console.log("7: setImmediate"));

process.nextTick(() => console.log("3: nextTick"));

Promise.resolve().then(() => console.log("4: promise microtask"));

setTimeout(() => {
  console.log("8: setTimeout inner");
  process.nextTick(() => console.log("9: nextTick inside setTimeout"));
}, 0);

console.log("2: sync end");

/**
 * INTERVIEW ANSWER (typical order):
 * 1, 2, 3, 4, 6, 9, 7, 8  (setImmediate vs setTimeout(0) order can vary)
 *
 * Key points:
 * - Sync code runs first
 * - process.nextTick before Promise microtasks (in Node)
 * - Microtasks before macrotasks
 * - setImmediate runs in check phase, after poll
 */
