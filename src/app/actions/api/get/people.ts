'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'

export const searchPeople = async (
  search: {
    query: string
    order: 'asc' | 'desc'
  },
  page = 1,
) => {
  await auth()

  const peopleResult = await annictApiClient.getPeople(
    { query: { filter_name: search.query, sort_id: search.order, per_page: 20, page } },
    { next: { tags: [CACHE_TAGS.PEOPLE] } },
  )

  if (peopleResult.isErr()) {
    console.error(`Failed to fetch people (query:${search.query}):`, peopleResult.error)
    return null
  }

  return {
    data: peopleResult.value.people,
    next_page: peopleResult.value.next_page,
  }
}
