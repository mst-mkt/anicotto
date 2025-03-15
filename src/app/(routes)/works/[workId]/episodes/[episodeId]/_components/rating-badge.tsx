import type { FC } from 'react'
import { RatingIcon } from '../../../../../../../components/icon/rating'
import { Badge } from '../../../../../../../components/ui/badge'
import { RATING_ID, RATING_TEXT } from '../../../../../../../constants/rating'
import { cn } from '../../../../../../../utils/classnames'
import type { Episode } from '../get-episode'

type RatingBadgeProps = {
  rating: NonNullable<Episode['records'][number]['ratingState']>
}

export const RatingBadge: FC<RatingBadgeProps> = ({ rating }) => {
  const label = RATING_TEXT[RATING_ID[rating]]

  return (
    <Badge
      variant="secondary"
      className={cn(
        'w-fit cursor-default gap-x-1',
        rating === 'GREAT' &&
          '!border-anicotto-rating-good/12 bg-anicotto-rating-great-pale/10 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/16',
        rating === 'GOOD' &&
          '!border-anicotto-rating-good/12 bg-anicotto-rating-good-pale/10 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/16',
        rating === 'AVERAGE' &&
          '!border-anicotto-rating-average/12 bg-anicotto-rating-average-pale/10 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/16',
        rating === 'BAD' &&
          '!border-anicotto-rating-bad/12 bg-anicotto-rating-bad-pale/10 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/16',
      )}
    >
      <RatingIcon rating={rating} size={16} />
      <span>{label}</span>
    </Badge>
  )
}
