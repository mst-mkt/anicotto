import { type FC, Suspense } from 'react'
import { ActivityList, ActivityListSkeleton } from './_components/activity-list'

type UserPageProps = {
  params: Promise<{
    username: string
  }>
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const { username } = await params

  return (
    <div className="flex flex-col gap-y-8">
      <Suspense fallback={<ActivityListSkeleton />}>
        <ActivityList username={username} />
      </Suspense>
    </div>
  )
}

export default UserPage
