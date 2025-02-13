'use server'

import { signIn } from '../../../lib/auth'

export const loginAction = async () => {
  await signIn('annict', { redirectTo: '/' })
}
