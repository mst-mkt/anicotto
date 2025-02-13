import { type FC, Suspense } from 'react'
import {} from '../../../../../components/ui/table'
import { InformationTable, InformationTableSkeleton } from './_components/information-table'

type WorkInformationPageProps = {
  params: Promise<{
    workId: string
  }>
}

const WorkInformationPage: FC<WorkInformationPageProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString, 10)
  if (Number.isNaN(workId)) return null

  return (
    <Suspense fallback={<InformationTableSkeleton />}>
      <InformationTable workId={workId} />
    </Suspense>
  )
}

export default WorkInformationPage
