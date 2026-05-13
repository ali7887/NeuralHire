// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// ===============================
// PUBLIC ROUTES
// ===============================
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/admin/login",
  "/403",
];

// ===============================
// ROLE TYPES
// ===============================
type Role = "admin" | "employer" | "job-seeker";

// ===============================
// ROLE → ROUTE ACCESS
// ===============================
const ACCESS_RULES = [
  {
    matcher: /^\/admin(\/.*)?$/,
    allowedRoles: ["admin"] as Role[],
    redirectTo: "/admin/login",
  },
  {
    matcher: /^\/employer(\/.*)?$/,
    allowedRoles: ["employer", "admin"] as Role[],
    redirectTo: "/login",
  },
  {
    matcher: /^\/dashboard(\/.*)?$/,
    allowedRoles: ["job-seeker"] as Role[],
    redirectTo: "/login",
  },
];

// ===============================
// NEXT MATCHERS
// ===============================
export const config = {
  matcher: [
    "/admin/:path*",
    "/employer/:path*",
    "/dashboard/:path*",
    "/api/auth/me",
  ],
};

// ===============================
// EDGE SAFE JWT SECRET
// ===============================
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret"
);

// ===============================
// MIDDLEWARE
// ===============================
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("[RBAC]", pathname);

  // ===============================
  // PUBLIC ROUTES
  // ===============================
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // ===============================
  // TOKEN
  // ===============================
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    const matchedRule = ACCESS_RULES.find((r) =>
      r.matcher.test(pathname)
    );

    const redirectTo = matchedRule?.redirectTo || "/login";

    const url = req.nextUrl.clone();
    url.pathname = redirectTo;

    return NextResponse.redirect(url);
  }

  // ===============================
  // VERIFY JWT
  // ===============================
  let payload: any;

  try {
    const verified = await jwtVerify(token, secret);
    payload = verified.payload;
  } catch (error) {
    console.error("[JWT VERIFY ERROR]", error);

    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  // ===============================
  // USER ROLE
  // ===============================
  let userRole = payload.role as string;

  // normalize old roles
  if (userRole === "user") {
    userRole = "job-seeker";
  }

  // ===============================
  // RBAC CHECK
  // ===============================
  for (const rule of ACCESS_RULES) {
    if (rule.matcher.test(pathname)) {
      const hasAccess = rule.allowedRoles.includes(userRole as Role);

      if (!hasAccess) {
        console.warn(
          `[RBAC BLOCKED] role=${userRole} path=${pathname}`
        );

        const url = req.nextUrl.clone();
        url.pathname = "/403";

        return NextResponse.rewrite(url);
      }
    }
  }

  // ===============================
  // ALLOW
  // ===============================
  return NextResponse.next();
}
