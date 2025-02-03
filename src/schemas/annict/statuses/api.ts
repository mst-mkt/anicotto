import { object } from 'valibot'
import { status } from '../common'
import { workSchema } from '../works'

export const statusesQuerySchema = object({
  work_id: workSchema.entries.id,
  kind: status,
})
