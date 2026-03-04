import type { Session, User } from 'better-auth/types'
import { createFactory, type Factory } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { trimTrailingSlash } from 'hono/trailing-slash'

import { appError } from './libs/error'
import type { AnnictClient } from './types/annict-client'

export type CloudflareEnv = {
  Bindings: CloudflareBindings
  Variables: {
    user: User | null
    session: Session | null
    annictClient: AnnictClient
  }
}

export const honoFactory: Factory<CloudflareEnv> = createFactory<CloudflareEnv>({
  initApp: (app) => {
    app.use(trimTrailingSlash())
    app.use(logger())
    app.use(poweredBy())

    app.onError((error) => {
      if (error instanceof HTTPException) {
        return error.getResponse()
      }

      console.error('[server] Unhandled error:', error)
      return appError('INTERNAL_ERROR').getResponse()
    })
  },
})
