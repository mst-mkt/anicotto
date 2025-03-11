import { CloudAlertIcon } from 'lucide-react'
import { Loading } from '../../../../components/shared/loading'
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

export const ActivitiesLoading = () => (
  <div className="flex flex-col gap-y-4">
    <Loading />
  </div>
)
