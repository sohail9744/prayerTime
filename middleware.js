import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function middleware(req) {
  // Authentication middleware logic
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const errorPage = new URL("/api/auth/auth-error", req.url);

  if (!token) {
    return NextResponse.redirect(errorPage);
  }

  // CSP middleware logic
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self' https://fonts.googleapis.com;
    object-src 'none';
    base-uri 'self' https://mosqtime.com;
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};
