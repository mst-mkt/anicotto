'use client'

import { Loader2Icon, RotateCwIcon } from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Button } from '../../../../../../../components/ui/button'
import { useInfiniteScroll } from '../../../../../../../hooks/useInfiniteScroll'
import type { ReviewWithInfo } from '../../../../../../../schemas/annict/reviews'
import type { Work } from '../../../../../../../schemas/annict/works'
import { getWorkReviews } from '../../../../../../actions/api/get/reviews'
import { ReviewItem } from './review-item'

type ReviewsScrollerProps = {
  initialReviews: ReviewWithInfo[]
  workId: Work['id']
}

export const ReviewsScroller: FC<ReviewsScrollerProps> = ({ initialReviews, workId }) => {
  const {
    data: reviews,
    status: loadingStatus,
    hasMore,
    retry,
    triggerRef,
  } = useInfiniteScroll({
    initialData: initialReviews,
    fetchData: (page) => getWorkReviews(workId, page),
  })

  return (
    <>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      {match(loadingStatus)
        .with('loading', () => (
          <div className="flex w-full items-center justify-center h-16">
            <Loader2Icon className="animate-spin text-anicotto-accent" size={24} />
          </div>
        ))
        .with('error', () => (
          <div className="flex flex-col gap-y-2 w-full items-center justify-center py-4">
            <p className="text-muted-foreground">レビューの取得に失敗しました</p>
            <Button onClick={retry}>
              <RotateCwIcon />
              リトライ
            </Button>
          </div>
        ))
        .with('success', () => hasMore && <div className="h-16 w-full" ref={triggerRef} />)
        .exhaustive()}
    </>
  )
}
