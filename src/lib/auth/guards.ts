import { requireRole } from "./require-role";

export async function requireAdmin() {
  return requireRole(["admin"]);
}

export async function requireEmployer() {
  return requireRole(["admin", "employer"]);
}

export async function requireJobSeeker() {
  return requireRole(["job-seeker"]);
}
