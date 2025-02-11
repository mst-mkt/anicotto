import type { FC } from 'react'

type WorkReviewsPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkReviewsPage: FC<WorkReviewsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return <></>
}

export default WorkReviewsPage
