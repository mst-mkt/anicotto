import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { SearchOrder } from '../../search-params'

export const searchPeople = async (query: string, order: SearchOrder) => {
  await auth()

  const peopleResult = await annictApiClient.getPeople(
    { query: { filter_name: query, sort_id: order } },
    { next: { tags: [CACHE_TAGS.PEOPLE] } },
  )

  if (peopleResult.isErr()) {
    return null
  }

  return peopleResult.value.people
}
