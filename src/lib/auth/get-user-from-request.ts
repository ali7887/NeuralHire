import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";

export async function getUserFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyAccessToken(token);

  return {
    userId: payload.userId,
    role: payload.role,
  };
}
