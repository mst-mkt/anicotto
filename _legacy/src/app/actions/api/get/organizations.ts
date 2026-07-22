'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'

export const searchOrganizations = async (
  search: {
    query: string
    order: 'asc' | 'desc'
  },
  page = 1,
) => {
  await auth()

  const organizationsResult = await annictApiClient.getOrganizations(
    { query: { filter_name: search.query, sort_id: search.order, per_page: 20, page } },
    { next: { tags: [CACHE_TAGS.ORGANIZATIONS] } },
  )

  if (organizationsResult.isErr()) {
    console.error(
      `Failed to fetch organizations (query:${search.query}):`,
      organizationsResult.error,
    )
    return null
  }

  return {
    data: organizationsResult.value.organizations,
    next_page: organizationsResult.value.next_page,
  }
}
