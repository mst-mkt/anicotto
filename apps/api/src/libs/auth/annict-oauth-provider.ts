import type { GenericOAuthConfig } from 'better-auth/plugins/generic-oauth'
import { env } from 'cloudflare:workers'
import * as v from 'valibot'

// ref: https://developers.annict.com/docs/rest-api/v1/users
const annictMeSchema = v.object({
  id: v.number(),
  name: v.string(),
  email: v.string(),
  avatar_url: v.string(),
})

export const annictProvider = {
  providerId: 'annict',
  clientId: env.ANNICT_CLIENT_ID,
  clientSecret: env.ANNICT_CLIENT_SECRET,
  authorizationUrl: 'https://api.annict.com/oauth/authorize',
  tokenUrl: 'https://api.annict.com/oauth/token',
  userInfoUrl: 'https://api.annict.com/v1/me',
  scopes: ['read', 'write'],
  mapProfileToUser: async (profile) => {
    const parsed = v.parse(annictMeSchema, profile)
    return {
      id: parsed.id.toString(),
      name: parsed.name,
      email: parsed.email,
      image: parsed.avatar_url,
    }
  },
} satisfies GenericOAuthConfig
