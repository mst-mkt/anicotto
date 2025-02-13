import { Suspense } from 'react'
import { Activities, ActivitiesLoading } from './_components/activity/activities'
import {
  CurrentSeasonWork,
  CurrentSeasonWorkSkeleton,
} from './_components/current-season/current-season'

const IndexPage = () => (
  <div className="flex flex-col gap-y-16">
    <Suspense fallback={<CurrentSeasonWorkSkeleton />}>
      <CurrentSeasonWork />
    </Suspense>
    <Suspense fallback={<ActivitiesLoading />}>
      <Activities />
    </Suspense>
  </div>
)

export default IndexPage
