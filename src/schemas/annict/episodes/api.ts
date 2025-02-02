import {
  array,
  integer,
  maxValue,
  minValue,
  nullable,
  number,
  object,
  optional,
  pipe,
} from 'valibot'
import { episodeSchema } from '.'
import { commaSeparatedString, order, pagenationInfo } from '../common'
import { workSchema } from '../works'

export const episodesQuerySchema = object({
  filter_ids: optional(commaSeparatedString(episodeSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  page: optional(pipe(number(), integer())),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
  sort_sort_number: optional(order),
})

export const episodesResponseSchema = object({
  episodes: array(
    object({
      ...episodeSchema.entries,
      work: workSchema,
      prev_episode: nullable(episodeSchema),
      next_episode: nullable(episodeSchema),
    }),
  ),
  ...pagenationInfo.entries,
})
