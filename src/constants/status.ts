import type { Status } from '../schemas/annict/common'

export const STATUS_TEXT = {
  no_select: '未選択',
  wanna_watch: '見たい',
  watching: '見てる',
  watched: '見た',
  on_hold: '一時中断',
  stop_watching: '視聴中止',
} as const satisfies Record<Status, string>
