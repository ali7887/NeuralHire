import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";

type RequireAdminSuccess = {
  ok: true;
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

type RequireAdminFailure = {
  ok: false;
  status: 401 | 403;
  error: "Unauthorized" | "Forbidden";
};

export type RequireAdminResult = RequireAdminSuccess | RequireAdminFailure;

export async function requireAdmin(
  req: NextRequest
): Promise<RequireAdminResult> {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return {
        ok: false,
        status: 401,
        error: "Unauthorized",
      };
    }

    if (user.role !== "admin") {
      return {
        ok: false,
        status: 403,
        error: "Forbidden",
      };
    }

    return {
      ok: true,
      user,
    };
  } catch {
    return {
      ok: false,
      status: 401,
      error: "Unauthorized",
    };
  }
}
