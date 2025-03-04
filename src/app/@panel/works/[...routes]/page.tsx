import type { FC } from 'react'
import { WorkPanel } from './_components/work-panel'

type WorkSidePanelProps = {
  params: Promise<{
    routes: string[]
  }>
}

const WorkSidePanel: FC<WorkSidePanelProps> = async ({ params }) => {
  const {
    routes: [_, workIdString],
  } = await params
  const workId = Number.parseInt(workIdString, 10)

  if (Number.isNaN(workId)) return null

  return <WorkPanel workId={workId} />
}

export default WorkSidePanel
