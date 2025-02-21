import { annictApiClient } from '../../../../lib/api/client'
import { auth } from '../../../../lib/auth'
import type { Work } from '../../../../schemas/annict/works'

export const getWork = async (workId: Work['id']) => {
  await auth()

  const workResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId], per_page: 1 } },
    { next: { tags: [`work-${workId}`] } },
  )

  if (workResult.isErr()) {
    console.error('[/track/[workId]] Failed to fetch work:', workResult.error)
    return null
  }

  return workResult.value.works.at(0) ?? null
}
