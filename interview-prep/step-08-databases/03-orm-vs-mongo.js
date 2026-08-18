/**
 * STEP 8 — ORM / Mongo shapes (read this; no DB server required)
 *
 * Prisma (SQL) and Mongoose (Mongo) both hide queries behind objects.
 * You still must know what SQL/queries they generate (N+1, indexes).
 */

// ── Prisma-style (Postgres / SQLite) ─────────────────────────────────────────
// model User {
//   id    Int    @id @default(autoincrement())
//   email String @unique
//   posts Post[]
// }
//
// await prisma.user.findMany({ include: { posts: true } })
// → one query with JOIN (if you remember include)

// ── Mongoose-style (MongoDB) ─────────────────────────────────────────────────
const userDocument = {
  _id: "665f...",
  email: "alice@example.com",
  name: "Alice",
  // Embedded: good when small and always loaded with the user
  address: { city: "Bengaluru", pin: "560001" },
};

const postDocument = {
  _id: "6660...",
  title: "JWT auth",
  // Referenced: good when unbounded or shared
  authorId: "665f...",
};

// await Post.find({ authorId: user._id })           // extra query
// await Post.find().populate("authorId")            // still more queries unless you aggregate

console.log("SQL mindset: tables + JOIN");
console.log("Mongo mindset: embed OR reference");
console.log("Sample user document:", userDocument);
console.log("Sample post document:", postDocument);
