'use server'

import { revalidateTag } from 'next/cache'
import { signOut } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'

export const logoutAction = async () => {
  await signOut({ redirectTo: '/login' })
  revalidateTag(CACHE_TAGS.ME)
}
