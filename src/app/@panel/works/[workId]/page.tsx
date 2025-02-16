import type { FC } from 'react'

type WorkSidePanelProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkSidePanel: FC<WorkSidePanelProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)

  if (Number.isNaN(workId)) return null

  return <>{/* 作品 (workId) に関する情報を置く */}</>
}

export default WorkSidePanel
