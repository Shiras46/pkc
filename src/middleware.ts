import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

function getBaseUrl(request: NextRequest): string {
  // 1. Check for standard reverse-proxy forwarded headers
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";

  // If host is a real public domain (not localhost or loopback IP), use it
  if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
    return `${proto}://${host}`;
  }

  // 2. If running in production or behind a reverse proxy where host resolved to localhost,
  // fallback to NEXT_PUBLIC_SITE_URL or the official production domain
  if (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_SITE_URL) {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
      return envUrl.replace(/\/+$/, "");
    }
    if (process.env.NODE_ENV === "production") {
      return "https://pkcevents.com";
    }
  }

  // 3. In local development on developer machine, preserve request.nextUrl.origin
  return request.nextUrl.origin;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("admin_session")?.value;
  const session = await verifySessionToken(sessionCookie);
  const baseUrl = getBaseUrl(request);

  // Root /admin route: redirect to dashboard if logged in, or login if not
  if (pathname === "/admin" || pathname === "/admin/") {
    const target = session ? "/admin/dashboard" : "/admin/login";
    return NextResponse.redirect(new URL(target, baseUrl));
  }

  // Allow login page, or redirect to dashboard if already logged in
  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", baseUrl));
    }
    return NextResponse.next();
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", baseUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
