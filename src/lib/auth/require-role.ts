import { getUserFromRequest } from "./get-user-from-request";
import type { UserRole } from "@/lib/jwt/jwt.types";

export async function requireRole(allowed: UserRole[]) {
  const user = await getUserFromRequest();

  if (!user) {
    return null;
  }

  if (!allowed.includes(user.role)) {
    return null;
  }

  return user;
}
