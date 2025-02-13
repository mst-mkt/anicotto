import { annictApiClient } from '../../../../lib/api/client'
import { auth } from '../../../../lib/auth'
import type { Work } from '../../../../schemas/annict/works'

export const getEpisodes = async (workId: Work['id'], per = 20, page = 1) => {
  await auth()

  const episodesResult = await annictApiClient.getEpisodes(
    { query: { filter_work_id: workId, per_page: per, page, sort_sort_number: 'asc' } },
    { next: { tags: [`work-episodes-${workId}`] } },
  )

  if (episodesResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch episodes:`, episodesResult.error)
    return null
  }

  return episodesResult.value.episodes
}
