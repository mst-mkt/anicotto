import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../_layouts/get-work'
import { StaffTable, StaffTableSkeleton } from './_components/staff-table'

type WorkStaffsPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkStaffsPageProps) => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return null
  const work = await getWork(workIdNumber)

  return {
    title: `${work?.title} - スタッフ | ${PROJECT_NAME}`,
    description: `「${work?.title}」のスタッフ一覧`,
  }
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
