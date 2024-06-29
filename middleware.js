import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Authentication middleware logic
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const errorPage = new URL("/api/auth/auth-error", req.url);

  if (!token) {
    return NextResponse.redirect(errorPage);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};
