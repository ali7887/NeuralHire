import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type AuthUser = {
  userId: string;
  role: string;
};

export async function getUserFromRequest(req?: NextRequest): Promise<AuthUser | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get("accessToken")?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get("accessToken")?.value;
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    console.error("JWT_VERIFY_ERROR:", error);
    return null;
  }
}
