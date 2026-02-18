import { PenToolIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../../../../actions/api/get/users'
import { RecordList, RecordListSkeleton } from './_components/record-list'

export const generateMetadata = async ({
  params,
}: PageProps<'/users/[username]/records'>): Promise<Metadata> => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} - 記録 | ${PROJECT_NAME}`,
    description: `${user?.name}の記録の一覧`,
  }
}

const UserRecordsPage: FC<PageProps<'/users/[username]/records'>> = async ({ params }) => {
  const { username } = await params

  const user = await getUser(username)

  return (
    <div>
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <PenToolIcon className="text-anicotto-accent" size={24} />
        {user?.name}の記録
      </h1>
      <Suspense fallback={<RecordListSkeleton />}>
        <RecordList username={username} />
      </Suspense>
    </div>
  )
}

export default UserRecordsPage
