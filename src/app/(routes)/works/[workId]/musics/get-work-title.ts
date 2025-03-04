import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { Work } from '../../../../../schemas/annict/works'

export const getWorkTitle = async (workId: Work['id']) => {
  await auth()

  const titleResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.WORK(workId)] } },
  )

  if (titleResult.isErr()) {
    console.error(`[/works/${workId}/musics] Failed to fetch work`, titleResult.error)
    return null
  }

  return titleResult.value.works.at(0)?.title ?? null
}
