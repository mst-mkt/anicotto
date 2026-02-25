import { genericOAuthClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const { signIn, signOut, useSession, getSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [genericOAuthClient()],
  fetchOptions: {
    onRequest: async (ctx) => {
      if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers')
        const cookieStore = await cookies()
        ctx.headers.set('cookie', cookieStore.toString())
      }
      return ctx
    },
  },
})
