/**
 * STEP 7 — Auth (register / login / JWT middleware)
 * Run: npm run step7:auth
 *
 * Interview flow: hash passwords → issue JWT → protect routes with middleware.
 */

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || "demo-only-change-me";
const SALT_ROUNDS = 10;

app.use(cors());
app.use(express.json());

// In-memory store (Step 8 replaces this with a real DB)
const users = [];

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ success: false, error: "Missing token" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
}

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ success: false, error: "Valid email and 8+ char password required" });
  }
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ success: false, error: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = { id: String(Date.now()), email, passwordHash };
  users.push(user);

  res.status(201).json({
    success: true,
    data: { id: user.id, email: user.email, token: signToken(user) },
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  // Same 401 for missing user OR bad password — do not leak which one failed
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  res.json({
    success: true,
    data: { id: user.id, email: user.email, token: signToken(user) },
  });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ success: true, data: { id: req.user.sub, email: req.user.email } });
});

app.listen(PORT, () => {
  console.log(`Auth API → http://localhost:${PORT}/api/auth/register`);
});
