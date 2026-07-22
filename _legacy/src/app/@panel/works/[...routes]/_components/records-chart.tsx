'use client'

import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../../components/ui/chart'
import type { Episodes } from '../../../../actions/api/get/episodes'

type RecordsChartProps = {
  records: Episodes
}

export const RecordsChart: FC<RecordsChartProps> = ({ records }) => (
  <ChartContainer
    className="h-32 w-full"
    config={{
      records_count: {
        label: '記録数',
        color: 'oklch(70% 0.2 20)',
      },
    }}
  >
    <LineChart accessibilityLayer={true} data={records}>
      <Line
        dataKey="records_count"
        dot={false}
        stroke="oklch(70% 0.2 20)"
        strokeWidth={2}
        type="monotone"
      />
      <CartesianGrid strokeDasharray="4 4" vertical={false} />
      <XAxis
        dataKey="number_text"
        interval={Math.floor(records.length / 7)}
        padding={{ left: 10, right: 10 }}
        tickMargin={8}
      />
      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
    </LineChart>
  </ChartContainer>
)
