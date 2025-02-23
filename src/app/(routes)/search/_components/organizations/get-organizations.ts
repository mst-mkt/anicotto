import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'

export const searchOrganizations = async (query: string) => {
  await auth()

  const organizationsResult = await annictApiClient.getOrganizations(
    { query: { filter_name: query, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.ORGANIZATIONS] } },
  )

  if (organizationsResult.isErr()) {
    return null
  }

  return organizationsResult.value.organizations
}
