import { type FC, Suspense } from 'react'
import { Loading } from '../../../../components/shared/loading'
import { PROJECT_NAME } from '../../../../constants/project'
import { Episodes } from './_components/episodes'
import { Reviews } from './_components/reviews'
import { getWork } from './_layouts/get-work'

type WorksPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: WorksPageProps) => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return null
  const work = await getWork(workIdNumber)

  return {
    title: `${work?.title} | ${PROJECT_NAME}`,
    description: `「${work?.title}」の作品ページ`,
  }
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
