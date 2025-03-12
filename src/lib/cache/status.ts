import type { Status } from '../../schemas/annict/common'
import type { Work } from '../../schemas/annict/works'
import { annictApiClient } from '../api/annict-rest/client'
import { auth } from '../auth'
import { CACHE_TAGS } from '../cache-tag'

const workStatusCache = new Map<Work['id'], Status>()

const fetchStatus = async (workId: Work['id']) => {
  await auth()

  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_STATUS(workId)] } },
  )

  if (statusResult.isErr()) {
    console.error(`[hover-card:work-${workId}] Failed to fetch status:`, statusResult.error)
    return 'no_select'
  }

  return statusResult.value.works.at(0)?.status.kind ?? 'no_select'
}

export const getWorkStatus = async (workId: Work['id']) => {
  if (workStatusCache.has(workId)) {
    return workStatusCache.get(workId) ?? 'no_select'
  }

  const status = await fetchStatus(workId)

  workStatusCache.set(workId, status)

  return status
}
