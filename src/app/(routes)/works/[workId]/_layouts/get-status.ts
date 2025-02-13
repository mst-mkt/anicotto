import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import type { Work } from '../../../../../schemas/annict/works'

export const getWorkStatus = async (workId: Work['id']) => {
  await auth()

  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [`work-status-${workId}`] } },
  )

  if (statusResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch status:`, statusResult.error)
    return null
  }

  return statusResult.value.works.at(0)?.status.kind ?? 'no_select'
}
