import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { users, companies, jobs } from "@/lib/db/schema";
import pkg from "pg";

dotenv.config();
const { Client } = pkg;

// SHA-256 helper
async function sha256(str: string): Promise<string> {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  await db.delete(jobs);
  await db.delete(companies);
  await db.delete(users);

  const adminPass = await sha256("Password123");

  const [admin] = await db.insert(users)
    .values({
      
      email: "admin@test.com",
      name: "Admin",
      passwordHash: adminPass,
      role: "admin",
      updatedAt: new Date(),
    })
    .returning();

  const [company] = await db
    .insert(companies)
    .values({
      name: "Acme Corp",
      ownerId: admin.id,
    })
    .returning();

  await db.insert(jobs).values([
    {
      title: "Senior Frontend Engineer",
      description: "React, Next.js, TypeScript",
      location: "Remote",
      level: "senior",
      companyId: company.id,
      status: "open",
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Seed done.");
  await client.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
