/* eslint-disable no-undef */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/admin/login",
  "/403",
];

type Role = "admin" | "employer" | "job-seeker";

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

export const config = {
  matcher: [
    "/admin/:path*",
    "/employer/:path*",
    "/dashboard/:path*",
    "/api/auth/me",
  ],
};

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET!
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

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

  let payload: any;

  try {
    const verified = await jwtVerify(token, secret);
    payload = verified.payload;
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  let userRole = payload.role as string;

  if (userRole === "user") {
    userRole = "job-seeker";
  }

  for (const rule of ACCESS_RULES) {
    if (rule.matcher.test(pathname)) {
      const hasAccess = rule.allowedRoles.includes(userRole as Role);

      if (!hasAccess) {
        const url = req.nextUrl.clone();
        url.pathname = "/403";
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}
