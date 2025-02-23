import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'

export const searchPeople = async (query: string) => {
  await auth()

  const peopleResult = await annictApiClient.getPeople(
    { query: { filter_name: query, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.PEOPLE] } },
  )

  if (peopleResult.isErr()) {
    return null
  }

  return peopleResult.value.people
}
