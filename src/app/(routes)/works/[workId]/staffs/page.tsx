import { type FC, Suspense } from 'react'
import { StaffTable, StaffTableSkeleton } from './_components/staff-table'

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
    <Suspense fallback={<StaffTableSkeleton />}>
      <StaffTable workId={workId} />
    </Suspense>
  )
}

export default WorkStaffsPage
