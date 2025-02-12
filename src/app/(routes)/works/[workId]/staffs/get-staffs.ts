import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'

export const getStaffs = async (workId: number) => {
  await auth()

  const staffsResult = await annictApiClient.getStaffs(
    { query: { filter_work_id: workId, sort_sort_number: 'asc' } },
    { next: { tags: [`work-staffs-${workId}`] } },
  )

  if (staffsResult.isErr()) {
    console.error(`[/works/${workId}/staffs] Failed to fetch staffs:`, staffsResult.error)
    return null
  }

  return staffsResult.value.staffs
}
