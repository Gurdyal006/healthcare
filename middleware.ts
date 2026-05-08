import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token: any = await getToken({ req: request }); // ✅ NextAuth token

  const { pathname } = request.nextUrl;

  // =========================
  // ROUTE CONFIG
  // =========================

  const protectedRoutes = [
    "/dashboard",
    "/appointments",
    "/profile",
    "/video-call",
  ];

  const authRoutes = ["/login", "/signup"];

  // =========================
  // 1. NOT LOGGED IN
  // =========================
  if (!token) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // =========================
  // 2. LOGGED IN (BLOCK AUTH PAGES)
  // =========================
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // =========================
  // 3. ROLE-BASED PROTECTION
  // =========================

  const role = token?.role; // ✅ from NextAuth jwt callback

  // Doctor-only routes
  if (pathname.startsWith("/doctor") && role !== "doctor") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Patient-only routes
  if (pathname.startsWith("/patient") && role !== "patient") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // =========================
  // 4. OPTIONAL: VIDEO CALL PROTECTION
  // =========================
  if (pathname.startsWith("/video-call") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // =========================
  // 5. ALLOW REQUEST
  // =========================
  return NextResponse.next();
}

// =========================
// MATCHER
// =========================

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/profile/:path*",
    "/doctor/:path*",
    "/patient/:path*",
    "/video-call/:path*",
    "/login",
    "/signup",
  ],
};