import { requireUser } from "./require-user";

export async function requireAdmin() {
  const user = await requireUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}
