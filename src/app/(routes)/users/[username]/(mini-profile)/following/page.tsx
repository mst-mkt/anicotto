import { SearchIcon, UsersIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { Button } from '../../../../../../components/ui/button'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../../../../actions/api/get/users'
import { FollowingList, FollowingListSkeleton } from './_components/following-list'

type FollowingPageProps = {
  params: Promise<{
    username: string
  }>
}

export const generateMetadata = async ({ params }: FollowingPageProps): Promise<Metadata> => {
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
        <UsersIcon className="text-anicotto-accent" size={24} />
        {user?.name}のフォロー
      </h1>
      <Suspense fallback={<FollowingListSkeleton />}>
        <FollowingList username={username} />
      </Suspense>
      <Button asChild={true} className="w-fit self-center" variant="secondary">
        <Link href={`/users/${username}/followers`}>
          <SearchIcon />
          フォロワーを見る
        </Link>
      </Button>
    </div>
  )
}

export default FollowingPage
