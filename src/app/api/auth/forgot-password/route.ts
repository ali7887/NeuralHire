import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/security/rate-limit";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { signResetPasswordToken } from "@/lib/jwt/jwt.utils";
import { sendPasswordResetEmail } from "@/lib/mail/send-password-reset";

export const runtime = "nodejs";

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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Security: don't reveal if user exists
    if (!user) {
      return NextResponse.json({
        message: "If a matching account exists, an email was sent",
      });
    }

    const token = await signResetPasswordToken({
      userId: user.id,
      email: user.email,
    });

    await sendPasswordResetEmail({
      to: user.email,
      token,
    });

    return NextResponse.json({
      message: "If a matching account exists, an email was sent",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
