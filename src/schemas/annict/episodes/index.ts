import { minValue, nullable, number, object, pipe, string } from 'valibot'

export const episodeSchema = object({
  id: number(),
  number: nullable(number()),
  number_text: string(),
  sort_number: number(),
  title: nullable(string()),
  records_count: pipe(number(), minValue(0)),
  record_comments_count: pipe(number(), minValue(0)),
})
