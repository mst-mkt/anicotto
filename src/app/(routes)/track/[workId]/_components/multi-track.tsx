import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { FC } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../../../../../components/ui/alert'
import { Skeleton } from '../../../../../components/ui/skeleton'
import { getMyLibrariesWithEpisodes } from '../../../../actions/api/get/libraries'
import { TrackForm } from './track-form'
import { WorkSelect } from './work-select'

type MultiTrackProps = {
  workId: string
}

export const MultiTrack: FC<MultiTrackProps> = async ({ workId }) => {
  const libraries = await getMyLibrariesWithEpisodes('watching')

  const currentLibrary = libraries?.find((lib) => `${lib.work.id}` === workId)
  const currentEpisodes = currentLibrary?.work.episodes.filter(
    ({ viewerDidTrack }) => !viewerDidTrack,
  )

  const unavailable = currentEpisodes === undefined || currentEpisodes.length === 0

  if (unavailable) {
    const trackableLibrary = libraries?.find(
      (lib) => lib.work.episodes.filter(({ viewerDidTrack }) => !viewerDidTrack).length > 0,
    )
    const trackableWorkId = trackableLibrary?.work.id

    if (trackableWorkId === undefined) {
      return <p>エピソードが見つかりませんでした</p>
    }

    redirect(`/track/${trackableWorkId}`)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <WorkSelect selected={workId} libraries={libraries} />
      {currentEpisodes.length > 32 && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>大量のエピソードを記録する場合</AlertTitle>
          <AlertDescription className="text-muted-foreground text-xs md:text-sm">
            AnnictのAPI側の制限によって、一度に記録できるエピソード数には制限があります。
            <br />
            エラーが発生した場合は、選択する量を減らして再度お試しください。
          </AlertDescription>
        </Alert>
      )}
      <TrackForm episodes={currentEpisodes} />
    </div>
  )
}

export const MultiTrackSkeleton = () => (
  <div className="flex flex-col gap-y-4">
    <div className="flex gap-x-4 rounded-lg border border-muted p-2">
      <Skeleton className="h-16 w-16 shrink-0" />
      <div className="flex w-full shrink flex-col justify-center gap-y-2">
        <Skeleton className="h-[1lh] w-3/4" />
        <Skeleton className="h-[1lh] w-1/2 text-sm" />
      </div>
    </div>
    <Skeleton className="h-[1lh] w-full" />
    <div className="flex flex-col gap-y-2 rounded-lg border border-muted p-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-[1lh] w-full" />
      ))}
    </div>
  </div>
)
