import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Work } from '../../../../schemas/annict/works'

export const getEpisodes = async (workId: Work['id'], per = 20, page = 1) => {
  await auth()

  const episodesResult = await annictApiClient.getEpisodes(
    { query: { filter_work_id: workId, per_page: per, page, sort_sort_number: 'asc' } },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_EPISODES(workId)] } },
  )

  if (episodesResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch episodes:`, episodesResult.error)
    return null
  }

  return episodesResult.value.episodes
}
