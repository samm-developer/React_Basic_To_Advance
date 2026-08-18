/**
 * STEP 1 — PROMISES & ASYNC/AWAIT
 * Run: node step-01-javascript/02-promises-async.js
 */

const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

// ─── Promise chaining ─────────────────────────────────────────────────────────
delay(100, "Step 1")
  .then((msg) => {
    console.log(msg);
    return delay(100, "Step 2");
  })
  .then(console.log)
  .catch(console.error);

// ─── async/await equivalent ───────────────────────────────────────────────────
async function runPipeline() {
  try {
    const step1 = await delay(100, "Async Step 1");
    const step2 = await delay(100, "Async Step 2");
    console.log(step1, "→", step2);
  } catch (err) {
    console.error("Pipeline failed:", err);
  }
}
runPipeline();

// ─── Promise.all vs Promise.allSettled ────────────────────────────────────────
async function comparePromiseHelpers() {
  const tasks = [
    delay(50, "A"),
    Promise.reject(new Error("B failed")),
    delay(50, "C"),
  ];

  // Promise.all — fails fast on first rejection
  try {
    await Promise.all(tasks);
  } catch (e) {
    console.log("\nPromise.all failed:", e.message);
  }

  // Promise.allSettled — waits for all, returns status per promise
  const results = await Promise.allSettled(tasks);
  console.log("Promise.allSettled:", results.map((r) => r.status));
}

comparePromiseHelpers();

// ─── INTERVIEW: Output order question ─────────────────────────────────────────
console.log("\n--- Event loop order ---");
console.log("1 sync");
setTimeout(() => console.log("4 macrotask"), 0);
Promise.resolve().then(() => console.log("3 microtask"));
console.log("2 sync");
// Answer: 1, 2, 3, 4
