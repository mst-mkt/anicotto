import { BookCopyIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import { MultiTrack, MultiTrackSkeleton } from './_components/multi-track'

type MultiTrackPageProps = {
  params: Promise<{
    workId: string
  }>
}

const MultiTrackPage: FC<MultiTrackPageProps> = async ({ params }) => {
  const { workId } = await params

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2">
        <BookCopyIcon size={24} className="text-anicotto-accent" />
        <span className="font-bold text-lg">複数の記録をする</span>
      </h1>
      <Suspense fallback={<MultiTrackSkeleton />}>
        <MultiTrack workId={workId} />
      </Suspense>
    </div>
  )
}

export default MultiTrackPage
