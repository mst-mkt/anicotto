import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'

export const getCasts = async (workId: number) => {
  await auth()

  const castsResult = await annictApiClient.getCasts(
    { query: { filter_work_id: workId, per_page: 50, sort_sort_number: 'asc' } },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_CASTS(workId)] } },
  )

  if (castsResult.isErr()) {
    console.error(`[/works/${workId}/casts] Failed to fetch casts:`, castsResult.error)
    return null
  }

  return castsResult.value.casts
}
