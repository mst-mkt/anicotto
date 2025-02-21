import { TriangleAlertIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { FC } from 'react'
import { Skeleton } from '../../../../components/ui/skeleton'
import { getLibraries } from '../get-libraries'
import { WorkSelect as WorkSelectContent } from './work-select'

type WorkSelectProps = {
  selectedEpisode: number | null
}

export const WorkSelect: FC<WorkSelectProps> = async ({ selectedEpisode }) => {
  const libraries = await getLibraries()

  if (libraries === null) {
    return (
      <div className="flex items-center justify-center gap-x-2 rounded-md border border-muted p-6">
        <TriangleAlertIcon size={24} className="text-anicotto-accent" />
        <p>エピソード情報の取得に失敗しました</p>
      </div>
    )
  }

  if (libraries.filter((lib) => lib.nextEpisode !== null).length === 0) {
    return (
      <div className="flex items-center justify-center gap-x-2 rounded-md border border-muted p-6">
        <TriangleAlertIcon size={24} className="text-anicotto-accent" />
        <p>視聴中の作品がありません</p>
      </div>
    )
  }

  if (selectedEpisode === null) {
    const showLibrary = libraries.find((lib) => lib.nextEpisode !== null)

    if (showLibrary !== undefined) {
      return redirect(`/track?episode=${showLibrary.nextEpisode?.id}`)
    }
  }

  return <WorkSelectContent libraries={libraries} selectedEpisode={selectedEpisode?.toString()} />
}

export const WorkSelectSkeleton = () => (
  <div className="flex items-center gap-x-4 rounded-md border border-muted p-2">
    <Skeleton className="h-16 w-16" />
    <div className="flex flex-col gap-y-1">
      <Skeleton className="h-[1lh] w-20" />
      <Skeleton className="h-[1lh] w-32" />
    </div>
  </div>
)
