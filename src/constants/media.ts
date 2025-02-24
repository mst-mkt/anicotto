export const MEDIA_TEXT = {
  TV: 'TV',
  OVA: 'OVA',
  MOVIE: '映画',
  WEB: 'Web',
  OTHER: 'その他',
} as const satisfies Record<string, string>

export const MEDIA_KEY = {
  TV: 'tv',
  OVA: 'ova',
  MOVIE: 'movie',
  WEB: 'web',
  OTHER: 'other',
} as const satisfies Record<string, string>
