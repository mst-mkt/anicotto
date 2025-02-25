'use client'

import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../../components/ui/chart'

type ActivityChartProps = {
  activities: {
    date: string
    activities: number
  }[]
}

export const ActivityChart: FC<ActivityChartProps> = ({ activities }) => (
  <ChartContainer
    config={{
      activities: {
        label: 'アクティビティ',
        color: 'oklch(70% 0.2 20)',
      },
    }}
    className="h-40 w-full"
  >
    <LineChart data={activities} accessibilityLayer={true}>
      <Line
        type="monotone"
        dataKey="activities"
        stroke="oklch(70% 0.2 20)"
        strokeWidth={2}
        dot={false}
      />
      <CartesianGrid vertical={false} strokeDasharray="4 4" />
      <XAxis
        dataKey="date"
        interval={6}
        tickMargin={8}
        reversed={true}
        padding={{
          left: 10,
          right: 10,
        }}
        tickFormatter={(value: string) => {
          const currentDate = new Date()
          const date = new Date(value)
          const currentMonth = currentDate.getMonth() + 1
          const month = date.getMonth() + 1
          const day = date.getDate()
          return currentMonth === month ? `${day}日` : `${month}月${day}日`
        }}
      />
      <ChartTooltip
        content={
          <ChartTooltipContent
            labelFormatter={(label: string) =>
              new Date(label).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }
            indicator="line"
          />
        }
      />
    </LineChart>
  </ChartContainer>
)
