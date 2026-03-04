import * as v from 'valibot'

export const MediaSchema = v.picklist(['tv', 'ova', 'movie', 'web', 'other'])
export type Media = v.InferOutput<typeof MediaSchema>
