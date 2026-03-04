import type { components } from '@anicotto/annict-rest-client'
import { parseSeason } from '@anicotto/domain/season'
import { buildHashtagUrls, buildTwitterAccountUrl, WorkSchema } from '@anicotto/domain/work'
import { emptyToNull, parseIntOrNull } from '@anicotto/utils/normalize'
import { err, ok } from '@anicotto/utils/result'
import * as v from 'valibot'

import { convertFromAnnict } from '../../../libs/anime-id'

type AnnictWork = components['schemas']['Models.Work']

export const convertAnnictWork = (annictWork: AnnictWork) => {
  const hashtag = emptyToNull(annictWork.twitter_hashtag)
  const twitterUsername = emptyToNull(annictWork.twitter_username)

  const result = v.safeParse(WorkSchema, {
    id: annictWork.id,
    title: annictWork.title,
    media: annictWork.media,
    season: parseSeason(annictWork.season_name),
    thumbnailUrl: emptyToNull(annictWork.images.recommended_url),
    counts: {
      episodes: annictWork.episodes_count,
      reviews: annictWork.reviews_count,
      watchers: annictWork.watchers_count,
    },
    hashtag: hashtag ? buildHashtagUrls(hashtag) : null,
    links: {
      officialSiteUrl: emptyToNull(annictWork.official_site_url),
      wikipediaUrl: emptyToNull(annictWork.wikipedia_url),
      twitterAccount: twitterUsername ? buildTwitterAccountUrl(twitterUsername) : null,
    },
    externalIds: {
      myAnimeList:
        parseIntOrNull(annictWork.mal_anime_id) ??
        convertFromAnnict('myAnimeList', annictWork.id) ??
        null,
      anilist: convertFromAnnict('anilist', annictWork.id) ?? null,
      syoboiCalendar:
        parseIntOrNull(annictWork.syobocal_tid) ??
        convertFromAnnict('syoboiCalendar', annictWork.id) ??
        null,
    },
  })

  if (!result.success) {
    console.error('[work:converter] Failed to convert work:', {
      id: annictWork.id,
      issues: v.flatten(result.issues),
    })
    return err('BAD_GATEWAY')
  }

  return ok(result.output)
}
