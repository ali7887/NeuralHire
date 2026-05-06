import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "../src/lib/db";
import { users } from "../src/lib/db/schema";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Super Admin";

  if (!email || !password) {
    throw new Error(
      "Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables."
    );
  }

  const existingAdmin = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingAdmin.length > 0) {
    console.log("✅ Admin user already exists:", existingAdmin[0].email);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    email,
    passwordHash,
    role: "admin",
    name,
  });

  console.log("✅ Admin created successfully");
  console.log("email:", email);
  console.log("password:", password);
  console.log("role: admin");
  console.log("name:", name);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Failed to seed admin:", error);
    process.exit(1);
  });
