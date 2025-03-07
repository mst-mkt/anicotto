import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { SearchOrder, SearchSort } from '../../search-params'

export const searchWorks = async (
  query: string,
  sort: SearchSort,
  order: SearchOrder,
  season?: string,
) => {
  await auth()

  const worksResult = await annictApiClient.getWorks(
    {
      query: {
        filter_title: query,
        filter_season: season,
        sort_id: sort === 'id' ? order : undefined,
        sort_season: sort === 'season' ? order : undefined,
        sort_watchers_count: sort === 'watchers' ? order : undefined,
      },
    },
    { next: { tags: [CACHE_TAGS.WORKS] } },
  )

  if (worksResult.isErr()) {
    return null
  }

  return worksResult.value.works
}
