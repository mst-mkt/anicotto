import type { NextRequest } from 'next/server'

// Wrapping the handler because an error will occur if it is not a dynamic import.

export const GET = async (request: NextRequest) => {
  const { handlers } = await import('../../../../lib/auth')
  return handlers.GET(request)
}

export const POST = async (request: NextRequest) => {
  const { handlers } = await import('../../../../lib/auth')
  return handlers.POST(request)
}
