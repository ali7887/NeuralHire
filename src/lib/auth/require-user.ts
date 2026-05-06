import { getUserFromRequest } from "./get-user-from-request";

export async function requireUser() {
  const user = await getUserFromRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
