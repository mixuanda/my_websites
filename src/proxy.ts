import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const pathname = req.nextUrl.pathname;

  const authRequired =
    pathname.startsWith("/diary") ||
    pathname.startsWith("/private") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/api/stripe") ||
    pathname.includes("/premium/");

  if (authRequired && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/diary/:path*",
    "/private/:path*",
    "/settings/:path*",
    "/api/stripe/:path*",
    "/:locale/premium/:path*",
    "/premium/:path*",
  ],
};
