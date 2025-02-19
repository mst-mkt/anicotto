import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
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
