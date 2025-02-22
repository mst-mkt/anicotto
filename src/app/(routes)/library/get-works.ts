import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import type { Status } from '../../../schemas/annict/common'

export const getWorks = async (status: Status) => {
  await auth()

  const worksResult = await annictApiClient.getMyWorks(
    { query: { filter_status: status, sort_season: 'desc' } },
    {
      next: {
        tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES, CACHE_TAGS.MY_LIBRARIES_STATUS(status)],
      },
    },
  )

  if (worksResult.isErr()) {
    console.error('[/libraries] Failed to fetch works:', worksResult.error)
    return null
  }

  return worksResult.value.works
}
