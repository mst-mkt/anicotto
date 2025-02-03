import { integer, number, object, pipe, string } from 'valibot'

export const staffSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_en: string(),
  role_text: string(),
  role_other: string(),
  role_other_en: string(),
  sort_number: number(),
})
