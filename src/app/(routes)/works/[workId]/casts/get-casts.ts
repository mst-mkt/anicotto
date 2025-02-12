import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'

export const getCasts = async (workId: number) => {
  await auth()

  const castsResult = await annictApiClient.getCasts(
    { query: { filter_work_id: workId, sort_sort_number: 'asc' } },
    { next: { tags: [`work-casts-${workId}`] } },
  )

  if (castsResult.isErr()) {
    console.error(`[/works/${workId}/casts] Failed to fetch casts:`, castsResult.error)
    return null
  }

  return castsResult.value.casts
}
