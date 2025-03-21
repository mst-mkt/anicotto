'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import type { Work } from '../../../../schemas/annict/works'

export const getWorkCasts = async (workId: Work['id']) => {
  await auth()

  const castsResult = await annictApiClient.getCasts(
    { query: { filter_work_id: workId, per_page: 50, sort_sort_number: 'asc' } },
    { next: { tags: [`WORK_${workId}`, `WORK_CASTS_${workId}`] } },
  )

  if (castsResult.isErr()) {
    console.error(`Failed to fetch casts of work (${workId}):`, castsResult.error)
    return null
  }

  return castsResult.value.casts
}
