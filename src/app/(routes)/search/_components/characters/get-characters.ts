import { annictApiClient } from '../../../../../lib/api/client'
import { auth } from '../../../../../lib/auth'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'

export const searchCharacters = async (query: string) => {
  await auth()

  const charactersResult = await annictApiClient.getCharacters(
    { query: { filter_name: query, sort_id: 'desc' } },
    { next: { tags: [CACHE_TAGS.CHARACTERS] } },
  )

  if (charactersResult.isErr()) {
    return null
  }

  return charactersResult.value.characters
}
