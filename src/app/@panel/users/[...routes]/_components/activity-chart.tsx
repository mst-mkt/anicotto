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
    className="h-40 w-full"
    config={{
      activities: {
        label: 'アクティビティ',
        color: 'oklch(70% 0.2 20)',
      },
    }}
  >
    <LineChart accessibilityLayer={true} data={activities}>
      <Line
        dataKey="activities"
        dot={false}
        stroke="oklch(70% 0.2 20)"
        strokeWidth={2}
        type="monotone"
      />
      <CartesianGrid strokeDasharray="4 4" vertical={false} />
      <XAxis
        dataKey="date"
        interval={6}
        padding={{
          left: 10,
          right: 10,
        }}
        reversed={true}
        tickFormatter={(value: string) => {
          const currentDate = new Date()
          const date = new Date(value)
          const currentMonth = currentDate.getMonth() + 1
          const month = date.getMonth() + 1
          const day = date.getDate()
          return currentMonth === month ? `${day}日` : `${month}月${day}日`
        }}
        tickMargin={8}
      />
      <ChartTooltip
        content={
          <ChartTooltipContent
            indicator="line"
            labelFormatter={(label: string) =>
              new Date(label).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }
          />
        }
      />
    </LineChart>
  </ChartContainer>
)
