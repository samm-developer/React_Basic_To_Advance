/**
 * STEP 6 — Express REST API (runnable interview example)
 * Run: npm run step6:server
 * Test: curl http://localhost:3000/api/users
 */

import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// In-memory "database"
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// ─── Middleware (Q: order matters!) ───────────────────────────────────────────
app.use(cors());
app.use(express.json()); // parse JSON body

// Request logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ─── REST Routes ──────────────────────────────────────────────────────────────
// GET    /api/users      → list
// GET    /api/users/:id  → get one
// POST   /api/users      → create
// PUT    /api/users/:id  → update
// DELETE /api/users/:id  → delete

app.get("/api/users", (_req, res) => {
  res.json({ success: true, data: users });
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ success: false, error: "User not found" });
  res.json({ success: true, data: user });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: "name and email required" });
  }
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.put("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: "Not found" });

  users[index] = { ...users[index], ...req.body };
  res.json({ success: true, data: users[index] });
});

app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: "Not found" });

  const deleted = users.splice(index, 1)[0];
  res.json({ success: true, data: deleted });
});

// ─── Global error handler (Q: 4-arg middleware) ───────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`API running → http://localhost:${PORT}/api/users`);
});
