import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/security/rate-limit";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { signEmailVerificationToken } from "@/lib/jwt/jwt.utils";
import { sendVerificationEmail } from "@/lib/mail/send-verification-email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "localhost";

  // Rate Limit
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

    const normalizedEmail = email.trim().toLowerCase();

    // Query user
    const user = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    // Security: don't reveal if user exists
    if (!user) {
      return NextResponse.json({
        message: "If an account exists, a verification email was sent",
      });
    }

    // Already verified → no need to resend email
    if (user.emailVerifiedAt) {
      return NextResponse.json({
        message: "Email already verified",
      });
    }

    // Create token
    const token = await signEmailVerificationToken({
      userId: user.id,
      email: user.email,
    });

    // Debug log for dev mode
    console.log(
      "EMAIL_VERIFY_URL:",
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
    );

    // Send email
    await sendVerificationEmail({
      to: user.email,
      token,
    });

    return NextResponse.json({
      message: "If an account exists, a verification email was sent",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
