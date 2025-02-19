import { PenToolIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../get-user'
import { RecordList, RecordListSkeleton } from './_components/record-list'

type UserRecordsPageProps = {
  params: Promise<{
    username: string
  }>
}

export const generateMetadata = async ({ params }: UserRecordsPageProps) => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} - 記録 | ${PROJECT_NAME}`,
    description: `${user?.name}の記録の一覧`,
  }
}

const UserRecordsPage: FC<UserRecordsPageProps> = async ({ params }) => {
  const { username } = await params

  const user = await getUser(username)

  return (
    <div>
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <PenToolIcon size={24} className="text-anicotto-accent" />
        {user?.name}の記録
      </h1>
      <Suspense fallback={<RecordListSkeleton />}>
        <RecordList username={username} />
      </Suspense>
    </div>
  )
}

export default UserRecordsPage
