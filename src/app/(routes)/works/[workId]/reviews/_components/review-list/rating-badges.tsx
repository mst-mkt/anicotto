import type { FC } from 'react'
import { Badge } from '../../../../../../../components/ui/badge'
import { RATING_TEXT } from '../../../../../../../constants/rating'
import type { Rating } from '../../../../../../../schemas/annict/common'
import type { ReviewWithInfo } from '../../../../../../../schemas/annict/reviews'
import { cn } from '../../../../../../../utils/classnames'

type RatingBadgesProps = {
  review: ReviewWithInfo
}

export const RatingBadges: FC<RatingBadgesProps> = ({ review }) => {
  const ratings = [
    review.rating_overall_state,
    review.rating_character_state,
    review.rating_story_state,
    review.rating_animation_state,
    review.rating_music_state,
  ]

  if (ratings.every((rating) => rating === null)) return null

  return (
    <div className="flex flex-wrap gap-2">
      <RatingBadge title="全体" rating={review.rating_overall_state} />
      <RatingBadge title="キャラ" rating={review.rating_character_state} />
      <RatingBadge title="ストーリー" rating={review.rating_story_state} />
      <RatingBadge title="映像" rating={review.rating_animation_state} />
      <RatingBadge title="音楽" rating={review.rating_music_state} />
    </div>
  )
}

type RatingBadgeProps = {
  title: string
  rating: Rating | null
}

const RatingBadge: FC<RatingBadgeProps> = ({ title, rating }) =>
  rating === null ? null : (
    <Badge
      variant="secondary"
      className={cn(
        'cursor-default gap-x-1',
        rating === 'great' &&
          '!border-anicotto-rating-good/12 bg-anicotto-rating-great-pale/10 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/16',
        rating === 'good' &&
          '!border-anicotto-rating-good/12 bg-anicotto-rating-good-pale/10 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/16',
        rating === 'average' &&
          '!border-anicotto-rating-average/12 bg-anicotto-rating-average-pale/10 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/16',
        rating === 'bad' &&
          '!border-anicotto-rating-bad/12 bg-anicotto-rating-bad-pale/10 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/16',
      )}
    >
      <span className="font-normal opacity-70">{title}</span>
      <span>{RATING_TEXT[rating]}</span>
    </Badge>
  )
