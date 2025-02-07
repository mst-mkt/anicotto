import { Suspense } from 'react'
import { Loading } from '../../components/shared/loading'
import { Activities } from './_activity/activities'
import { CurrentSeasonWork, CurrentSeasonWorkSkeleton } from './_current-season/current-season'

const Home = () => (
  <div className="flex flex-col gap-y-16 py-8">
    <Suspense fallback={<CurrentSeasonWorkSkeleton />}>
      <CurrentSeasonWork />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <Activities />
    </Suspense>
  </div>
)

export default Home
