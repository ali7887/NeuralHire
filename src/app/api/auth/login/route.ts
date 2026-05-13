//project\NEW\job-board-saas\src\app\api\auth\login\route.ts
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";
import {
  setRefreshTokenCookie,
  setAccessTokenCookie,
} from "@/lib/auth/cookie.utilities";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const result = await authService.login({ email, password });

    const { user, accessToken, refreshToken } = result;

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: String(user.role).toLowerCase(),
        name: user.name ?? null,
      },
    });

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return res;
  } catch (error: any) {
    if (error?.message === "Invalid credentials") {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (error?.message === "Email not verified") {
      return NextResponse.json(
        { error: "Please verify your email before logging in." },
        { status: 403 }
      );
    }

    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
