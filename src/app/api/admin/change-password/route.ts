import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { authErrorResponse } from "@/lib/api/auth-error-response";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);

  if (!auth.ok) {
    return authErrorResponse(auth.error, auth.status);
  }

  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "currentPassword and newPassword are required" },
        { status: 400 }
      );
    }

    // منطق تغییر رمز عبور با استفاده از auth.user.userId
    // TODO: پیاده‌سازی متد تغییر در DB

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ADMIN_CHANGE_PASSWORD_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
