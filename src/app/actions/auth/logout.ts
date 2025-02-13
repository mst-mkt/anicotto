'use server'

import { signOut } from 'next-auth/react'

export const logoutAction = async () => {
  await signOut({ redirectTo: '/login' })
}
