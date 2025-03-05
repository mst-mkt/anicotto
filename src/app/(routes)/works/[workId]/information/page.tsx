import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../constants/project'
import { InformationTable, InformationTableSkeleton } from './_components/information-table'
import { getWork } from './get-work'

type WorkInformationPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkInformationPageProps) => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return BASIC_METADATA
  const work = await getWork(workIdNumber)

  return {
    title: `${work?.title} - 作品情報 | ${PROJECT_NAME}`,
    description: `「${work?.title}」の作品情報`,
  }
}

const WorkInformationPage: FC<WorkInformationPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <Suspense fallback={<InformationTableSkeleton />}>
      <InformationTable workId={workId} />
    </Suspense>
  )
}

export default WorkInformationPage
