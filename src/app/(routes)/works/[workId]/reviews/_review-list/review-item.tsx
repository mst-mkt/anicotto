import Link from 'next/link'
import type { FC } from 'react'
import Markdown from 'react-markdown'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../components/ui/avatar'
import type { ReviewWithInfo } from '../../../../../../schemas/annict/reviews'
import { timeText } from '../../../../../../utils/time-text'
import { RatingBadges } from './rating-badges'

type ReviewItemProps = {
  review: ReviewWithInfo
}

export const ReviewItem: FC<ReviewItemProps> = ({ review }) => (
  <div className="flex w-full gap-x-4">
    <Avatar className="sticky top-20 h-fit">
      <AvatarImage
        src={review.user.avatar_url}
        alt={`${review.user.name}のアバター`}
        className="aspect-square"
      />
      <AvatarFallback>{review.user.name.slice(0, 1)}</AvatarFallback>
    </Avatar>
    <div className="flex w-full min-w-0 flex-col gap-y-4">
      <div className="flex w-full items-center justify-between gap-x-2">
        <Link
          href={`/users/${review.user.username}`}
          className="flex max-w-full gap-x-2 truncate transition-colors hover:text-anicotto-accent"
        >
          <span className="shrink truncate font-bold">{review.user.name}</span>
          <span className="text-muted-foreground">@{review.user.username}</span>
        </Link>
        <time
          dateTime={review.created_at}
          className="hidden shrink text-muted-foreground text-sm md:block"
        >
          {timeText(review.created_at)}
        </time>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        <Markdown className="break-all">{review.body}</Markdown>
        <RatingBadges review={review} />
      </div>
    </div>
  </div>
)
