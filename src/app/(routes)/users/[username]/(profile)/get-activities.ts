import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { User } from '../../../../../schemas/annict/users'

export const getActivities = async (username: User['username']) => {
  await auth()

  const activitiesResult = await annictApiClient.getActivities(
    { query: { filter_username: username, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.USER(username), CACHE_TAGS.USER_ACTIVITY(username)] } },
  )

  if (activitiesResult.isErr()) {
    console.error(`[/users/${username}] Failed to fetch activities:`, activitiesResult.error)
    return null
  }

  return activitiesResult.value.activities
}
