import type { FC } from 'react'
import { RatingIcon } from '../../../../components/icon/rating'
import { StatusIcon } from '../../../../components/icon/status'
import { Badge, type BadgeProps } from '../../../../components/ui/badge'
import { RATING_TEXT } from '../../../../constants/rating'
import { STATUS_TEXT } from '../../../../constants/status'
import type { Rating, Status } from '../../../../schemas/annict/common'
import { cn } from '../../../../utils/classnames'

type RatingBadgeProps = {
  rating: Rating | null
} & BadgeProps

export const RatingBadge: FC<RatingBadgeProps> = ({ rating, ...props }) => {
  if (rating === null) {
    return (
      <Badge {...props} variant="outline">
        評価無し
      </Badge>
    )
  }

  const text = RATING_TEXT[rating]

  return (
    <Badge
      {...props}
      className={cn(
        rating === 'great' &&
          '!border-anicotto-rating-great/16 bg-anicotto-rating-great-pale/16 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/24',
        rating === 'good' &&
          '!border-anicotto-rating-good/16 bg-anicotto-rating-good-pale/16 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/24',
        rating === 'average' &&
          '!border-anicotto-rating-average/16 bg-anicotto-rating-average-pale/16 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/24',
        rating === 'bad' &&
          '!border-anicotto-rating-bad/16 bg-anicotto-rating-bad-pale/16 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/24',
        props.className,
      )}
    >
      <RatingIcon rating={rating} size={16} />
      {text}
    </Badge>
  )
}

type StatusBadgeProps = {
  status: Status
} & BadgeProps

export const StatusBadge: FC<StatusBadgeProps> = ({ status, ...props }) => {
  const text = STATUS_TEXT[status]

  return (
    <Badge
      {...props}
      className={cn(
        status === 'watching' &&
          '!border-anicotto-status-watching/16 bg-anicotto-status-watching-pale/16 text-anicotto-status-watching hover:bg-anicotto-status-watching-pale/24',
        status === 'watched' &&
          '!border-anicotto-status-watched/16 bg-anicotto-status-watched-pale/16 text-anicotto-status-watched hover:bg-anicotto-status-watched-pale/24',
        status === 'on_hold' &&
          '!border-anicotto-status-on_hold/16 bg-anicotto-status-on_hold-pale/16 text-anicotto-status-on_hold hover:bg-anicotto-status-on_hold-pale/24',
        status === 'stop_watching' &&
          '!border-anicotto-status-stop_watching/16 bg-anicotto-status-stop_watching-pale/16 text-anicotto-status-stop_watching hover:bg-anicotto-status-stop_watching-pale/24',
        status === 'wanna_watch' &&
          '!border-anicotto-status-wanna_watch/16 bg-anicotto-status-wanna_watch-pale/16 text-anicotto-status-wanna_watch hover:bg-anicotto-status-wanna_watch-pale/24',
        props.className,
      )}
    >
      <StatusIcon status={status} size={16} />
      {text}
    </Badge>
  )
}
