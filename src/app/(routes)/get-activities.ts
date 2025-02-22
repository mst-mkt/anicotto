import { annictApiClient } from '../../lib/api/client'
import { auth } from '../../lib/auth'
import { CACHE_TAGS } from '../../lib/cache-tag'

export const getActivities = async (per = 20, page = 1) => {
  await auth()

  const activities = await annictApiClient.getFollowingActivities(
    { query: { per_page: per, page, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_ACTIVITY], revalidate: 60 } },
  )

  if (activities.isErr()) {
    console.error('[/] Failed to fetch activities:', activities.error)
    return null
  }

  return activities.value.activities
}
