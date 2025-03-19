import { CloudAlertIcon } from 'lucide-react'
import { Skeleton } from '../../../../components/ui/skeleton'
import { getActivities } from '../../get-activities'
import { ActivityItem } from './activity-item'

export const Activity = async () => {
  const activities = await getActivities()

  if (activities === null) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-y-4 p-8">
        <CloudAlertIcon size={40} className="text-muted-foreground" />
        <p>アクテビティが取得できませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-8">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

export const ActivitySkeleton = () => (
  <div className="flex flex-col gap-y-8">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="flex gap-x-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
        <div className="flex w-full flex-col">
          <div className="flex h-12 items-center justify-between gap-x-2">
            <Skeleton className="h-[1lh] w-1/2" />
            <Skeleton className="h-[1lh] w-1/8 text-sm" />
          </div>
          <div className="flex items-center gap-x-4 rounded-lg border border-muted p-2">
            <Skeleton className="relative aspect-square h-24 shrink-0 grow-0 md:aspect-video" />
            <div className="flex w-full flex-col gap-y-2">
              <Skeleton className="h-[1lh] w-1/2" />
              <Skeleton className="h-[1lh] w-2/3 text-sm" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)
