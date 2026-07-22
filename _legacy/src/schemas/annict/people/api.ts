import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { personSchema, personWithPrefectureSchema } from '.'

export const getPeopleQuerySchema = object({
  filter_ids: optional(commaSeparatedString(personSchema.entries.id)),
  filter_name: optional(personSchema.entries.name),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getPeopleResponseSchema = object({
  people: array(personWithPrefectureSchema),
  ...paginationInfoSchema.entries,
})
