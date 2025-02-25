import { annictApiClient } from '../../../../lib/api/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { User } from '../../../../schemas/annict/users'

export const getUser = async (username: User['username']) => {
  await auth()

  const userResult = await annictApiClient.getUsers(
    { query: { filter_usernames: [username], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.USER(username)] } },
  )

  if (userResult.isErr()) {
    return null
  }

  return userResult.value.users.at(0) ?? null
}
