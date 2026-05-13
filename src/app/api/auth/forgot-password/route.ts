/* eslint-disable no-undef */
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/security/rate-limit";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { signResetPasswordToken } from "@/lib/jwt/jwt.utils";
import { sendPasswordResetEmail } from "@/lib/mail/send-password-reset";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

  let email: string | undefined;

  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  email = email.trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) {
      const token = await signResetPasswordToken({
        userId: user.id,
        email: user.email,
      });

      await sendPasswordResetEmail({
        to: user.email,
        token,
      });
    }

    await new Promise((r) => setTimeout(r, 300));

    return NextResponse.json({
      message: "If a matching account exists, an email was sent",
    });

  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR", {
      message: error instanceof Error ? error.message : error,
      email,
      ip,
    });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

