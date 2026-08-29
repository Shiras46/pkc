import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session");

  // ✅ Allow login page always
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ Protect admin routes
  if (!session && pathname.startsWith("/admin")) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // ✅ IMPORTANT: allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
