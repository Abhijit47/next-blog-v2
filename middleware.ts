import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // ALternatively, you can use getCookieCache from 'better-auth/cookies' for improved performance
  // const session = await getCookieCache(request);
  // console.log('Session in middleware:', session);
  // if (!session) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // return NextResponse.next();

  // Options 1:
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/posts', '/posts/:path*'], // Specify the routes the middleware applies to
};
