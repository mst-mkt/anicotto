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
  string,
} from 'valibot'
import { programSchema } from '.'
import { channelSchema, commaSeparatedString, order, paginationInfo } from '../common'
import { workSchema } from '../works'

export const meProgramsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(programSchema.entries.id)),
  filter_channel_ids: optional(commaSeparatedString(channelSchema.entries.id)),
  filter_work_ids: optional(commaSeparatedString(workSchema.entries.id)),
  filter_started_at_gt: optional(string()),
  filter_started_at_lt: optional(string()),
  filter_unwatched: optional(boolean()),
  filter_rebroadcast: optional(boolean()),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
  sort_started_at: optional(order),
})

export const meProgramsResponseSchema = object({
  programs: array(programSchema),
  ...paginationInfo.entries,
})
