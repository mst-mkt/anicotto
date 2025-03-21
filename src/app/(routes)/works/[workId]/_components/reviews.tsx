import { HeartIcon, MessageCircleHeartIcon, OrigamiIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { UserHoverCard } from '../../../../../components/hover-card/user/card'
import { Markdown } from '../../../../../components/shared/markdown'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar'
import { Button } from '../../../../../components/ui/button'
import type { Work } from '../../../../../schemas/annict/works'
import { timeText } from '../../../../../utils/time-text'
import { getWorkReviews } from '../../../../actions/api/get/reviews'

type ReviewsProps = {
  workId: Work['id']
}

export const Reviews: FC<ReviewsProps> = async ({ workId }) => {
  const reviews = await getWorkReviews(workId)

  if (reviews === null || reviews.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <OrigamiIcon size={32} className="text-anicotto-accent" />
        <p className="text-muted-foreground">レビューが見当たりません</p>
        <Button asChild={true} size="sm" variant="secondary">
          <Link href={`/works/${workId}/reviews`}>
            <MessageCircleHeartIcon size={24} />
            レビューを書く
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      {reviews.data.map((review) => (
        <div key={review.id} className="flex gap-x-4">
          <UserHoverCard user={review.user}>
            <Link href={`/users/${review.user.username}`} className="sticky top-20 h-fit">
              <Avatar className="h-fit">
                <AvatarImage src={review.user.avatar_url} alt={`${review.user.name}のアバター`} />
                <AvatarFallback>{review.user.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </Link>
          </UserHoverCard>
          <div className="flex w-full flex-col gap-y-2">
            <div className="rounded-lg bg-muted p-3">
              <Markdown>{review.body}</Markdown>
            </div>
            <div className="flex w-full items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-2 text-anicotto-accent">
                <HeartIcon size={20} />
                <span>{review.likes_count}</span>
              </div>
              <time dateTime={review.created_at} className="text-muted-foreground text-sm">
                {timeText(review.created_at)}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
