import { type MiddlewareConfig, NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { envVariables } from './lib/env-variables'

export const middleware = async () => {
  const session = await auth()

  if (session === null) return NextResponse.redirect(new URL('/login', envVariables.BASE_URL))
}

export const config = {
  matcher: [
    '/((?!login|api|_next|favicon.ico|robots.txt|manifest.webmanifest|sitemap.xml|.*.png).*)',
  ],
} satisfies MiddlewareConfig
