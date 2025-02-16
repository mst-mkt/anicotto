import { annictApiClient } from '../../lib/api/client'
import { auth } from '../../lib/auth'

export const getWorks = async () => {
  await auth()

  const worksResult = await annictApiClient.getMyWorks(
    { query: { sort_season: 'desc', filter_status: 'watching' } },
    { next: { tags: ['my-works'] } },
  )

  if (worksResult.isErr()) {
    return null
  }

  return worksResult.value.works
}
