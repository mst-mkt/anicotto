import type { FC } from 'react'
import type { User } from '../../../../../../schemas/annict/users'
import { getActivities } from '../get-activities'
import { ActivityCard } from './activity-card'

type ActivityListProps = {
  username: User['username']
}

export const ActivityList: FC<ActivityListProps> = async ({ username }) => {
  const activities = await getActivities(username)

  if (!activities) {
    return <div>Failed to fetch activities</div>
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
