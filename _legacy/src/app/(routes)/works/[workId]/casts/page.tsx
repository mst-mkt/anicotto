import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../../../../actions/api/get/works'
import { Casts, CastsSkeleton } from './_components/cast-table'

export const generateMetadata = async ({
  params,
}: PageProps<'/works/[workId]/casts'>): Promise<Metadata> => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return BASIC_METADATA
  const works = await getWork(workIdNumber)

  return {
    title: `${works?.title} - キャスト | ${PROJECT_NAME}`,
    description: `「${works?.title}」のキャスト一覧`,
  }
}

const WorkCastsPage: FC<PageProps<'/works/[workId]/casts'>> = async ({ params }) => {
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
