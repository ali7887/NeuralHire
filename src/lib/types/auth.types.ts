// src/lib/types/auth.types.ts
import type { TokenPair } from '@/lib/types/token.types';
import type { User, NewUser, SafeUser } from "@/lib/db/schema/users"
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND      = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  TOKEN_EXPIRED       = 'TOKEN_EXPIRED',
  TOKEN_INVALID       = 'TOKEN_INVALID',
  TOKEN_REVOKED       = 'TOKEN_REVOKED',
  TOKEN_REUSE_DETECTED = 'TOKEN_REUSE_DETECTED',
  UNAUTHORIZED        = 'UNAUTHORIZED',
  FORBIDDEN           = 'FORBIDDEN',
}

export class AuthError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    message: string,
    public readonly statusCode: number = 401
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export interface AuthResult {
  refreshToken(arg0: string, refreshToken: any, arg2: { httpOnly: true; secure: false; path: string; }): unknown;
  accessToken: any;
  user: SafeUser;
  tokens: TokenPair;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role?: 'employer' | 'jobseeker';
}
export type UserRole =
  | "admin"
  | "employer"
  | "job-seeker";

