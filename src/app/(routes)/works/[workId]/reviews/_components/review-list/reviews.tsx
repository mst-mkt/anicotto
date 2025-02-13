import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import type { Work } from '../../../../../../../schemas/annict/works'
import { getReviews } from '../../get-reviws'
import { ReviewItem } from './review-item'

type ReviewsProps = {
  workId: Work['id']
}

export const Reviews: FC<ReviewsProps> = async ({ workId }) => {
  const reviews = await getReviews(workId)

  if (reviews === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>レビューの取得に失敗しました</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>レビューが見当たりません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-12">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

export const ReviewsSkeleton = () => (
  <div className="flex flex-col gap-y-12">
    {[...Array(3)].map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static array
      <div key={`skeleton-${index}`} className="flex gap-x-4">
        <div className="sticky top-20">
          <Skeleton className="aspect-square h-10 w-10 rounded-full" />
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full items-center justify-between gap-x-2">
            <Skeleton className="h-[1lh] w-20" />
            <Skeleton className="hidden h-[1lh] w-16 text-sm md:block" />
          </div>
          <div className="flex w-full flex-col gap-y-2">
            {[...Array(5)].map((_, line) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static array
              <Skeleton key={`skeleton-${index}-${line}`} className="h-[1lh] w-full text-sm" />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)
