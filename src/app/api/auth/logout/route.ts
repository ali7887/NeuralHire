import { NextRequest, NextResponse } from "next/server";
import { getRefreshTokenFromRequest } from "@/lib/auth/token.extractor";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = getRefreshTokenFromRequest(req);
    if (refreshToken) {
      const payload = await authService.verifyRefreshToken(refreshToken);
      if (payload?.tokenId) {
        await authService.revokeRefreshToken(payload.tokenId);
      }
    }

    const res = NextResponse.json({ success: true, message: "Logged out successfully" });

    res.cookies.set("accessToken", "", { maxAge: 0, path: "/", httpOnly: true, secure: true, sameSite: "lax" });
    res.cookies.set("refreshToken", "", { maxAge: 0, path: "/", httpOnly: true, secure: true, sameSite: "strict" });

    return res;
  } catch (error) {
    console.error("[AUTH_LOGOUT_ERROR]", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
