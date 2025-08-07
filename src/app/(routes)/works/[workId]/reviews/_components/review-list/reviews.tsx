import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import type { Work } from '../../../../../../../schemas/annict/works'
import { getWorkReviews } from '../../../../../../actions/api/get/reviews'
import { ReviewItem } from './review-item'

type ReviewsProps = {
  workId: Work['id']
}

export const Reviews: FC<ReviewsProps> = async ({ workId }) => {
  const reviews = await getWorkReviews(workId)

  if (reviews === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>レビューの取得に失敗しました</p>
      </div>
    )
  }

  if (reviews.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <p>レビューが見当たりません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-12">
      {reviews.data.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

export const ReviewsSkeleton = () => (
  <div className="flex flex-col gap-y-12">
    {[...Array(3)].map((_, index) => (
      <div className="flex gap-x-4" key={`skeleton-${index}`}>
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
              <Skeleton className="h-[1lh] w-full text-sm" key={`skeleton-${index}-${line}`} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)
