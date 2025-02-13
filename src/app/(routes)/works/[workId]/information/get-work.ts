import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import type { Work } from '../../../../../schemas/annict/works'

export const getWork = async (workId: Work['id']) => {
  await auth()

  const worksResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId], per_page: 1 } },
    { next: { tags: [`work-${workId}`] } },
  )

  if (worksResult.isErr()) {
    console.error(`[/works/${workId}/information] Failed to fetch work:`, worksResult.error)
    return null
  }

  return worksResult.value.works.at(0) ?? null
}
