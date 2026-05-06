import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "localhost";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    await authService.resetPassword(token, password);

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error resetting password" },
      { status: 400 }
    );
  }
}
