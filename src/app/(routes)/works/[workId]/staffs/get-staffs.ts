import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import type { Work } from '../../../../../schemas/annict/works'

export const getStaffs = async (workId: Work['id']) => {
  await auth()

  const staffsResult = await annictApiClient.getStaffs(
    { query: { filter_work_id: workId, per_page: 50, sort_sort_number: 'asc' } },
    { next: { tags: [`work-staffs-${workId}`] } },
  )

  if (staffsResult.isErr()) {
    console.error(`[/works/${workId}/staffs] Failed to fetch staffs:`, staffsResult.error)
    return null
  }

  return staffsResult.value.staffs
}
