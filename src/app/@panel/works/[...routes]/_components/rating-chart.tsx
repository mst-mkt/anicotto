'use client'

import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../../components/ui/chart'
import type { Episode } from '../get-episodes'

type RatingChartProps = {
  ratings: Episode[]
}

export const RatingChart: FC<RatingChartProps> = ({ ratings }) => (
  <ChartContainer
    config={{
      satisfactionRate: {
        label: '満足度',
        color: 'oklch(70% 0.2 20)',
      },
    }}
    className="h-32 w-full"
  >
    <LineChart data={ratings} accessibilityLayer={true}>
      <Line
        type="monotone"
        dataKey="satisfactionRate"
        stroke="oklch(70% 0.2 20)"
        strokeWidth={2}
        dot={false}
      />
      <CartesianGrid vertical={false} strokeDasharray="4 4" />
      <XAxis
        dataKey="numberText"
        interval={Math.floor(ratings.length / 7)}
        tickMargin={8}
        padding={{ left: 10, right: 10 }}
      />
      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
    </LineChart>
  </ChartContainer>
)
