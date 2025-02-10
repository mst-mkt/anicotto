import type { FC, ReactNode } from 'react'
import { Tab } from './_layouts/tabs'
import { WorkInfo } from './_layouts/work-info/work-info'
import { getWork, getWorkStatus } from './get-work'

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
      <WorkInfo work={work} status={status} />
      <Tab workId={workId} />
      <div>{children}</div>
    </div>
  )
}

export default WorksLayout
