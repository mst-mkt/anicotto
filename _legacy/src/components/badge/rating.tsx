import type { FC } from 'react'
import { RATING_KIND_TEXT, RATING_TEXT } from '../../constants/text/rating'
import type { Rating } from '../../schemas/annict/common'
import type { introspection_types } from '../../types/graphql-env'
import { cn } from '../../utils/classnames'
import { RatingIcon } from '../icon/rating'
import { Badge, type BadgeProps } from '../ui/badge'

type RatingBadgeProps = {
  kind?: 'overall' | 'character' | 'story' | 'animation' | 'music'
  rating: Rating | introspection_types['RatingState']['enumValues'] | null
  showIcon?: boolean
  showRating?: boolean
  showTitle?: boolean
} & BadgeProps

export const RatingBadge: FC<RatingBadgeProps> = ({
  kind = 'overall',
  rating,
  showIcon = true,
  showRating = true,
  showTitle = false,
  ...props
}) =>
  rating === null ? null : (
    <Badge
      variant="secondary"
      {...props}
      className={cn(
        'w-fit shrink-0 grow-0 cursor-default gap-x-1 break-keep px-2 py-1',
        rating.toLowerCase() === 'great' &&
          '!border-anicotto-rating-good/12 bg-anicotto-rating-great-pale/10 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/16',
        rating.toLowerCase() === 'good' &&
          '!border-anicotto-rating-good/12 bg-anicotto-rating-good-pale/10 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/16',
        rating.toLowerCase() === 'average' &&
          '!border-anicotto-rating-average/12 bg-anicotto-rating-average-pale/10 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/16',
        rating.toLowerCase() === 'bad' &&
          '!border-anicotto-rating-bad/12 bg-anicotto-rating-bad-pale/10 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/16',
      )}
    >
      {showIcon && <RatingIcon rating={rating} size={16} />}
      {showTitle && <span className="font-normal opacity-75">{RATING_KIND_TEXT(kind)}</span>}
      {showRating && <span>{RATING_TEXT(rating)}</span>}
    </Badge>
  )
