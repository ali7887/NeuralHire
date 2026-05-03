import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";

import {
  getRefreshTokenFromCookie,
  clearRefreshTokenCookie,
  clearAccessTokenCookie,  
} from "@/lib/auth/cookie.utilities";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = getRefreshTokenFromCookie(req);

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    const res = NextResponse.json({ success: true });

    // پاک کردن هر دو کوکی
    clearRefreshTokenCookie(res);
    clearAccessTokenCookie(res);

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
