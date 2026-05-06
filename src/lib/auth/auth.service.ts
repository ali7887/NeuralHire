// src/lib/services/auth.service.ts
import { db } from "@/lib/db";
import { refreshTokens, User } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { UserRole } from "@/lib/jwt/jwt.types";
import {
  signAccessToken,
  signRefreshToken,
  signResetPasswordToken,
  signEmailVerificationToken,
  verifyRefreshToken as verifyJwtRefreshToken,
} from "@/lib/jwt/jwt.utils";

export const runtime = "nodejs";

async function loginUser(user: User) {
  const accessToken = await signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role as UserRole,
  });

  const refreshTokenId = crypto.randomUUID();
  const refreshToken = await signRefreshToken({
    tokenId: refreshTokenId,
    userId: user.id,
  });

  await db.insert(refreshTokens).values({
    id: crypto.randomUUID(),
    userId: user.id,
    tokenHash: refreshTokenId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    isRevoked: false,
  });

  return { accessToken, refreshToken };
}

async function revokeRefreshToken(tokenId: string) {
  await db
    .update(refreshTokens)
    .set({ isRevoked: true })
    .where(eq(refreshTokens.tokenHash, tokenId));
}

async function verifyRefreshToken(token: string) {
  return await verifyJwtRefreshToken(token);
}

async function rotateRefreshToken(oldToken: string) {
  const payload = await verifyJwtRefreshToken(oldToken);

  const [stored] = await db
    .select()
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.tokenHash, payload.tokenId),
        eq(refreshTokens.isRevoked, false)
      )
    )
    .limit(1);

  if (!stored) {
    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.userId, payload.userId));

    throw new Error("Refresh token reuse detected");
  }

  await revokeRefreshToken(payload.tokenId);

  const newTokenId = crypto.randomUUID();
  const newToken = await signRefreshToken({
    tokenId: newTokenId,
    userId: payload.userId,
  });

  await db.insert(refreshTokens).values({
    id: crypto.randomUUID(),
    userId: payload.userId,
    tokenHash: newTokenId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    isRevoked: false,
  });

  return newToken;
}

export const authService = {
  loginUser,
  revokeRefreshToken,
  rotateRefreshToken,
  verifyRefreshToken,
  sendPasswordResetEmail: (u: User) =>
    signResetPasswordToken({ userId: u.id, email: u.email }),
  sendVerificationEmail: (u: User) =>
    signEmailVerificationToken({ userId: u.id, email: u.email }),
};
