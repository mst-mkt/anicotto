import { SearchIcon, UsersIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type FC, Suspense } from 'react'
import { Button } from '../../../../../../components/ui/button'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../../../../actions/api/get/users'
import { FollowersList, FollowersListSkeleton } from './_components/followers-list'

export const generateMetadata = async ({
  params,
}: PageProps<'/users/[username]/followers'>): Promise<Metadata> => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} - フォロワー | ${PROJECT_NAME}`,
    description: `${user?.name}のフォロワーの一覧`,
  }
}

const FollowersPage: FC<PageProps<'/users/[username]/followers'>> = async ({ params }) => {
  const { username } = await params

  const user = await getUser(username)

  if (user === null) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <UsersIcon className="text-anicotto-accent" size={24} />
        {user?.name}のフォロワー
      </h1>
      <Suspense fallback={<FollowersListSkeleton />}>
        <FollowersList username={username} />
      </Suspense>
      <Button asChild={true} className="w-fit self-center" variant="secondary">
        <Link href={`/users/${username}/following`}>
          <SearchIcon />
          フォローを見る
        </Link>
      </Button>
    </div>
  )
}

export default FollowersPage
