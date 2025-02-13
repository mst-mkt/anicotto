import { type FC, Suspense } from 'react'
import { Loading } from '../../../../../components/shared/loading'
import { SeriesCarousels } from './_components/series-carousel'

type WorkSeriesPageProps = {
  params: Promise<{
    workId: string
  }>
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
