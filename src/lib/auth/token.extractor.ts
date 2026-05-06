// src/lib/auth/token.extractor.ts
import { NextRequest } from "next/server";


export function getTokenFromRequest(req: Request | NextRequest): string | null {
 
  const authHeader = req.headers instanceof Headers 
    ? req.headers.get("authorization") 
    : (req.headers as any)["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  
  if ('cookies' in req && typeof req.cookies.get === 'function') {
    const cookieToken = req.cookies.get("accessToken")?.value;
    if (cookieToken) return cookieToken;
  }

  return null;
}


export function getRefreshTokenFromRequest(req: Request | NextRequest): string | null {
  if ('cookies' in req && typeof req.cookies.get === 'function') {
    return req.cookies.get("refreshToken")?.value || null;
  }
  return null;
}
