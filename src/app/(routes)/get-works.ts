import { annictApiClient } from '../../lib/api/client'
import { auth } from '../../lib/auth'
import { getCurrentSeason } from '../../utils/get-season'

export const getWorks = async () => {
  await auth()

  const currentSeason = getCurrentSeason()

  const works = await annictApiClient.getWorks(
    { query: { filter_season: currentSeason, sort_watchers_count: 'desc', per_page: 10 } },
    { next: { tags: [`works-${currentSeason}`] } },
  )

  if (works.isErr()) {
    console.error('[/] Failed to fetch works:', works.error)
    return null
  }

  return works.value.works
}
