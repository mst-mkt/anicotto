import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'

export const searchWorks = async (query: string) => {
  await auth()

  const worksResult = await annictApiClient.getWorks(
    { query: { filter_title: query, sort_watchers_count: 'desc' } },
    { next: { tags: [CACHE_TAGS.WORKS] } },
  )

  if (worksResult.isErr()) {
    return null
  }

  return worksResult.value.works
}
