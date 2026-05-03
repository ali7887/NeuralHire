import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// تبدیل سکرت به فرمت قابل فهم برای jose
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-fallback-secret-for-dev"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;

  // ۱. بررسی مسیرهای محافظت شده (مثل /admin)
  if (pathname.startsWith("/admin")) {
    // اگر توکن کلاً وجود نداشت
    if (!accessToken) {
      return redirectToLogin(req, "/admin/login");
    }

    try {
      // ۲. تایید اعتبار توکن (Verify)
      const { payload } = await jwtVerify(accessToken, JWT_SECRET);

      // ۳. چک کردن نقش (Role-based Access Control)
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("JWT Verification failed:", err);
      return redirectToLogin(req, "/admin/login");
    }
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest, loginPath: string) {
  const loginUrl = new URL(loginPath, req.url);
  loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
