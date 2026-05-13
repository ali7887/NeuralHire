import { getUserFromRequest } from "./get-user-from-request";

export async function requireRole(roles: string[]) {
  const user = await getUserFromRequest();

  if (!user) {
    return null;
  }

  if (!roles.includes(user.role)) {
    return null;
  }

  return user;
}

export async function requireAdmin() {
  return requireRole(["admin"]);
}

export async function requireEmployer() {
  return requireRole(["employer", "admin"]);
}

export async function requireJobSeeker() {
  return requireRole(["job-seeker"]);
}
