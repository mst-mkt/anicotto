import {
  array,
  boolean,
  integer,
  maxValue,
  minValue,
  number,
  object,
  optional,
  pipe,
} from 'valibot'
import { reviewSchema } from '.'
import { commaSeparatedString, order, paginationInfo } from '../common'
import { workSchema } from '../works'

export const getReviewsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(reviewSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  filter_has_review_body: optional(boolean()),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
  sort_likes_count: optional(order),
})

export const getReviewsResponseSchema = object({
  reviews: array(reviewSchema),
  ...paginationInfo.entries,
})

export const createReviewsQuerySchema = object({
  work_id: workSchema.entries.id,
  body: reviewSchema.entries.body,
  rating_animation_state: optional(reviewSchema.entries.rating_animation_state),
  rating_music_state: optional(reviewSchema.entries.rating_music_state),
  rating_story_state: optional(reviewSchema.entries.rating_story_state),
  rating_character_state: optional(reviewSchema.entries.rating_character_state),
  rating_overall_state: optional(reviewSchema.entries.rating_overall_state),
  share_twitter: optional(boolean()),
  share_facebook: optional(boolean()),
})

export const createReviewsResponseSchema = object({
  ...reviewSchema.entries,
})

export const updateReviewsQuerySchema = object({
  body: reviewSchema.entries.body,
  rating_animation_state: optional(reviewSchema.entries.rating_animation_state),
  rating_music_state: optional(reviewSchema.entries.rating_music_state),
  rating_story_state: optional(reviewSchema.entries.rating_story_state),
  rating_character_state: optional(reviewSchema.entries.rating_character_state),
  rating_overall_state: optional(reviewSchema.entries.rating_overall_state),
  share_twitter: optional(boolean()),
  share_facebook: optional(boolean()),
})
