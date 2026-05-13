export type UserRole =
  | "admin"
  | "employer"
  | "job-seeker";

export function getRedirectPathByRole(role: string) {
  const normalizedRole = role.toLowerCase();

  switch (normalizedRole) {
    case "admin":
      return "/admin/dashboard";

    case "employer":
      return "/employer";

    case "job-seeker":
    
      return "/jobs";

    default:
      return "/";
  }
}
