import { FlameIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import type { User } from '../../../../../schemas/annict/users'
import { cn } from '../../../../../utils/classnames'
import styles from '../../../../layout.module.css'
import { ActivityChart, ActivityChartSkeleton } from './activity-chart-wrapper'
import { DataDisplay, DataDisplaySkeleton } from './data-display'

type UserPanelProps = {
  username: User['username']
}

export const UserPanel: FC<UserPanelProps> = async ({ username }) => (
  <div
    className={cn(
      '@container sticky top-16 hidden h-fit flex-col gap-y-8 pr-[4svmin] lg:flex',
      styles.panel,
    )}
  >
    <h3 className="flex items-center gap-x-2 font-bold @3xs:text-lg">
      <FlameIcon size={24} className="text-anicotto-accent" />
      直近のアクティビティ
    </h3>
    <Suspense fallback={<ActivityChartSkeleton />}>
      <ActivityChart username={username} />
    </Suspense>
    <Suspense fallback={<DataDisplaySkeleton />}>
      <DataDisplay username={username} />
    </Suspense>
  </div>
)
