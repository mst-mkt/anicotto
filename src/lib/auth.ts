import { betterAuth } from 'better-auth'
import { genericOAuth } from 'better-auth/plugins'
import { D1Dialect } from 'kysely-d1'
import { ANNICT_API_V1_BASEURL, ANNICT_OAUTH_BASEURL } from '../constants/annict'
import { getDb } from './db'
import { envVariables } from './env-variables'

export const auth = betterAuth({
  secret: envVariables.BETTER_AUTH_SECRET,
  baseURL: envVariables.BETTER_AUTH_URL,
  database: new D1Dialect({ database: getDb() }),
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: 'annict',
          clientId: envVariables.ANNICT_CLIENT_ID,
          clientSecret: envVariables.ANNICT_CLIENT_SECRET,
          redirectURI: `${envVariables.BETTER_AUTH_URL}/api/auth/oauth2/callback/annict`,
          responseType: 'code',
          scopes: ['read', 'write'],
          authorizationUrl: `${ANNICT_OAUTH_BASEURL}/authorize`,
          tokenUrl: `${ANNICT_OAUTH_BASEURL}/token`,
          userInfoUrl: `${ANNICT_API_V1_BASEURL}/me`,
        },
      ],
    }),
  ],
})
