# Step 6 — Express & REST API

## Must-Know Questions

### 1. What is middleware?
Functions with `(req, res, next)`. Run in order. Can modify req/res or end the cycle.

### 2. REST principles?
Resources (nouns), HTTP verbs (GET/POST/PUT/PATCH/DELETE), stateless, standard status codes.

### 3. Status codes?
- 200 OK, 201 Created
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 500 Internal Server Error

### 4. Error handling in Express?
4-parameter middleware `(err, req, res, next)`. Use `next(err)` to forward errors.

### 5. req.body undefined?
Missing `express.json()` middleware or wrong Content-Type header.

---

## Test the API

```bash
npm run step6:server

# List users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@example.com"}'

# Update
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}'

# Delete
curl -X DELETE http://localhost:3000/api/users/2
```

## Exercise
Add input validation middleware and pagination to GET /api/users.
