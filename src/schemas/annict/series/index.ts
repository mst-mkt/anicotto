import { number, object, string } from 'valibot'

export const seriesSchema = object({
  id: number(),
  name: string(),
  name_ro: string(),
  name_en: string(),
})
