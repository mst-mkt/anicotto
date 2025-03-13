import { BombIcon, CupSodaIcon, type LucideIcon, MoonStarIcon, SparklesIcon } from 'lucide-react'
import type { Rating } from '../schemas/annict/common'

export const RATING_TEXT = {
  bad: '良くない',
  average: '普通',
  good: '良い',
  great: 'とても良い',
} as const satisfies Record<Rating, string>

export const RATING_ID = {
  BAD: 'bad',
  AVERAGE: 'average',
  GOOD: 'good',
  GREAT: 'great',
} as const satisfies Record<string, Rating>

export const RATING_ICON = {
  bad: BombIcon,
  average: CupSodaIcon,
  good: SparklesIcon,
  great: MoonStarIcon,
} as const satisfies Record<Rating, LucideIcon>
