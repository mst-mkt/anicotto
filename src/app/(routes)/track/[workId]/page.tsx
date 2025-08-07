import { BookCopyIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import { BASIC_METADATA, PROJECT_NAME } from '../../../../constants/project'
import { getWork } from '../../../actions/api/get/works'
import { MultiTrack, MultiTrackSkeleton } from './_components/multi-track'

type MultiTrackPageProps = {
  params: Promise<{
    workId: string
  }>
}

export const generateMetadata = async ({ params }: MultiTrackPageProps) => {
  const { workId } = await params
  const workIdNumber = Number.parseInt(workId, 10)
  if (Number.isNaN(workIdNumber)) return BASIC_METADATA
  const work = await getWork(workIdNumber)

  return {
    title: `${work?.title} - 記録 | ${PROJECT_NAME}`,
    description: `「${work?.title}」のエピソードに対する記録を行います`,
  }
}

const MultiTrackPage: FC<MultiTrackPageProps> = async ({ params }) => {
  const { workId } = await params

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2">
        <BookCopyIcon className="text-anicotto-accent" size={24} />
        <span className="font-bold text-lg">複数の記録をする</span>
      </h1>
      <Suspense fallback={<MultiTrackSkeleton />}>
        <MultiTrack workId={workId} />
      </Suspense>
    </div>
  )
}

export default MultiTrackPage
