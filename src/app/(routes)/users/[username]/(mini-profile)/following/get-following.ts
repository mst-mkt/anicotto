import { annictApiClient } from '../../../../../../lib/api/client'
import { auth } from '../../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../../lib/cache-tag'
import type { User } from '../../../../../../schemas/annict/users'

export const getFollowing = async (username: User['username']) => {
  await auth()

  const followingResult = await annictApiClient.getFollowing(
    { query: { filter_username: username, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.FOLLOWING(username)] } },
  )

  if (followingResult.isErr()) {
    console.error(
      `[/users/${username}/following] Failed to fetch following:`,
      followingResult.error,
    )
    return null
  }

  return followingResult.value.users
}
