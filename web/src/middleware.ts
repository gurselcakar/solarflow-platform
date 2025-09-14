import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Allow public routes
    if (pathname === '/' || pathname.startsWith('/auth/') || pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    // Redirect to signin if no token
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Role-based route protection
    if (pathname.startsWith('/dashboard') && token.role !== 'LANDLORD') {
      return NextResponse.redirect(new URL('/tenant/portal', req.url));
    }

    if (pathname.startsWith('/tenant') && token.role !== 'TENANT') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Always allow access to public routes
        if (pathname === '/' || pathname.startsWith('/auth/') || pathname.startsWith('/api/auth/')) {
          return true;
        }

        // For protected routes, require a token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};