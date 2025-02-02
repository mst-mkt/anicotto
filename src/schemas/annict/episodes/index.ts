import { minValue, number, object, pipe, string } from 'valibot'

export const episodeSchema = object({
  id: number(),
  number: number(),
  number_text: string(),
  sort_number: number(),
  title: string(),
  records_count: pipe(number(), minValue(0)),
  record_comments_count: pipe(number(), minValue(0)),
})
