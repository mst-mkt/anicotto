import { annictApiClient } from '../../../../../lib/api/annict-rest/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'
import type { SearchOrder } from '../../search-params'

export const searchCharacters = async (query: string, order: SearchOrder) => {
  await auth()

  const charactersResult = await annictApiClient.getCharacters(
    { query: { filter_name: query, sort_id: order } },
    { next: { tags: [CACHE_TAGS.CHARACTERS] } },
  )

  if (charactersResult.isErr()) {
    return null
  }

  return charactersResult.value.characters
}
