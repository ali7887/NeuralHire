/* eslint-disable no-undef */

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

type Role = "admin" | "employer" | "job-seeker";

const PUBLIC_PATHS = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/admin/login",
  "/403",
]);

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
    matcher: /^\/job-seeker(\/.*)?$/,
    allowedRoles: ["job-seeker"] as Role[],
    redirectTo: "/login",
  },

];

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export const config = {
  matcher: [
    "/admin/:path*",
    "/employer/:path*",
    "/dashboard/:path*",
    "/api/auth/me",
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const matchedRule = ACCESS_RULES.find((rule) =>
    rule.matcher.test(pathname)
  );

  if (!matchedRule) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = matchedRule.redirectTo;

    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    let userRole = payload.role as string;

    if (userRole === "user") {
      userRole = "job-seeker";
    }

    const hasAccess = matchedRule.allowedRoles.includes(
      userRole as Role
    );

    if (!hasAccess) {
      const url = req.nextUrl.clone();
      url.pathname = "/403";

      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
}
