/**
 * STEP 1 — `this` BINDING & PROTOTYPES
 * Run: node step-01-javascript/03-this-and-prototypes.js
 */

// ─── 1. Default binding (strict mode in modules) ─────────────────────────────
function showThis() {
  console.log("default this:", this); // global object in non-strict scripts
}
showThis();

// ─── 2. Implicit binding ─────────────────────────────────────────────────────
const user = {
  name: "Shashwat",
  greet() {
    console.log("Hi, I'm", this.name);
  },
};
user.greet(); // this → user

// Lost context — common interview question
const greetFn = user.greet;
// greetFn(); // TypeError or wrong `this` in browser

// Fix with bind
greetFn.bind(user)();

// ─── 3. Arrow functions — lexical `this` ─────────────────────────────────────
const team = {
  name: "Engineering",
  members: ["Alice", "Bob"],
  listMembers() {
    this.members.forEach((member) => {
      // arrow inherits `this` from listMembers
      console.log(`${member} @ ${this.name}`);
    });
  },
};
team.listMembers();

// ─── 4. Prototype chain ──────────────────────────────────────────────────────
function Person(name) {
  this.name = name;
  // Own property (on the instance) — hasOwnProperty("sayHi") === true
  this.sayHi = function () {
    return `Hello, ${this.name}`;
  };
}

const p = new Person("Dev");
console.log("\nOwn method:", p.sayHi());
console.log("instanceof Person:", p instanceof Person);
console.log("Has own sayHi?", p.hasOwnProperty("sayHi")); // true — set on the instance

// ─── 5. Class syntax (syntactic sugar over prototypes) ───────────────────────
class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }
  describe() {
    return `${this.sayHi()} — ${this.role}`;
  }
}

const emp = new Employee("Shashwat", "Senior Dev");
console.log(emp.describe());
