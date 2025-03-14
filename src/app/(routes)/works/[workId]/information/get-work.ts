import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { Work } from '../../../../../schemas/annict/works'

export const getWork = async (workId: Work['id']) => {
  await auth()

  const worksResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.WORK(workId)] } },
  )

  if (worksResult.isErr()) {
    console.error(`[/works/${workId}/information] Failed to fetch work:`, worksResult.error)
    return null
  }

  return worksResult.value.works.at(0) ?? null
}
