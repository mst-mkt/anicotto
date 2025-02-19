import { annictApiClient } from '../../../../../../lib/api/client'
import { auth } from '../../../../../../lib/auth'
import type { User } from '../../../../../../schemas/annict/users'

export const getFollowers = async (username: User['username']) => {
  await auth()

  const followersResult = await annictApiClient.getFollowers(
    { query: { filter_username: username, sort_id: 'desc' } },
    { next: { tags: [`followers-${username}`] } },
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
