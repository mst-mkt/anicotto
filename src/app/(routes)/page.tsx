import { ChevronRightIcon, FlameIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { ViewTransition } from '../../components/shared/view-transition'
import { Button } from '../../components/ui/button'
import { getCurrentSeason } from '../../utils/get-season'
import { Activity, ActivitySkeleton } from './_components/activity/activity'
import { ReloadActivityButton } from './_components/activity/reload-button'
import {
  CurrentSeasonWork,
  CurrentSeasonWorkSkeleton,
} from './_components/current-season/current-season'
import { SeasonIcon } from './_components/current-season/season-icon'

const IndexPage = () => (
  <div className="flex flex-col gap-y-16">
    <div className="flex flex-col gap-y-4">
      <hgroup className="flex items-center justify-between gap-x-4">
        <h2 className="flex items-center gap-x-2 font-bold text-lg">
          <SeasonIcon season={getCurrentSeason()} size={24} className="text-anicotto-accent" />
          今季アニメ
        </h2>
        <Button variant="ghost" size="sm" asChild={true}>
          <Link href="/discover">
            もっと見る
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </hgroup>
      <ViewTransition>
        <Suspense fallback={<CurrentSeasonWorkSkeleton />}>
          <CurrentSeasonWork />
        </Suspense>
      </ViewTransition>
    </div>
    <div className="flex flex-col gap-y-8">
      <hgroup className="flex items-center gap-x-2">
        <FlameIcon size={24} className="text-anicotto-accent" />
        <h2 className="shrink grow font-bold text-lg">アクテビティ</h2>
        <ReloadActivityButton />
      </hgroup>
      <ViewTransition>
        <Suspense fallback={<ActivitySkeleton />}>
          <Activity />
        </Suspense>
      </ViewTransition>
    </div>
  </div>
)

export default IndexPage
