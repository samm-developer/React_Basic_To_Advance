# Step 8 — Databases & ORM

## Must-Know Questions

### 1. SQL vs NoSQL?
- **SQL** (Postgres, MySQL, SQLite): tables, rows, schemas, JOINs, strong consistency. Use for relational data (users, orders, payments).
- **NoSQL** (MongoDB): documents (JSON-like), flexible schema, easy to scale horizontally. Use for nested/variable data (product catalogs, logs).

**Interview line:** pick the model that matches the data, not the hype.

### 2. Primary key vs foreign key vs index?
- **PK:** unique identity of a row (`users.id`)
- **FK:** points to another table (`posts.user_id → users.id`)
- **Index:** extra lookup structure so `WHERE email = ?` does not scan the whole table. Unique index also enforces uniqueness.

Tradeoff: faster reads, slightly slower writes, extra disk.

### 3. What is ACID?
- **Atomicity** — all or nothing
- **Consistency** — constraints stay valid
- **Isolation** — concurrent transactions don’t clobber each other
- **Durability** — committed data survives a crash

### 4. What is an ORM?
Object-Relational Mapper: JS objects ↔ tables/documents (Prisma, Sequelize, Mongoose).

Pros: less boilerplate, migrations, relations.  
Cons: leaky abstractions, easy to cause **N+1** queries, you still must know SQL.

### 5. The N+1 problem?
You load N parents, then 1 query **per parent** for children = `1 + N` queries. Fix with `JOIN`, `IN (...)`, or ORM `include` / `populate`.

### 6. SQL injection?
Never concatenate user input into SQL. Use **parameterized queries** (`WHERE id = ?`, then pass the value separately).

### 7. MongoDB: embed vs reference?
- **Embed** when data is always read together and bounded in size (address on a user)
- **Reference** (`ObjectId`) when data is shared or grows unbounded (users ↔ posts)

---

## Run

```bash
npm run step8:sql
npm run step8:n1
```

## Exercise
Add a `comments` table (`post_id`, `body`) and fetch posts **with comments** in **one** JOIN (not N+1).
