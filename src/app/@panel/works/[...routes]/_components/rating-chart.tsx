'use client'

import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../../components/ui/chart'
import type { Episodes } from '../../../../actions/api/get/episodes'

type RatingChartProps = {
  ratings: Episodes
}

export const RatingChart: FC<RatingChartProps> = ({ ratings }) => (
  <ChartContainer
    className="h-32 w-full"
    config={{
      satisfaction_rate: {
        label: '満足度',
        color: 'oklch(70% 0.2 20)',
      },
    }}
  >
    <LineChart accessibilityLayer={true} data={ratings}>
      <Line
        dataKey="satisfaction_rate"
        dot={false}
        stroke="oklch(70% 0.2 20)"
        strokeWidth={2}
        type="monotone"
      />
      <CartesianGrid strokeDasharray="4 4" vertical={false} />
      <XAxis
        dataKey="number_text"
        interval={Math.floor(ratings.length / 7)}
        padding={{ left: 10, right: 10 }}
        tickMargin={8}
      />
      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
    </LineChart>
  </ChartContainer>
)
