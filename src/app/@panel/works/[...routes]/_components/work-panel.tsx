import { PenToolIcon, StarIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import type { Work } from '../../../../../schemas/annict/works'
import { cn } from '../../../../../utils/classnames'
import styles from '../../../../layout.module.css'
import { Links, LinksSkeleton } from './links'
import { RatingChart, RatingChartSkeleton } from './rating-chart-wrapper'
import { RecordsChart, RecordsChartSkeleton } from './records-chart-wrapper'

type WorkPanelProps = {
  workId: Work['id']
}

export const WorkPanel: FC<WorkPanelProps> = async ({ workId }) => (
  <div
    className={cn(
      '@container sticky top-16 hidden h-fit flex-col gap-y-12 pr-[4svmin] lg:flex',
      styles.panel,
    )}
  >
    <div className="flex flex-col gap-y-4">
      <h3 className="flex items-center gap-x-2 font-bold @3xs:text-lg">
        <StarIcon className="text-anicotto-accent" size={24} />
        各エピソードの満足度
      </h3>
      <Suspense fallback={<RatingChartSkeleton />}>
        <RatingChart workId={workId} />
      </Suspense>
    </div>
    <div className="flex flex-col gap-y-4">
      <h3 className="flex items-center gap-x-2 font-bold @3xs:text-lg">
        <PenToolIcon className="text-anicotto-accent" size={24} />
        各エピソードの記録数
      </h3>
      <Suspense fallback={<RecordsChartSkeleton />}>
        <RecordsChart workId={workId} />
      </Suspense>
    </div>
    <Suspense fallback={<LinksSkeleton />}>
      <Links workId={workId} />
    </Suspense>
  </div>
)
