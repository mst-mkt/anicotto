'use server'

import { signIn } from 'next-auth/react'

export const loginAction = async () => {
  await signIn('annict', { redirectTo: '/' })
}
