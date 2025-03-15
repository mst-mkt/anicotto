import type { FC } from 'react'
import { match } from 'ts-pattern'
import { RatingIcon } from '../../../../../../../components/icon/rating'
import { Badge, type BadgeProps } from '../../../../../../../components/ui/badge'
import { RATING_TEXT } from '../../../../../../../constants/rating'
import type { Rating } from '../../../../../../../schemas/annict/common'
import type { introspection_types } from '../../../../../../../types/graphql-env.d'
import { cn } from '../../../../../../../utils/classnames'

type RatingBadgeProps = {
  rating: introspection_types['RatingState']['enumValues']
} & BadgeProps

const convertRating = (rating: introspection_types['RatingState']['enumValues']): Rating => {
  return match(rating)
    .with('GREAT', () => 'great' as const)
    .with('GOOD', () => 'good' as const)
    .with('AVERAGE', () => 'average' as const)
    .with('BAD', () => 'bad' as const)
    .exhaustive()
}

export const RatingBadge: FC<RatingBadgeProps> = ({ rating, ...props }) => {
  const ratingValue = convertRating(rating)
  const text = RATING_TEXT[ratingValue]

  return (
    <Badge
      {...props}
      className={cn(
        ratingValue === 'great' &&
          '!border-anicotto-rating-great/16 bg-anicotto-rating-great-pale/16 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/24',
        ratingValue === 'good' &&
          '!border-anicotto-rating-good/16 bg-anicotto-rating-good-pale/16 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/24',
        ratingValue === 'average' &&
          '!border-anicotto-rating-average/16 bg-anicotto-rating-average-pale/16 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/24',
        ratingValue === 'bad' &&
          '!border-anicotto-rating-bad/16 bg-anicotto-rating-bad-pale/16 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/24',
        props.className,
      )}
    >
      <RatingIcon rating={rating} size={16} />
      {text}
    </Badge>
  )
}
