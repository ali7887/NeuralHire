// src/lib/auth/admin-guard.ts
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "./get-user-from-request"; 


export async function requireAdmin(req: NextRequest) {
  // ۱) گرفتن یوزر از روی توکن/کوکی
  const user = await getUserFromRequest(req);

  if (!user) {
    return {
      ok: false as const,
      status: 401,
      error: "Unauthorized",
    };
  }

  if (user.role !== "admin") {
    return {
      ok: false as const,
      status: 403,
      error: "Forbidden",
    };
  }

  return {
    ok: true as const,
    user,
  };
}

