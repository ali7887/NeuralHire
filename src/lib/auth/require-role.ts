import { redirect } from "next/navigation";
import { getUserFromRequest } from "./get-user-from-request";
import type { UserRole } from "@/lib/jwt/jwt.types";

export async function requireRole(allowed: UserRole[]) {
  const user = await getUserFromRequest();

  if (!user) {
    redirect("/login");
  }

  if (!allowed.includes(user.role)) {
    redirect("/403");
  }

  return user;
}
