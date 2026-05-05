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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/appointments", "/profile"];
  const authRoutes = ["/login", "/signup"];

  // ❌ Not logged in
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ❌ Logged in
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
