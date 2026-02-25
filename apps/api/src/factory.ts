import type { Session, User } from 'better-auth/types'
import { createFactory, type Factory } from 'hono/factory'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { trimTrailingSlash } from 'hono/trailing-slash'

export type CloudflareEnv = {
  Bindings: CloudflareBindings
  Variables: {
    user: User | null
    session: Session | null
  }
}

export const honoFactory: Factory<CloudflareEnv> = createFactory<CloudflareEnv>({
  initApp: (app) => {
    app.use(trimTrailingSlash())
    app.use(logger())
    app.use(poweredBy())
  },
})
