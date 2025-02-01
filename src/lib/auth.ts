import NextAuth from 'next-auth'
import { AnnictProvider } from './auth-provider'
import { envVariables } from './env-variables'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: envVariables.AUTH_SECRET,
  providers: [
    AnnictProvider({
      redirectUri: `${envVariables.BASE_URL}/api/auth/callback/annict`,
      clientId: envVariables.ANNICT_CLIENT_ID,
      clientSecret: envVariables.ANNICT_CLIENT_SECRET,
    }),
  ],
})
