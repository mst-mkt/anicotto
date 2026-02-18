'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { User } from '../../../../schemas/annict/users'

export const getMe = async () => {
  const session = await auth()

  if (session === null) {
    return null
  }

  const meResult = await annictApiClient.getMe({}, { next: { tags: [CACHE_TAGS.ME] } })

  if (meResult.isErr()) {
    console.error('Failed to fetch me data:', meResult.error)
    return null
  }

  return meResult.value
}

export const getUser = async (username: User['username']) => {
  await auth()

  const userResult = await annictApiClient.getUsers(
    { query: { filter_usernames: [username], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.USER(username)] } },
  )

  if (userResult.isErr()) {
    console.error(`Failed to fetch user data (${username}):`, userResult.error)
    return null
  }

  return userResult.value.users.at(0) ?? null
}
