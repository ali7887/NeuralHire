import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth.guard";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema/refresh_tokens";
import { eq } from "drizzle-orm";
import {
  clearRefreshTokenCookie,
  clearAccessTokenCookie,
} from "@/lib/auth/cookie.utilities";

export async function POST(request: NextRequest) {
  const ctx = await requireAuth(request);

  await db
    .update(refreshTokens)
    .set({ isRevoked: true })
    .where(eq(refreshTokens.userId, ctx.userId));

  const res = NextResponse.json({ success: true });

  clearRefreshTokenCookie(res);
  clearAccessTokenCookie(res);

  return res;
}
