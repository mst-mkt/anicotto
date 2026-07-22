import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { Work } from '../../../../../schemas/annict/works'
import { getWorkLatestEpisode } from '../../../../actions/api/get/episodes'
import { RecordsChart as Chart } from './records-chart'

type RecordsChartProps = {
  workId: Work['id']
}

export const RecordsChart: FC<RecordsChartProps> = async ({ workId }) => {
  const episodes = await getWorkLatestEpisode(workId, 24)

  return <Chart records={episodes} />
}

export const RecordsChartSkeleton = () => <Skeleton className="h-32 w-full" />
