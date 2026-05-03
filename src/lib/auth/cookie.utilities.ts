// src/lib/auth/cookie.utilities.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'refresh_token';
const COOKIE_PATH = '/api/auth';
const MAX_AGE_DAYS = 7;
const MAX_AGE_SECONDS = MAX_AGE_DAYS * 24 * 60 * 60;

export function setRefreshTokenCookie(
  response: NextResponse,
  token: string
): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: COOKIE_PATH,
    maxAge: MAX_AGE_SECONDS,
  });
}

export function clearRefreshTokenCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: COOKIE_PATH,
    maxAge: 0,
  });
}

export function getRefreshTokenFromCookie(
  request: NextRequest
): string | undefined {
  return request.cookies.get(COOKIE_NAME)?.value;
}

/**
 * Compatibility helper for auth routes
 */
export function getRefreshTokenFromRequest(
  request: NextRequest
): string | undefined {
  return getRefreshTokenFromCookie(request);
}



export function clearAccessTokenCookie(res: NextResponse) {
  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
