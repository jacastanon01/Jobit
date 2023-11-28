import { NextRequest, NextResponse } from 'next/server';

import { readUserServerSession } from '@/lib/supabase/actions';

export async function middleware(request: NextRequest) {
  // try to load the session
  const {
    data: { session },
  } = await readUserServerSession();
  // if there is no session, redirect to /auth/login
  // get the current url and redirect to /auth/login
  const url = request.nextUrl.clone();

  if (session && url.pathname === '/auth/login') {
    url.pathname = '/profile';
    return NextResponse.redirect(url.href);
  }
  if (!session && url.pathname.indexOf('/profile') > -1) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url.href);
  }

  // if there is a session, continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/auth/login'],
};
