import { integer, minValue, nullable, number, object, pipe, string } from 'valibot'

export const userSchema = object({
  id: number(),
  username: string(),
  name: string(),
  description: string(),
  url: nullable(string()),
  avatar_url: string(),
  background_image_url: string(),
  records_count: pipe(number(), integer(), minValue(0)),
  followings_count: pipe(number(), integer(), minValue(0)),
  followers_count: pipe(number(), integer(), minValue(0)),
  wanna_watch_count: pipe(number(), integer(), minValue(0)),
  watching_count: pipe(number(), integer(), minValue(0)),
  watched_count: pipe(number(), integer(), minValue(0)),
  on_hold_count: pipe(number(), integer(), minValue(0)),
  stop_watching_count: pipe(number(), integer(), minValue(0)),
  created_at: string(),
})
