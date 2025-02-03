import { integer, minValue, nullable, number, object, pipe, string } from 'valibot'
import { rating } from '../common'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const reviewSchema = object({
  id: number(),
  title: nullable(string()),
  body: string(),
  rating_animation_state: rating,
  rating_music_state: rating,
  rating_story_state: rating,
  rating_character_state: rating,
  rating_overall_state: rating,
  likes_count: pipe(number(), integer(), minValue(0)),
  impressions_count: pipe(number(), integer(), minValue(0)),
  created_at: string(),
  modified_at: string(),
  user: userSchema,
  work: workSchema,
})
