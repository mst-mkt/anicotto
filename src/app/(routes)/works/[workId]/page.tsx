import { type FC, Suspense } from 'react'
import { Loading } from '../../../../components/shared/loading'
import { Episodes } from './_contents/episodes'
import { Reviews } from './_contents/reviews'
import { getWork } from './get-work'

type WorksPageProps = {
  params: Promise<{
    workId: string
  }>
}

const Works: FC<WorksPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  const work = await getWork(workId)
  if (work === null) return null

  return (
    <div className="flex flex-col gap-y-16">
      <Suspense fallback={<Loading />}>
        <Episodes workId={work.id} />
        <Reviews workId={work.id} />
      </Suspense>
    </div>
  )
}

export default Works
