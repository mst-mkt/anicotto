import type { FC } from 'react'

type WorkCastsPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkCastsPage: FC<WorkCastsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return <></>
}

export default WorkCastsPage
