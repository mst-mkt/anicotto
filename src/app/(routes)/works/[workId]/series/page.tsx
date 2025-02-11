import { type FC, Suspense } from 'react'
import { Loading } from '../../../../../components/shared/loading'
import { SeriesCarousels } from './_carousel/series-carousel'

type SeriesPageProps = {
  params: Promise<{
    workId: string
  }>
}

const SeriesPage: FC<SeriesPageProps> = async ({ params }) => {
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

export default SeriesPage
