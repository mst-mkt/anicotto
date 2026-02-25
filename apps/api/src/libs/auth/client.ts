import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { genericOAuth } from 'better-auth/plugins'
import { env } from 'cloudflare:workers'

import { dbClient } from '../../db/client'
import { schema } from '../../db/schema'
import { annictProvider } from './annict-oauth-provider'

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, {
    provider: 'sqlite',
    schema: {
      user: schema.userSchema,
      account: schema.accountSchema,
      session: schema.sessionSchema,
      verification: schema.verificationSchema,
    },
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  basePath: '/api/auth',
  plugins: [genericOAuth({ config: [annictProvider] })],
  trustedOrigins: [env.BETTER_AUTH_URL],
})

export type Auth = typeof auth
