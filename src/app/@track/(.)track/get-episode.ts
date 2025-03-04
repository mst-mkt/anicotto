'use server'

import { annictApiClient } from '../../../lib/api/annict-rest/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import type { Episode } from '../../../schemas/annict/episodes'

export const getEpisode = async (episode: Episode['id']) => {
  await auth()

  const episodeResult = await annictApiClient.getEpisodes(
    { query: { filter_ids: [episode], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.EPISODE(episode)] } },
  )

  if (episodeResult.isErr()) {
    console.error('[/track] Failed to fetch episode:', episodeResult.error)
    return null
  }

  return episodeResult.value.episodes.at(0) ?? null
}
