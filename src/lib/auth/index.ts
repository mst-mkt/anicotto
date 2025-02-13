import NextAuth from 'next-auth'
import { annictApiClient } from '../api/client'
import { envVariables } from '../env-variables'
import { AnnictProvider } from './provider'
import 'next-auth/jwt'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: envVariables.AUTH_SECRET,
  providers: [
    AnnictProvider({
      redirectUri: `${envVariables.BASE_URL}/api/auth/callback/annict`,
      clientId: envVariables.ANNICT_CLIENT_ID,
      clientSecret: envVariables.ANNICT_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token !== undefined) {
        token.accessToken = account.access_token
      }

      return token
    },
    session: ({ session, token }) => {
      if (token.accessToken !== undefined) {
        annictApiClient.setAccessToken(token.accessToken)
        session.accessToken = token.accessToken
      }

      return session
    },
  },
})

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
