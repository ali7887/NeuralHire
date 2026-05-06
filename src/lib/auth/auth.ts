import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type Session = {
  userId: string;
  email: string;
  role: "user" | "admin";
} | null;

export async function auth(): Promise<Session> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as Session;

    return payload;
  } catch {
    return null;
  }
}
