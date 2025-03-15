import { SearchIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { Button } from '../../../../../../components/ui/button'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../get-user'
import { FollowingList, FollowingListSkeleton } from './_components/following-list'

type FollowingPageProps = {
  params: Promise<{
    username: string
  }>
}

export const generateMetadata = async ({ params }: FollowingPageProps) => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} - フォロー | ${PROJECT_NAME}`,
    description: `${user?.name}のフォローの一覧`,
  }
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
