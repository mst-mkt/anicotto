import { genericOAuthClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
})

export const login = async () => {
  await authClient.signIn.oauth2({ providerId: 'annict' })
}

export const logout = async () => {
  await authClient.signOut()
}
