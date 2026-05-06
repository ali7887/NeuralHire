import { getUserFromRequest } from "./get-user-from-request";
import type { UserRole } from "@/lib/jwt/jwt.types";

export async function requireRole(allowed: UserRole[]) {
  const user = await getUserFromRequest();

  if (!allowed.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
