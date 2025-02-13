import { type FC, Suspense } from 'react'
import { Loading } from '../../../../components/shared/loading'
import { Episodes } from './_components/episodes'
import { Reviews } from './_components/reviews'

type WorksPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorksPage: FC<WorksPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <div className="flex flex-col gap-y-16">
      <Suspense fallback={<Loading />}>
        <Episodes workId={workId} />
        <Reviews workId={workId} />
      </Suspense>
    </div>
  )
}

export default WorksPage
