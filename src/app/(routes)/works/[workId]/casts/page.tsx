import { type FC, Suspense } from 'react'
import { Casts, CastsSkeleton } from './casts'

type WorkCastsPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkCastsPage: FC<WorkCastsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <Suspense fallback={<CastsSkeleton />}>
      <Casts workId={workId} />
    </Suspense>
  )
}

export default WorkCastsPage
