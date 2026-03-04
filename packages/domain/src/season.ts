import * as v from 'valibot'

export const SeasonNameSchema = v.picklist(['winter', 'spring', 'summer', 'autumn'])
export type SeasonName = v.InferOutput<typeof SeasonNameSchema>

export const SeasonNameWithAllSchema = v.picklist([...SeasonNameSchema.options, 'all'])
export type SeasonNameWithAll = v.InferOutput<typeof SeasonNameWithAllSchema>

export const SeasonSchema = v.object({
  year: v.pipe(v.number(), v.integer(), v.minValue(1900), v.maxValue(2200)),
  name: SeasonNameWithAllSchema,
})
export type Season = v.InferOutput<typeof SeasonSchema>

export const parseSeason = (value: string | undefined | null): Season | null => {
  if (value === null || value === undefined || value.trim() === '') return null

  const [yearStr, nameStr] = value.split('-')
  const year = Number.parseInt(yearStr ?? '', 10)
  if (Number.isNaN(year)) return null

  const parsed = v.safeParse(SeasonNameWithAllSchema, nameStr)
  return { year, name: parsed.success ? parsed.output : 'all' }
}

export const stringifySeason = (season: Season) => `${season.year}-${season.name}`

export const getCurrentSeason = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  const seasonOrder = Math.floor((month - 1) / 3)
  const name = SeasonNameSchema.options.at(seasonOrder) ?? 'winter'

  return { year, name }
}
