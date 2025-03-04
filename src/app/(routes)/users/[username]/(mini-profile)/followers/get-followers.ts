import { annictApiClient } from '../../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../../lib/cache-tag'
import type { User } from '../../../../../../schemas/annict/users'

export const getFollowers = async (username: User['username']) => {
  await auth()

  const followersResult = await annictApiClient.getFollowers(
    { query: { filter_username: username, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.FOLLOWERS(username)] } },
  )

  if (followersResult.isErr()) {
    console.error(
      `[/users/${username}/followers] Failed to fetch followers:`,
      followersResult.error,
    )
    return null
  }

  return followersResult.value.users
}
