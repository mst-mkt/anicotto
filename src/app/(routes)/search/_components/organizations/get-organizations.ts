import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { SearchOrder } from '../../search-params'

export const searchOrganizations = async (query: string, order: SearchOrder) => {
  await auth()

  const organizationsResult = await annictApiClient.getOrganizations(
    { query: { filter_name: query, sort_id: order } },
    { next: { tags: [CACHE_TAGS.ORGANIZATIONS] } },
  )

  if (organizationsResult.isErr()) {
    return null
  }

  return organizationsResult.value.organizations
}
