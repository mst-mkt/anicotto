import { type FC, type ReactNode, Suspense } from 'react'
import { getWorkStatus } from './_layouts/get-status'
import { getWork } from './_layouts/get-work'
import { Tab } from './_layouts/tabs'
import { WorkInfo, WorkInfoSkeleton } from './_layouts/work-info'

type WorksLayoutProps = {
  children: ReactNode
  params: Promise<{
    workId: string
  }>
}

const WorksLayout: FC<WorksLayoutProps> = async ({ children, params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  const work = await getWork(workId)
  if (work === null) return null

  const status = await getWorkStatus(workId)

  return (
    <div className="flex flex-col gap-y-8">
      <Suspense fallback={<WorkInfoSkeleton />}>
        <WorkInfo work={work} status={status} />
      </Suspense>
      <Tab workId={workId} />
      <div className="pt-8">{children}</div>
    </div>
  )
}

export default WorksLayout
