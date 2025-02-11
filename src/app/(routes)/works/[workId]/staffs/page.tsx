import type { FC } from 'react'

type WorkStaffsPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkStaffsPage: FC<WorkStaffsPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return <></>
}

export default WorkStaffsPage
