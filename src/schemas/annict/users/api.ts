import { array, integer, maxValue, minValue, number, object, optional, pipe, string } from 'valibot'
import { userSchema } from '.'
import { commaSeparatedString, order, paginationInfo } from '../common'

export const usersQuerySchema = object({
  filter_ids: optional(commaSeparatedString(userSchema.entries.id)),
  filter_usernames: optional(commaSeparatedString(userSchema.entries.username)),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(order),
})

export const usersResponseSchema = object({
  users: array(userSchema),
  ...paginationInfo.entries,
})

export const meResponseSchema = object({
  ...userSchema.entries,
  email: string(),
  notifications_count: pipe(number(), integer(), minValue(0)),
})
