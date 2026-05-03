import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";
import { rateLimit } from "@/lib/security/rate-limit";

const ACCESS_TOKEN_EXPIRE = "30m";
const REFRESH_EXPIRE_MS = 1000 * 60 * 60 * 24 * 7;

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-access-1234567890"
);

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for") ?? "localhost";

  if (!rateLimit(ip, 10, 60_000)) {
    return Response.json(
      { error: "Too many requests, try again later" },
      { status: 429 }
    );
  }
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 400 }
      );
    }
    if (!rateLimit(ip)) {
  return NextResponse.json(
    { error: "Too many requests" },
    { status: 429 }
  );
}

    // پیدا کردن کاربر
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // بررسی پسورد
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    // ساخت Access Token
    const accessToken = await new SignJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRE)
      .sign(ACCESS_SECRET);

    // ساخت Refresh Token
    const refreshToken = crypto.randomUUID();
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    await db.insert(refreshTokens).values({
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      isRevoked: false,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRE_MS),
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Access Cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30,
    });

    // Refresh Cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
