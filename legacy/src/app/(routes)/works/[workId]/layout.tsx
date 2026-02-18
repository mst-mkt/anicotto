import { type FC, Suspense } from 'react'
import { Tab } from './_layouts/tabs'
import { WorkInfo, WorkInfoSkeleton } from './_layouts/work-info'

const WorksLayout: FC<LayoutProps<'/works/[workId]'>> = async ({ children, params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <div className="flex flex-col gap-y-8">
      <Suspense fallback={<WorkInfoSkeleton />}>
        <WorkInfo workId={workId} />
      </Suspense>
      <Tab workId={workId} />
      <div className="pt-4">{children}</div>
    </div>
  )
}

export default WorksLayout
