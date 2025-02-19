import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../components/ui/skeleton'
import type { User } from '../../../../../../schemas/annict/users'
import { getActivities } from '../get-activities'
import { ActivityCard } from './activity-card'

type ActivityListProps = {
  username: User['username']
}

export const ActivityList: FC<ActivityListProps> = async ({ username }) => {
  const activities = await getActivities(username)

  if (activities === null) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>アクテビティが取得できませんでした</p>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>アクテビティがありません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

export const ActivityListSkeleton = () => (
  <div className="flex flex-col gap-y-4 py-4">
    {[...Array(4)].map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this is static array
      <div className="flex flex-col gap-y-2" key={index}>
        <div className="flex justify-between gap-x-2">
          <Skeleton className="h-[1lh] w-1/2" />
          <Skeleton className="h-[1lh] w-1/5" />
        </div>
        <div className="flex items-center gap-x-4 rounded-lg border border-muted p-4">
          <Skeleton className="aspect-square h-24 md:aspect-video" />
          <div className="flex w-full flex-col justify-center gap-y-2">
            <Skeleton className="h-[1lh] w-3/4" />
            <Skeleton className="h-[1lh] w-1/2 text-sm" />
          </div>
        </div>
      </div>
    ))}
  </div>
)
