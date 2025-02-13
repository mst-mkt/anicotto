import { type FC, Suspense } from 'react'
import { Reviews } from '../_components/reviews'
import { ReviewForm } from './_components/form/review-form'
import { ReviewsSkeleton } from './_components/review-list/reviews'

type WorkReviewsPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkReviewsPage: FC<WorkReviewsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <div className="flex flex-col gap-y-16">
      <ReviewForm workId={workId} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews workId={workId} />
      </Suspense>
    </div>
  )
}

export default WorkReviewsPage
