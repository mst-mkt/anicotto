import { Suspense } from 'react'
import { Activities, ActivitiesLoading } from './_activity/activities'
import { CurrentSeasonWork, CurrentSeasonWorkSkeleton } from './_current-season/current-season'

const Home = () => (
  <div className="flex flex-col gap-y-16 pb-16">
    <Suspense fallback={<CurrentSeasonWorkSkeleton />}>
      <CurrentSeasonWork />
    </Suspense>
    <Suspense fallback={<ActivitiesLoading />}>
      <Activities />
    </Suspense>
  </div>
)

export default Home
