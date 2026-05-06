export type UserRole =
  | "admin"
  | "employer"
  | "job-seeker";

/* ================================
   Access Token
================================ */

export interface AccessTokenPayload {
  userId: string;
  role: UserRole;
  type: "access";
  iat?: number;
  exp?: number;
}

/* ================================
   Refresh Token
================================ */

export interface RefreshTokenPayload {
  tokenId: string;
  userId: string;
  type: "refresh";
  iat?: number;
  exp?: number;
}

/* ================================
   Password Reset
================================ */

export interface ResetPasswordTokenPayload {
  userId: string;
  email: string;
  type: "reset";
  iat?: number;
  exp?: number;
}

/* ================================
   Email Verification
================================ */

export interface EmailVerifyTokenPayload {
  userId: string;
  email: string;
  type: "email-verify";
  iat?: number;
  exp?: number;
}


export const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET: "reset",
  EMAIL_VERIFY: "email-verify",
} as const;
