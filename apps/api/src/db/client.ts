import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'

import { schema } from './schema'

export const dbClient = drizzle(env.DB, { schema })
