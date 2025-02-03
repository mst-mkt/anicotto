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
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { workSchema } from '../works'

export const getEpisodesQuerySchema = object({
  filter_ids: optional(commaSeparatedString(episodeSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  page: optional(pipe(number(), integer())),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
  sort_sort_number: optional(orderPicklist),
})

export const getEpisodesResponseSchema = object({
  episodes: array(
    object({
      ...episodeSchema.entries,
      work: workSchema,
      prev_episode: nullable(episodeSchema),
      next_episode: nullable(episodeSchema),
    }),
  ),
  ...paginationInfoSchema.entries,
})
