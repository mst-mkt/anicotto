import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../../../../actions/api/get/works'
import { StaffTable, StaffTableSkeleton } from './_components/staff-table'

type WorkStaffsPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkStaffsPageProps): Promise<Metadata> => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return BASIC_METADATA
  const work = await getWork(workIdNumber)
  if (work === null) return BASIC_METADATA

  return {
    title: `${work.title} - スタッフ | ${PROJECT_NAME}`,
    description: `「${work.title}」のスタッフ一覧`,
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
