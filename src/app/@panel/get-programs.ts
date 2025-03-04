import { annictApiClient } from '../../lib/api/annict-rest/client'
import { auth } from '../../lib/auth'
import { CACHE_TAGS } from '../../lib/cache-tag'

export const getWorks = async () => {
  await auth()

  const worksResult = await annictApiClient.getMyWorks(
    { query: { sort_season: 'desc', filter_status: 'watching' } },
    {
      next: {
        tags: [CACHE_TAGS.ME, CACHE_TAGS.MY_LIBRARIES, CACHE_TAGS.MY_LIBRARIES_STATUS('watching')],
      },
    },
  )

  if (worksResult.isErr()) {
    return null
  }

  return worksResult.value.works
}
