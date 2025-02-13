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
import { Badge, type BadgeProps } from '../../../../components/ui/badge'
import type { Rating, Status } from '../../../../schemas/annict/common'
import { cn } from '../../../../utils/classnames'

type RatingBadgeProps = {
  rating: Rating | null
} & BadgeProps

export const RatingBadge: FC<RatingBadgeProps> = ({ rating, ...props }) => {
  return match(rating)
    .with('great', () => (
      <Badge
        {...props}
        className={cn(
          '!border-anicotto-rating-great/16 bg-anicotto-rating-great-pale/16 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/24',
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
          '!border-anicotto-rating-good/16 bg-anicotto-rating-good-pale/16 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/24',
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
          '!border-anicotto-rating-average/16 bg-anicotto-rating-average-pale/16 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/24',
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
          '!border-anicotto-rating-bad/16 bg-anicotto-rating-bad-pale/16 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/24',
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
        className={cn(
          '!border-anicotto-status-watching/16 bg-anicotto-status-watching-pale/16 text-anicotto-status-watching hover:bg-anicotto-status-watching-pale/24',
          props.className,
        )}
      >
        <PlayIcon size={16} />
        見てる
      </Badge>
    ))
    .with('watched', () => (
      <Badge
        {...props}
        className={cn(
          '!border-anicotto-status-watched/16 bg-anicotto-status-watched-pale/16 text-anicotto-status-watched hover:bg-anicotto-status-watched-pale/24',
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
          '!border-anicotto-status-on_hold/16 bg-anicotto-status-on_hold-pale/16 text-anicotto-status-on_hold hover:bg-anicotto-status-on_hold-pale/24',
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
          '!border-anicotto-status-stop_watching/16 bg-anicotto-status-stop_watching-pale/16 text-anicotto-status-stop_watching hover:bg-anicotto-status-stop_watching-pale/24',
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
          '!border-anicotto-status-wanna_watch/16 bg-anicotto-status-wanna_watch-pale/16 text-anicotto-status-wanna_watch hover:bg-anicotto-status-wanna_watch-pale/24',
          props.className,
        )}
      >
        <CircleIcon size={16} />
        見たい
      </Badge>
    ))
    .with('no_select', () => null)
    .exhaustive()
}
