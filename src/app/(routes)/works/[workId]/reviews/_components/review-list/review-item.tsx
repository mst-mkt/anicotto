import Link from 'next/link'
import type { FC } from 'react'
import { RatingBadge } from '../../../../../../../components/badge/rating'
import { UserHoverCard } from '../../../../../../../components/hover-card/user/card'
import { Markdown } from '../../../../../../../components/shared/markdown'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../../components/ui/avatar'
import type { ReviewWithInfo } from '../../../../../../../schemas/annict/reviews'
import { timeText } from '../../../../../../../utils/time-text'

type ReviewItemProps = {
  review: ReviewWithInfo
}

export const ReviewItem: FC<ReviewItemProps> = ({ review }) => (
  <div className="flex w-full gap-x-4">
    <UserHoverCard user={review.user}>
      <Link className="sticky top-20 h-fit" href={`/users/${review.user.username}`}>
        <Avatar className="h-fit">
          <AvatarImage
            alt={`${review.user.name}のアバター`}
            className="aspect-square"
            src={review.user.avatar_url}
          />
          <AvatarFallback>{review.user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </Link>
    </UserHoverCard>
    <div className="flex w-full min-w-0 flex-col gap-y-4">
      <div className="flex w-full items-center justify-between gap-x-2">
        <UserHoverCard user={review.user}>
          <Link
            className="flex max-w-full gap-x-2 truncate transition-colors hover:text-anicotto-accent"
            href={`/users/${review.user.username}`}
          >
            <span className="shrink truncate font-bold">{review.user.name}</span>
            <span className="text-muted-foreground">@{review.user.username}</span>
          </Link>
        </UserHoverCard>
        <time
          className="hidden shrink text-muted-foreground text-sm md:block"
          dateTime={review.created_at}
        >
          {timeText(review.created_at)}
        </time>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        <Markdown className="break-all">{review.body}</Markdown>
        <div className="flex flex-wrap gap-2">
          {review.rating_overall_state !== null && (
            <RatingBadge
              rating={review.rating_overall_state}
              showIcon={false}
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_animation_state !== null && (
            <RatingBadge
              rating={review.rating_animation_state}
              showIcon={false}
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_character_state !== null && (
            <RatingBadge
              rating={review.rating_character_state}
              showIcon={false}
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_music_state !== null && (
            <RatingBadge
              rating={review.rating_music_state}
              showIcon={false}
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_story_state !== null && (
            <RatingBadge
              rating={review.rating_story_state}
              showIcon={false}
              showRating={true}
              showTitle={true}
            />
          )}
        </div>
      </div>
    </div>
  </div>
)
