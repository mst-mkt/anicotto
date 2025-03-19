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

export const RATING_KIND_TEXT = {
  overall: '全体',
  character: 'キャラクター',
  story: 'ストーリー',
  animation: '映像',
  music: '音楽',
} as const
