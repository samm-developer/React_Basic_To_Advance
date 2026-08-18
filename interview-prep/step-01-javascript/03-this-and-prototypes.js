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

// ─── 4. Prototype chain vs own property ──────────────────────────────────────

// A) Method on prototype — shared by all instances (memory efficient)
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  return `Hello, ${this.name}`;
};

const pProto = new Person("Dev");
console.log("\n[Prototype] sayHi:", pProto.sayHi());
console.log("[Prototype] instanceof Person:", pProto instanceof Person);
console.log("[Prototype] hasOwnProperty('sayHi')?", pProto.hasOwnProperty("sayHi")); // false

// B) Method on the instance — own property of that object
function PersonOwn(name) {
  this.name = name;
  this.sayHi = function () {
    return `Hello, ${this.name}`;
  };
}

const pOwn = new PersonOwn("Dev");
console.log("\n[Own] sayHi:", pOwn.sayHi());
console.log("[Own] instanceof PersonOwn:", pOwn instanceof PersonOwn);
console.log("[Own] hasOwnProperty('sayHi')?", pOwn.hasOwnProperty("sayHi")); // true

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
