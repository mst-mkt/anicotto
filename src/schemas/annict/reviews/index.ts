import { integer, minValue, nullable, number, object, pipe, string } from 'valibot'
import { ratingPicklist } from '../common'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const reviewSchema = object({
  id: pipe(number(), integer()),
  title: nullable(string()),
  body: string(),
  rating_animation_state: ratingPicklist,
  rating_music_state: ratingPicklist,
  rating_story_state: ratingPicklist,
  rating_character_state: ratingPicklist,
  rating_overall_state: ratingPicklist,
  likes_count: pipe(number(), integer(), minValue(0)),
  impressions_count: pipe(number(), integer(), minValue(0)),
  created_at: string(),
  modified_at: string(),
  user: userSchema,
  work: workSchema,
})
