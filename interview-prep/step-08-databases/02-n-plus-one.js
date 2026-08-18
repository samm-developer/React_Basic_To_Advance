/**
 * STEP 8 — N+1 queries (very common interview question)
 * Run: npm run step8:n1
 */

import Database from "better-sqlite3";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const db = new Database(
  join(dirname(fileURLToPath(import.meta.url)), "interview.db")
);

const users = db.prepare("SELECT id, name FROM users").all();

console.log("\n--- BAD: N+1 ---");
let extraQueries = 0;
const nPlusOne = users.map((user) => {
  extraQueries += 1;
  const posts = db
    .prepare("SELECT title FROM posts WHERE user_id = ?")
    .all(user.id);
  return { name: user.name, posts: posts.map((p) => p.title) };
});
console.log(nPlusOne);
console.log(`Queries: 1 (users) + ${extraQueries} (posts) = ${1 + extraQueries}`);

console.log("\n--- GOOD: one JOIN ---");
const rows = db
  .prepare(
    `SELECT users.name, posts.title
     FROM users
     LEFT JOIN posts ON posts.user_id = users.id
     ORDER BY users.id`
  )
  .all();

const grouped = new Map();
for (const row of rows) {
  if (!grouped.has(row.name)) grouped.set(row.name, []);
  if (row.title) grouped.get(row.name).push(row.title);
}
console.log([...grouped.entries()].map(([name, posts]) => ({ name, posts })));
console.log("Queries: 1");

db.close();
