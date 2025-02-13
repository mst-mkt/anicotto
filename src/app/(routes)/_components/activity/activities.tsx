import { CloudAlertIcon, FlameIcon } from 'lucide-react'
import { Loading } from '../../../../components/shared/loading'
import { getActivities } from '../../get-activities'
import { Activity } from './activity'
import { ReloadActivityButton } from './reload-button'

export const Activities = async () => {
  const activities = await getActivities()

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center gap-x-2">
        <FlameIcon size={24} className="text-anicotto-accent" />
        <h2 className="shrink grow font-bold text-lg">アクテビティ</h2>
        <ReloadActivityButton />
      </div>
      {activities === null ? (
        <div className="flex w-full flex-col items-center justify-center gap-y-4 p-8">
          <CloudAlertIcon size={40} className="text-muted-foreground" />
          <p>アクテビティが取得できませんでした</p>
        </div>
      ) : (
        activities.map((activity) => <Activity key={activity.id} {...activity} />)
      )}
    </div>
  )
}

export const ActivitiesLoading = () => (
  <div className="flex flex-col gap-y-8">
    <div className="flex items-center gap-x-2">
      <FlameIcon size={24} className="text-anicotto-accent" />
      <h2 className="shrink grow font-bold text-lg">アクテビティ</h2>
      <ReloadActivityButton />
    </div>
    <Loading />
  </div>
)
