import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../../../constants/project'
import { getUser } from '../../../../actions/api/get/users'
import { ActivityList, ActivityListSkeleton } from './_components/activity-list'

export const generateMetadata = async ({
  params,
}: PageProps<'/users/[username]'>): Promise<Metadata> => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} | ${PROJECT_NAME}`,
    description: `${user?.name}のユーザーページ`,
  }
}

const UserPage: FC<PageProps<'/users/[username]'>> = async ({ params }) => {
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
