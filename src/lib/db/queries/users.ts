import { db } from "../index";
import { users } from "../schema";

async function sha256(str: string): Promise<string> {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createUser(name: string, email: string, password: string) {
  const passwordHash = await sha256(password);

  const userId = crypto.randomUUID();

  const [user] = await db.insert(users).values({
    
    name,
    email,
    passwordHash,
    role: "user",
  }).returning();

  return user;
}
