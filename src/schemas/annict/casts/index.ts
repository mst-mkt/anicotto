import { number, object, string } from 'valibot'
import { characterSchema } from '../characters'
import { personSchema } from '../people'
import { workSchema } from '../works'

export const castSchema = object({
  id: number(),
  name: string(),
  name_en: string(),
  sort_number: number(),
  work: workSchema,
  character: characterSchema,
  person: personSchema,
})
