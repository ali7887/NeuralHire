import type { User, SafeUser } from "@/lib/db/schema/users";

export function toSafeUser(user: User): SafeUser {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
