import {
  CheckIcon,
  CircleIcon,
  CircleSlashIcon,
  type LucideIcon,
  PauseIcon,
  PlayIcon,
  SquareIcon,
} from 'lucide-react'
import type { Status } from '../schemas/annict/common'

export const STATUS_TEXT = {
  no_select: '未選択',
  wanna_watch: '見たい',
  watching: '見てる',
  watched: '見た',
  on_hold: '一時中断',
  stop_watching: '視聴中止',
} as const satisfies Record<Status, string>

export const STATUS_ICON = {
  no_select: CircleSlashIcon,
  wanna_watch: CircleIcon,
  watching: PlayIcon,
  watched: CheckIcon,
  on_hold: PauseIcon,
  stop_watching: SquareIcon,
} as const satisfies Record<Status, LucideIcon>
