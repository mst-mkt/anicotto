import { Suspense } from 'react'
import { CurrentSeasonWork, CurrentSeasonWorkSkeleton } from './_current-season/current-season'

const Home = () => (
  <div className="flex flex-col gap-y-8">
    <Suspense fallback={<CurrentSeasonWorkSkeleton />}>
      <CurrentSeasonWork />
    </Suspense>
  </div>
)

export default Home
