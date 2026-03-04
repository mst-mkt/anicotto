import * as v from 'valibot'

import { MediaSchema } from './media'
import { IdSchema, NonNegativeIntSchema, UrlSchema } from './primitives'
import { SeasonSchema } from './season'

export const WorkSchema = v.object({
  id: IdSchema('WorkId'),
  title: v.pipe(v.string(), v.nonEmpty()),
  media: MediaSchema,
  season: v.nullable(SeasonSchema),
  thumbnailUrl: v.nullable(UrlSchema),
  counts: v.object({
    episodes: NonNegativeIntSchema,
    reviews: NonNegativeIntSchema,
    watchers: NonNegativeIntSchema,
  }),
  hashtag: v.nullable(
    v.object({
      tag: v.pipe(v.string(), v.nonEmpty()),
      twitterUrl: UrlSchema,
      pixivUrl: UrlSchema,
      youtubeUrl: UrlSchema,
    }),
  ),
  links: v.object({
    officialSiteUrl: v.nullable(UrlSchema),
    wikipediaUrl: v.nullable(UrlSchema),
    twitterAccount: v.nullable(
      v.object({
        username: v.pipe(v.string(), v.nonEmpty()),
        url: UrlSchema,
      }),
    ),
  }),
  externalIds: v.object({
    myAnimeList: v.nullable(NonNegativeIntSchema),
    anilist: v.nullable(NonNegativeIntSchema),
    syoboiCalendar: v.nullable(NonNegativeIntSchema),
  }),
})

export type Work = v.InferOutput<typeof WorkSchema>
export type WorkId = Work['id']

export const buildHashtagUrls = (tag: string) => {
  const encodedTag = encodeURIComponent(tag)

  return {
    tag,
    twitterUrl: `https://x.com/hashtag/${encodedTag}`,
    pixivUrl: `https://www.pixiv.net/tags/${encodedTag}`,
    youtubeUrl: `https://www.youtube.com/results?search_query=%23${encodedTag}`,
  }
}

export const buildTwitterAccountUrl = (username: string) => ({
  username,
  url: `https://x.com/${username}`,
})
