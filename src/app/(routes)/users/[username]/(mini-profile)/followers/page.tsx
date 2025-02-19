import { UsersIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import { getUser } from '../../get-user'
import { FollowersList, FollowersListSkeleton } from './_components/followers-list'

type FollowersPageProps = {
  params: Promise<{
    username: string
  }>
}

const FollowersPage: FC<FollowersPageProps> = async ({ params }) => {
  const { username } = await params

  const user = await getUser(username)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <UsersIcon size={24} className="text-anicotto-accent" />
        {user?.name}のフォロワー
      </h1>
      <Suspense fallback={<FollowersListSkeleton />}>
        <FollowersList username={username} />
      </Suspense>
    </div>
  )
}

export default FollowersPage
