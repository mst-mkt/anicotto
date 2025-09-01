import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { Loading } from '../../../../../components/shared/loading'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../../constants/project'
import { getWork } from '../../../../actions/api/get/works'
import { SeriesCarousels } from './_components/series-carousel'

type WorkSeriesPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorkSeriesPageProps): Promise<Metadata> => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return BASIC_METADATA

  const work = await getWork(workIdNumber)
  if (work === null) return BASIC_METADATA

  return {
    title: `${work.title} - 関連作品 | ${PROJECT_NAME}`,
    description: `「${work.title}」の関連作品一覧`,
  }
}

const WorkSeriesPage: FC<WorkSeriesPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)

  if (Number.isNaN(workId)) return null

  return (
    <div className="flex flex-col gap-y-8">
      <Suspense fallback={<Loading />}>
        <SeriesCarousels workId={workId} />
      </Suspense>
    </div>
  )
}

export default WorkSeriesPage
