import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  // Allow unauthenticated users to access the /signup page
  if (pathname.startsWith("/signup") && !isAuthenticated) {
    return NextResponse.next();
  }

  // Redirect authenticated users from /login or /signup to /usecases
  if ((pathname.startsWith("/login") || pathname.startsWith("/signup")) && isAuthenticated) {
    return NextResponse.redirect(new URL("/usecases", req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
