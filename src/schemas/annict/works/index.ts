import { boolean, integer, minValue, number, object, pipe, string } from 'valibot'
import { media, mediaText, numericString } from '../common'

export const workSchema = object({
  id: pipe(number(), integer()),
  title: string(),
  title_kana: string(),
  media: media,
  media_text: mediaText,
  season_name: string(),
  season_name_text: string(),
  released_on: string(),
  released_on_about: string(),
  official_site_url: string(),
  wikipedia_url: string(),
  twitter_username: string(),
  twitter_hashtag: string(),
  syobocal_tid: numericString,
  mal_anime_id: numericString,
  images: object({
    recommended_url: string(),
    facebook: object({
      og_image_url: string(),
    }),
    twitter: object({
      mini_avatar_url: string(),
      normal_avatar_url: string(),
      bigger_avatar_url: string(),
      original_avatar_url: string(),
      image_url: string(),
    }),
  }),
  episodes_count: pipe(number(), integer(), minValue(0)),
  watchers_count: pipe(number(), integer(), minValue(0)),
  reviews_count: pipe(number(), integer(), minValue(0)),
  no_episodes: boolean(),
})
