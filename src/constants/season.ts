import type { introspection_types } from '../types/graphql-env'

export const SEASON_TEXT = {
  SPRING: '春',
  SUMMER: '夏',
  AUTUMN: '秋',
  WINTER: '冬',
} as const satisfies Record<introspection_types['SeasonName']['enumValues'], string>
