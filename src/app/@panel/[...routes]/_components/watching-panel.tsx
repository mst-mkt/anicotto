import { ScrollArea } from '../../../../components/ui/scroll-area'
import { Skeleton } from '../../../../components/ui/skeleton'
import { getWorks } from '../../get-programs'
import { WorkItem } from './work-item'

export const WatchingPanel = async () => {
  const watchingWorks = await getWorks()

  if (watchingWorks === null) {
    return null
  }

  return (
    <ScrollArea className="h-[64svh]">
      <div className="flex w-full flex-col gap-y-2 pr-2">
        {watchingWorks.map((work) => (
          <WorkItem key={work.id} {...work} />
        ))}
      </div>
    </ScrollArea>
  )
}

export const WatchingPanelSkeleton = () => (
  <div className="flex w-full flex-col gap-y-2 pr-2">
    {[...Array(8)].map((_, index) => (
      <Skeleton key={index} className="h-14 w-full" />
    ))}
  </div>
)
