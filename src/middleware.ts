// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// ------------------------------------------
// RBAC CONFIGURATION
// ------------------------------------------
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/admin/login",
];

const ROLE_BASED_ACCESS = [
  {
    matcher: /^\/admin(\/.*)?$/,
    allowedRoles: ["admin"],
    redirectTo: "/admin/login",
  },
  {
    matcher: /^\/dashboard\/employer(\/.*)?$/,
    allowedRoles: ["employer"],
    redirectTo: "/login",
  },
  {
    matcher: /^\/dashboard\/user(\/.*)?$/,
    allowedRoles: ["user"],
    redirectTo: "/login",
  },
];

// -------------------------------
// Matchers (Next.js config)
// -------------------------------
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/employer/:path*",
    "/dashboard/user/:path*",
    "/api/auth/me",
  ],
};

// Secret → Edge-compatible
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// ------------------------------------------
// MAIN MIDDLEWARE
// ------------------------------------------
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("[RBAC] Middleware HIT:", pathname);

  // 1. Allow public paths directly
  if (PUBLIC_PATHS.includes(pathname)) {
    console.log("[RBAC] Public path → allowed");
    return NextResponse.next();
  }

  // 2. Get JWT
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    console.log("[RBAC] No token → redirect");

    const zone = ROLE_BASED_ACCESS.find((z) => z.matcher.test(pathname));
    const redirectTo = zone?.redirectTo || "/login";

    const url = req.nextUrl.clone();
    url.pathname = redirectTo;

    return NextResponse.redirect(url);
  }

  // 3. Verify JWT using JOSE
  let decoded: any = null;
  try {
    const { payload } = await jwtVerify(token, secret);
    decoded = payload;
  } catch (err) {
    console.log("[RBAC] Invalid token:", err);

    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  const userRole = decoded?.role;
  console.log("[RBAC] User role:", userRole);

  // 4. RBAC
  for (const rule of ROLE_BASED_ACCESS) {
    if (rule.matcher.test(pathname)) {
      console.log("[RBAC] Zone matched →", rule.allowedRoles);

      if (!rule.allowedRoles.includes(userRole)) {
        console.log("[RBAC] Access denied →", { userRole, pathname });

        const url = req.nextUrl.clone();
        url.pathname = "/403";
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}
