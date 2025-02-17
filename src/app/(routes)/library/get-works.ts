import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import type { Status } from '../../../schemas/annict/common'

export const getWorks = async (status: Status) => {
  await auth()

  const worksResult = await annictApiClient.getMyWorks(
    { query: { filter_status: status, sort_season: 'desc' } },
    { next: { tags: ['libraries', `libraries-${status}`] } },
  )

  if (worksResult.isErr()) {
    console.error('[/libraries] Failed to fetch works:', worksResult.error)
    return null
  }

  return worksResult.value.works
}
