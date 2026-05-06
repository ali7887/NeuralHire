import bcrypt from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";

import { db } from "@/lib/db";
import { refreshTokens, users, type User } from "@/lib/db/schema";
import type { RefreshTokenPayload, UserRole } from "@/lib/jwt/jwt.types";
import {
  signAccessToken,
  signRefreshToken,
  signResetPasswordToken,
  verifyRefreshToken as verifyRefreshTokenJwt,
  verifyResetPasswordToken,
} from "@/lib/jwt/jwt.utils";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type RegisterInput = {
  name?: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const authService = {
  async register({ name, email, password }: RegisterInput) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const inserted = await db
      .insert(users)
      .values({
        name: name?.trim() || null,
        email: normalizedEmail,
        passwordHash,
        role: "user",
      })
      .returning();

    const user = inserted[0];
    if (!user) {
      throw new Error("Failed to create user");
    }

    const tokens = await this.loginUser(user);

    return {
      user: this.toSafeUser(user),
      ...tokens,
    };
  },

  async login({ email, password }: LoginInput) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    const tokens = await this.loginUser(user);

    return {
      user: this.toSafeUser(user),
      ...tokens,
    };
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const payload = await verifyResetPasswordToken(token);

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await db
      .update(users)
      .set({
        passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, payload.userId));

    await this.logoutAll(payload.userId);
  },

  async logout(refreshToken: string): Promise<void> {
    const payload = await this.verifyRefreshToken(refreshToken);
    await this.revokeRefreshToken(payload.tokenId);
  },

  async logoutAll(userId: string): Promise<number> {
    const activeTokens = await db.query.refreshTokens.findMany({
      where: and(
        eq(refreshTokens.userId, userId),
        eq(refreshTokens.isRevoked, false),
        gt(refreshTokens.expiresAt, new Date())
      ),
    });

    if (activeTokens.length === 0) {
      return 0;
    }

    await db
      .update(refreshTokens)
      .set({
        isRevoked: true,
      })
      .where(eq(refreshTokens.userId, userId));

    return activeTokens.length;
  },

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    return verifyRefreshTokenJwt(token);
  },

  async revokeRefreshToken(tokenId: string): Promise<void> {
    const tokenRecords = await db.query.refreshTokens.findMany({
      where: eq(refreshTokens.isRevoked, false),
    });

    for (const record of tokenRecords) {
      const matches = await bcrypt.compare(tokenId, record.tokenHash);

      if (matches) {
        await db
          .update(refreshTokens)
          .set({
            isRevoked: true,
          })
          .where(eq(refreshTokens.id, record.id));

        return;
      }
    }
  },

  async rotateRefreshToken(oldRefreshToken: string): Promise<string> {
    const payload = await this.verifyRefreshToken(oldRefreshToken);

    await this.revokeRefreshToken(payload.tokenId);

    const newTokenId = crypto.randomUUID();
    const newTokenHash = await bcrypt.hash(newTokenId, 10);

    await db.insert(refreshTokens).values({
      id: crypto.randomUUID(),
      userId: payload.userId,
      tokenHash: newTokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isRevoked: false,
    });

    return signRefreshToken({
      tokenId: newTokenId,
      userId: payload.userId,
    });
  },

  async loginUser(user: Pick<User, "id" | "email" | "role">): Promise<AuthTokens> {
    const tokenId = crypto.randomUUID();
    const tokenHash = await bcrypt.hash(tokenId, 10);

    await db.insert(refreshTokens).values({
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isRevoked: false,
    });


    const role = user.role as UserRole;

    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role,
    });

    const refreshToken = await signRefreshToken({
      tokenId,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  async createResetPasswordToken(email: string): Promise<string> {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return signResetPasswordToken({
      userId: user.id,
      email: user.email,
    });
  },

  toSafeUser(user: User) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  },
};
