import { createAnnictClient } from '@anicotto/annict-rest-client'
import { createMiddleware } from 'hono/factory'

import type { CloudflareEnv } from '../factory'
import { auth } from '../libs/auth/client'
import { getOAuthToken } from '../libs/auth/token'
import { appError } from '../libs/error'

export const requireAuth = createMiddleware<CloudflareEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (session === null) {
    throw appError('UNAUTHORIZED')
  }

  c.set('user', session.user)
  c.set('session', session.session)

  const annictTokenResult = await getOAuthToken(session.user.id, 'annict')
  if (!annictTokenResult.ok) {
    throw appError(annictTokenResult.error)
  }
  c.set('annictClient', createAnnictClient(annictTokenResult.value))

  await next()
})

export const optionalAuth = createMiddleware<CloudflareEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (session !== null) {
    c.set('user', session.user)
    c.set('session', session.session)

    const annictTokenResult = await getOAuthToken(session.user.id, 'annict')
    if (annictTokenResult.ok) {
      c.set('annictClient', createAnnictClient(annictTokenResult.value))
    }
  } else {
    c.set('user', null)
    c.set('session', null)
  }

  await next()
})
