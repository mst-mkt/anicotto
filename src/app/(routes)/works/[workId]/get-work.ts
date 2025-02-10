import { annictApiClient } from '../../../../lib/api/client'
import { auth } from '../../../../lib/auth'

export const getWork = async (workId: number) => {
  await auth()
  const worksResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [`works-${workId}`] } },
  )

  if (worksResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch work:`, worksResult.error)
    return null
  }

  return worksResult.value.works.at(0) ?? null
}

export const getWorkStatus = async (workId: number) => {
  await auth()
  const statusResult = await annictApiClient.getMyWorks(
    { query: { filter_ids: [workId] } },
    { next: { tags: [`status-${workId}`] } },
  )

  if (statusResult.isErr()) {
    console.error(`[/works/${workId}] Failed to fetch status:`, statusResult.error)
    return null
  }

  return statusResult.value.works.at(0)?.status.kind ?? 'no_select'
}
