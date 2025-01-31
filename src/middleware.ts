import { type MiddlewareConfig, type NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'

export const middleware = async (request: NextRequest) => {
  const session = await auth.api.getSession({ headers: request.headers })

  if (session === null) return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!login|api|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
} satisfies MiddlewareConfig
