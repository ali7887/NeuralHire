import { NextRequest, NextResponse } from "next/server";
import { getRefreshTokenFromRequest } from "@/lib/auth/cookie.utilities";

import { authService } from "@/lib/services/auth.service";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const oldRefreshToken = getRefreshTokenFromRequest(req);
    if (!oldRefreshToken) {
      return NextResponse.json({ error: "Missing refresh token" }, { status: 401 });
    }

    const payload = await authService.verifyRefreshToken(oldRefreshToken);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newRefreshToken = await authService.rotateRefreshToken(oldRefreshToken);
    const { accessToken } = await authService.loginUser(user);

    const res = NextResponse.json({ success: true });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return res;
  } catch (err) {
    console.error("[REFRESH_ERROR]", err);
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
  }
}
