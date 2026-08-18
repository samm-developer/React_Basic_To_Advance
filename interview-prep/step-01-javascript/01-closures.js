/**
 * STEP 1 — CLOSURES
 * Run: node step-01-javascript/01-closures.js
 *
 * INTERVIEW TIP: Always mention lexical scope + practical use cases.
 */

// ─── Example 1: Basic closure ───────────────────────────────────────────────
function createCounter() {
  let count = 0; // private — not accessible from outside
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log("Counter:", counter.increment(), counter.increment(), counter.getCount());
// count is NOT accessible: counter.count → undefined

// ─── Example 2: Classic interview trap — loop + var ─────────────────────────
console.log("\n--- Loop trap (var) ---");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 0); // prints 3, 3, 3
}

console.log("\n--- Fixed with let ---");
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 0); // prints 0, 1, 2
}

// ─── Example 3: Module pattern (data privacy) ───────────────────────────────
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount > 0) balance += amount;
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) balance -= amount;
    },
    getBalance: () => balance,
  };
}

const account = createBankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log("\nBank balance:", account.getBalance()); // 120

// ─── Example 4: Factory function ────────────────────────────────────────────
function createUser(role) {
  const permissions = role === "admin" ? ["read", "write", "delete"] : ["read"];

  return {
    role,
    can(action) {
      return permissions.includes(action);
    },
  };
}

const admin = createUser("admin");
console.log("\nAdmin can delete?", admin.can("delete")); // true
