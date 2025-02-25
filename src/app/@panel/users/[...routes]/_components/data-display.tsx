import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { User } from '../../../../../schemas/annict/users'
import { getActivitiesPerAction } from '../get-activities'
import { getUser } from '../get-user'

type DataDisplayProps = {
  username: User['username']
}

export const DataDisplay: FC<DataDisplayProps> = async ({ username }) => {
  const activities = await getActivitiesPerAction(username)
  const user = await getUser(username)

  return (
    <div className="grid @3xs:grid-cols-2 grid-cols-1 gap-2">
      <div className="flex flex-col gap-y-1 rounded-md bg-muted p-4">
        <div className="text-muted-foreground text-xs">
          <span>今月の</span>
          <span>記録</span>
        </div>
        <div className="flex items-baseline gap-x-1 font-bold">
          <span className="text-2xl">
            {activities.create_record + activities.create_multiple_records}
          </span>
          <span className="text-muted-foreground">件</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 rounded-md bg-muted p-4">
        <div className="text-muted-foreground text-xs">
          <span>今月の</span>
          <span>レビュー</span>
        </div>
        <div className="flex items-baseline gap-x-1 font-bold">
          <span className="text-2xl">{activities.create_review}</span>
          <span className="text-muted-foreground">件</span>
        </div>
      </div>
      {user !== null && (
        <div className="flex flex-col gap-y-1 rounded-md bg-muted p-4">
          <div className="text-muted-foreground text-xs">
            <span>視聴済みの作品</span>
          </div>
          <div className="flex items-baseline gap-x-1 font-bold">
            <span className="text-2xl">{user.watched_count}</span>
            <span className="text-muted-foreground">作品</span>
          </div>
        </div>
      )}
      {user !== null && (
        <div className="flex flex-col gap-y-1 rounded-md bg-muted p-4">
          <div className="text-muted-foreground text-xs">
            <span>視聴中の作品</span>
          </div>
          <div className="flex items-baseline gap-x-1 font-bold">
            <span className="text-2xl">{user.watching_count}</span>
            <span className="text-muted-foreground">作品</span>
          </div>
        </div>
      )}
    </div>
  )
}

export const DataDisplaySkeleton = () => (
  <div className="grid @3xs:grid-cols-2 grid-cols-1 gap-2">
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
  </div>
)
