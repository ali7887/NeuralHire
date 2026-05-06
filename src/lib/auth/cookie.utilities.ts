import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Cookie names (single source of truth)
 * IMPORTANT: keep these consistent across set/get/clear and routes.
 */
const ACCESS_COOKIE_NAME = "accessToken";
const REFRESH_COOKIE_NAME = "refreshToken";

/**
 * Cookie scope
 * Refresh token is limited to auth endpoints to reduce exposure.
 */
const REFRESH_COOKIE_PATH = "/api/auth";

/**
 * Lifetimes
 */
const ACCESS_MAX_AGE_SECONDS = 60 * 60; // 1 hour
const REFRESH_MAX_AGE_DAYS = 7;
const REFRESH_MAX_AGE_SECONDS = REFRESH_MAX_AGE_DAYS * 24 * 60 * 60;

/**
 * Set Access Token cookie (httpOnly)
 */
export function setAccessTokenCookie(res: NextResponse, accessToken: string) {
  res.cookies.set(ACCESS_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: ACCESS_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Set Refresh Token cookie (httpOnly)
 */
export function setRefreshTokenCookie(res: NextResponse, refreshToken: string) {
  res.cookies.set(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    path: REFRESH_COOKIE_PATH,
    maxAge: REFRESH_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Read Refresh Token cookie from request
 */
export function getRefreshTokenFromCookie(
  request: NextRequest
): string | undefined {
  return request.cookies.get(REFRESH_COOKIE_NAME)?.value;
}

/**
 * Compatibility helper for auth routes
 */
export function getRefreshTokenFromRequest(
  request: NextRequest
): string | undefined {
  return getRefreshTokenFromCookie(request);
}

/**
 * Clear Access Token cookie
 */
export function clearAccessTokenCookie(res: NextResponse) {
  res.cookies.set(ACCESS_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Clear Refresh Token cookie
 */
export function clearRefreshTokenCookie(res: NextResponse) {
  res.cookies.set(REFRESH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: REFRESH_COOKIE_PATH,
    maxAge: 0,
  });
}
