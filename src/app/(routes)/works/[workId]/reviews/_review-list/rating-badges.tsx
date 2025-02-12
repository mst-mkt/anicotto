import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Badge } from '../../../../../../components/ui/badge'
import type { Rating } from '../../../../../../schemas/annict/common'
import type { ReviewWithInfo } from '../../../../../../schemas/annict/reviews'
import { cn } from '../../../../../../utils/classnames'

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
        'gap-x-1',
        rating === 'great' && '!border-amber-500/12 bg-amber-500/10 text-amber-600',
        rating === 'good' && '!border-emerald-500/12 bg-emerald-500/10 text-emerald-600',
        rating === 'average' && '!border-cyan-500/12 bg-cyan-500/10 text-cyan-600',
        rating === 'bad' && '!border-rose-500/12 bg-rose-500/10 text-rose-600',
      )}
    >
      <span className="font-normal opacity-70">{title}</span>
      <span>
        {match(rating)
          .with('great', () => 'とても良い')
          .with('good', () => '良い')
          .with('average', () => '普通')
          .with('bad', () => '良くない')
          .exhaustive()}
      </span>
    </Badge>
  )
