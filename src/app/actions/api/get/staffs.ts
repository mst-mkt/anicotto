'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'
import type { Work } from '../../../../schemas/annict/works'

export const getWorkStaffs = async (workId: Work['id']) => {
  await auth()

  const staffsResult = await annictApiClient.getStaffs(
    { query: { filter_work_id: workId, per_page: 50, sort_sort_number: 'asc' } },
    { next: { tags: [CACHE_TAGS.WORK(workId), CACHE_TAGS.WORK_STAFFS(workId)] } },
  )

  if (staffsResult.isErr()) {
    console.error(`Failed to fetch staffs of work (${workId}):`, staffsResult.error)
    return null
  }

  return staffsResult.value.staffs
}
