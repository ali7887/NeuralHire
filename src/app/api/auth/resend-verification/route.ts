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

    // Privacy: same response even if user doesn't exist
    if (!user) {
      return NextResponse.json({
        message: "If an account exists, a verification email was sent",
      });
    }

    if (user.emailVerified) {
      return NextResponse.json({
        message: "Account is already verified",
      });
    }

    const token = await signEmailVerificationToken({
      userId: user.id,
      email: user.email,
    });

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
