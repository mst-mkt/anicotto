import type { FC } from 'react'
import { Skeleton } from '../../../../../components/ui/skeleton'
import type { Work } from '../../../../../schemas/annict/works'
import { getWorkLatestEpisode } from '../../../../actions/api/get/episodes'
import { RatingChart as Chart } from './rating-chart'

type RatingChartProps = {
  workId: Work['id']
}

export const RatingChart: FC<RatingChartProps> = async ({ workId }) => {
  const episodes = await getWorkLatestEpisode(workId, 24)
  const hasRatings = episodes.filter((episode) => episode.satisfaction_rate !== 0)

  return <Chart ratings={hasRatings} />
}

export const RatingChartSkeleton = () => <Skeleton className="h-32 w-full" />
