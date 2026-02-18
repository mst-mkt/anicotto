'use server'

import { annictApiClient } from '../../../../lib/api/annict-rest/client'
import { auth } from '../../../../lib/auth'
import { CACHE_TAGS } from '../../../../lib/cache-tag'

export const searchCharacters = async (
  search: {
    query: string
    order: 'asc' | 'desc'
  },
  page = 1,
) => {
  await auth()

  const charactersResult = await annictApiClient.getCharacters(
    { query: { filter_name: search.query, sort_id: search.order, per_page: 20, page } },
    { next: { tags: [CACHE_TAGS.CHARACTERS] } },
  )

  if (charactersResult.isErr()) {
    console.error(`Failed to fetch characters (query:${search.query}):`, charactersResult.error)
    return null
  }

  return { data: charactersResult.value.characters, next_page: charactersResult.value.next_page }
}
