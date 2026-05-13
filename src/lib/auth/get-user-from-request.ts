import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt/jwt.utils";

export async function getUserFromRequest() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyAccessToken(token);

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch (error) {
    console.error("[AUTH_ERROR]", error);

    return null;
  }
}
