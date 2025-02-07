import {
  BirdIcon,
  BombIcon,
  CheckIcon,
  CircleIcon,
  CupSodaIcon,
  MoonStarIcon,
  PauseIcon,
  PlayIcon,
  SparklesIcon,
  SquareIcon,
} from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Badge, type BadgeProps } from '../../../components/ui/badge'
import type { Rating, Status } from '../../../schemas/annict/common'
import { cn } from '../../../utils/classnames'

type RatingBadgeProps = {
  rating: Rating | null
} & BadgeProps

export const RatingBadge: FC<RatingBadgeProps> = ({ rating, ...props }) => {
  return match(rating)
    .with('great', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-amber-600 px-2 py-1 text-white hover:bg-amber-700',
          props.className,
        )}
      >
        <MoonStarIcon size={16} />
        とても良い
      </Badge>
    ))
    .with('good', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-700',
          props.className,
        )}
      >
        <SparklesIcon size={16} />
        良い
      </Badge>
    ))
    .with('average', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-cyan-600 px-2 py-1 text-white hover:bg-cyan-700',
          props.className,
        )}
      >
        <CupSodaIcon size={16} />
        普通
      </Badge>
    ))
    .with('bad', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-rose-700 px-2 py-1 text-white hover:bg-rose-800',
          props.className,
        )}
      >
        <BombIcon size={16} />
        悪い
      </Badge>
    ))
    .with(null, () => (
      <Badge variant="outline" {...props} className={cn('gap-x-1 px-2 py-1', props.className)}>
        <BirdIcon size={16} />
        評価なし
      </Badge>
    ))
    .exhaustive()
}

type StatusBadgeProps = {
  status: Status
} & BadgeProps

export const StatusBadge: FC<StatusBadgeProps> = ({ status, ...props }) => {
  return match(status)
    .with('watching', () => (
      <Badge
        {...props}
        className={cn('gap-x-1 bg-sky-600 px-2 py-1 text-white hover:bg-sky-700', props.className)}
      >
        <PlayIcon size={16} />
        見てる
      </Badge>
    ))
    .with('watched', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-700',
          props.className,
        )}
      >
        <CheckIcon size={16} />
        見た
      </Badge>
    ))
    .with('on_hold', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-rose-700 px-2 py-1 text-white hover:bg-rose-800',
          props.className,
        )}
      >
        <PauseIcon size={16} />
        一時中断
      </Badge>
    ))
    .with('stop_watching', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-stone-500 px-2 py-1 text-white hover:bg-stone-600',
          props.className,
        )}
      >
        <SquareIcon size={16} />
        中断
      </Badge>
    ))
    .with('wanna_watch', () => (
      <Badge
        {...props}
        className={cn(
          'gap-x-1 bg-orange-600 px-2 py-1 text-white hover:bg-orange-700',
          props.className,
        )}
      >
        <CircleIcon size={16} />
        見たい
      </Badge>
    ))
    .exhaustive()
}
