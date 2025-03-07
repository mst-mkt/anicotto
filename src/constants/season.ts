import type { introspection_types } from '../types/graphql-env'

export const SEASONS = ['spring', 'summer', 'autumn', 'winter', 'all'] as const
export type Season = (typeof SEASONS)[number]
export const isSeason = (value: unknown): value is Season => SEASONS.includes(value as Season)

export const SEASON_TEXT = {
  SPRING: '春',
  SUMMER: '夏',
  AUTUMN: '秋',
  WINTER: '冬',
} as const satisfies Record<introspection_types['SeasonName']['enumValues'], string>
