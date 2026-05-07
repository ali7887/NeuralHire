export type UserRole = "admin" | "employer" | "job-seeker";

export interface AccessTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  type: "access";
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  tokenId: string;
  userId: string;
  type: "refresh";
  iat?: number;
  exp?: number;
}

export interface ResetPasswordTokenPayload {
  userId: string;
  email: string;
  type: "reset";
  iat?: number;
  exp?: number;
}

export interface EmailVerifyTokenPayload {
  userId: string;
  email: string;
  type: "email_verify";
  iat?: number;
  exp?: number;
}

export const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET: "reset",
  EMAIL_VERIFY: "email_verify",
} as const;
