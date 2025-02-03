import { boolean, number, object, string } from 'valibot'
import { channelSchema } from '../common'
import { episodeSchema } from '../episodes'
import { workSchema } from '../works'

export const programSchema = object({
  id: number(),
  started_at: string(),
  is_rebroadcast: boolean(),
  channel: channelSchema,
  work: workSchema,
  episode: episodeSchema,
})
