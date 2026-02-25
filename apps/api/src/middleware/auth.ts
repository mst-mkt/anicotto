import { createMiddleware } from 'hono/factory'

import { auth } from '../libs/auth/client'

export const requireAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (session === null) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  c.set('user', session.user)
  c.set('session', session.session)
  await next()
})

export const optionalAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (session !== null) {
    c.set('user', session.user)
    c.set('session', session.session)
  } else {
    c.set('user', null)
    c.set('session', null)
  }

  await next()
})
