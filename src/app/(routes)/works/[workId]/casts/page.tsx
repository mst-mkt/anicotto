import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../_layouts/get-work'
import { Casts, CastsSkeleton } from './_components/cast-table'

type WorkCastsPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkCastsPageProps) => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return null
  const works = await getWork(workIdNumber)

  return {
    title: `${works?.title} - キャスト | ${PROJECT_NAME}`,
    description: `「${works?.title}」のキャスト一覧`,
  }
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
