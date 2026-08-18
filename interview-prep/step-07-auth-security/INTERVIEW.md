# Step 7 — Authentication & Security

## Must-Know Questions

### 1. Authentication vs Authorization?
- **Authentication:** who are you? (login, JWT)
- **Authorization:** what can you do? (roles, permissions)

### 2. Why hash passwords? Why not encrypt?
Hashing is one-way. Even if the DB leaks, the original password is not recoverable. Encryption is reversible with a key — a stolen key exposes every password. Use **bcrypt** / **argon2** with a unique salt per user.

### 3. What is a JWT?
Three Base64 parts: `header.payload.signature`. The server signs the payload; later it **verifies** the signature. Stateless — no session store required.

**Never put secrets in the payload.** Anyone can decode it. The signature only proves it was not tampered with.

### 4. Where to store the token on the client?
| Storage | Risk |
|---------|------|
| `localStorage` | Readable by JS → **XSS** can steal it |
| `httpOnly` cookie | JS cannot read it → safer vs XSS; watch **CSRF** |

Interview answer: httpOnly + Secure + SameSite cookies is the usual production choice.

### 5. 401 vs 403?
- **401** Unauthorized — not authenticated (missing/invalid token)
- **403** Forbidden — authenticated, but not allowed (wrong role)

### 6. CORS in one sentence?
The browser blocks a frontend origin from calling a different API origin unless the API sends the right `Access-Control-Allow-Origin` headers.

### 7. XSS vs CSRF?
- **XSS:** attacker runs JS in your page → steal tokens, act as the user
- **CSRF:** attacker’s site tricks the **browser** into sending your cookies to your API

Mitigations: sanitize/escape output, Content-Security-Policy, httpOnly cookies, SameSite, CSRF tokens for cookie auth.

---

## Run

```bash
npm run step7:auth
```

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@example.com","password":"secret123"}'

# Login (copy the token)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@example.com","password":"secret123"}'

# Protected route
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Exercise
Add a `role` field (`user` | `admin`) and a `requireAdmin` middleware that returns 403 for non-admins.
