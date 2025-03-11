import { annictApiClient } from '../../../lib/api/annict-rest/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import type { Work } from '../../../schemas/annict/works'

export const getWorkStatus = async (workId: Work['id']) => {
  await auth()

  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_STATUS(workId)] } },
  )

  if (statusResult.isErr()) {
    console.error(`[hover-card:work-${workId}] Failed to fetch status:`, statusResult.error)
    return null
  }

  return statusResult.value.works.at(0)?.status.kind ?? 'no_select'
}
