/**
 * STEP 8 — SQL CRUD (SQLite — no extra DB server)
 * Run: npm run step8:sql
 *
 * Same ideas as Postgres: tables, PK/FK, indexes, parameterized queries, transactions.
 */

import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
mkdirSync(dir, { recursive: true });
const db = new Database(join(dir, "interview.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
`);

const insertUser = db.prepare(
  "INSERT OR IGNORE INTO users (email, name) VALUES (?, ?)"
);
const insertPost = db.prepare(
  "INSERT INTO posts (user_id, title) VALUES (?, ?)"
);
const findUserByEmail = db.prepare("SELECT * FROM users WHERE email = ?");

db.transaction(() => {
  insertUser.run("alice@example.com", "Alice");
  insertUser.run("bob@example.com", "Bob");

  const alice = findUserByEmail.get("alice@example.com");
  const bob = findUserByEmail.get("bob@example.com");

  db.prepare("DELETE FROM posts").run();
  insertPost.run(alice.id, "Closures in JS");
  insertPost.run(alice.id, "JWT auth");
  insertPost.run(bob.id, "Event loop");
})();

const users = db.prepare("SELECT id, email, name FROM users").all();
const posts = db
  .prepare(
    `SELECT posts.title, users.name AS author
     FROM posts
     JOIN users ON users.id = posts.user_id
     ORDER BY posts.id`
  )
  .all();

console.log("Users:", users);
console.log("Posts with authors (JOIN):", posts);

db.close();
