import { type FC, Suspense } from 'react'
import { Staffs, StaffsSkeleton } from './staffs'

type WorkStaffsPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkStaffsPage: FC<WorkStaffsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <Suspense fallback={<StaffsSkeleton />}>
      <Staffs workId={workId} />
    </Suspense>
  )
}

export default WorkStaffsPage
