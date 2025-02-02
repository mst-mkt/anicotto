import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { peopleSchema, peopleWithPrefectureSchema } from '.'
import { commaSeparatedString, order, paginationInfo } from '../common'

export const peopleQuerySchema = object({
  filter_ids: optional(commaSeparatedString(peopleSchema.entries.id)),
  filter_name: optional(peopleSchema.entries.name),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
})

export const peopleResponseSchema = object({
  people: array(peopleWithPrefectureSchema),
  ...paginationInfo.entries,
})
