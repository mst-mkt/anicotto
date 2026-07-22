import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { User } from '../../../../../schemas/annict/users'
import { getUserActivityCountsPerDay } from '../../../../actions/api/get/activities'
import { ActivityChart as Chart } from './activity-chart'

type ActivityChartProps = {
  username: User['username']
}

export const ActivityChart: FC<ActivityChartProps> = async ({ username }) => {
  const activities = await getUserActivityCountsPerDay(username)

  return <Chart activities={activities} />
}

export const ActivityChartSkeleton = () => <Skeleton className="h-40" />
