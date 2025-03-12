import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../_layouts/get-work'
import { ReviewForm } from './_components/form/review-form'
import { Reviews, ReviewsSkeleton } from './_components/review-list/reviews'

type WorkReviewsPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkReviewsPageProps) => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return BASIC_METADATA
  const work = await getWork(workIdNumber)

  return {
    title: `${work?.title} - レビュー | ${PROJECT_NAME}`,
    description: `「${work?.title}」のレビュー一覧ページ`,
  }
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
