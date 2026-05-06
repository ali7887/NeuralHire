// src/app/api/auth/logout-all/route.ts

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/require-user";
import { authService } from "@/lib/services/auth.service";
import {
  clearRefreshTokenCookie,
  clearAccessTokenCookie,
} from "@/lib/auth/cookie.utilities";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireUser();

    const revokedCount = await authService.logoutAll(ctx.userId);

    const response = NextResponse.json(
      {
        success: true,
        message: "All sessions revoked",
        affectedRows: revokedCount,
      },
      { status: 200 }
    );

    clearRefreshTokenCookie(response);
    clearAccessTokenCookie(response);

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}
