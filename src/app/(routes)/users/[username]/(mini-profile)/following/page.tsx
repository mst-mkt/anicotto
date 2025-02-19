import { UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { SearchIcon } from '../../../../../../components/icons/search'
import { Button } from '../../../../../../components/ui/button'
import { getUser } from '../../get-user'
import { FollowingList, FollowingListSkeleton } from './_components/following-list'

type FollowingPageProps = {
  params: Promise<{
    username: string
  }>
}

const FollowingPage: FC<FollowingPageProps> = async ({ params }) => {
  const { username } = await params

  const user = await getUser(username)

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <UsersIcon size={24} className="text-anicotto-accent" />
        {user?.name}のフォロー
      </h1>
      <Suspense fallback={<FollowingListSkeleton />}>
        <FollowingList username={username} />
      </Suspense>
      <Button variant="secondary" asChild={true} className="w-fit self-center">
        <Link href={`/users/${username}/followers`}>
          <SearchIcon />
          フォロワーを見る
        </Link>
      </Button>
    </div>
  )
}

export default FollowingPage
