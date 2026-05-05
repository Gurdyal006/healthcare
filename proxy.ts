import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value; // "doctor" | "patient"

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
  // Example: only allow if logged in
  if (pathname.startsWith("/video-call") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // =========================
  // 5. ALLOW REQUEST
  // =========================
  return NextResponse.next();
}

// =========================
// MATCHER (IMPORTANT)
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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token");

//   const { pathname } = request.nextUrl;

//   // Protected routes
//   const protectedRoutes = ["/dashboard", "/appointments", "/profile"];

//   // Auth pages
//   const authRoutes = ["/login", "/signup"];

//   // ❌ Not logged in → block protected pages
//   if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // ❌ Logged in → block login/signup
//   if (token && authRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }