import { redirect } from 'next/navigation'
import { type FC, Suspense } from 'react'
import { StatusIcon } from '../../../../../../../components/icon/status'
import { PROJECT_NAME } from '../../../../../../../constants/project'
import { STATUS_TEXT } from '../../../../../../../constants/text/status'
import { type Status, statusPicklist } from '../../../../../../../schemas/annict/common'
import { getUser } from '../../../get-user'
import { Tab } from './_components/tabs'
import { WorkList, WorkListSkeleton } from './_components/work-list'

const isStatus = (status: string): status is Exclude<Status, 'no_select'> => {
  return status !== 'no_select' && statusPicklist.options.includes(status as Status)
}

type UserLibraryLayoutProps = {
  params: Promise<{
    username: string
    status: string
  }>
}

export const generateMetadata = async ({ params }: UserLibraryLayoutProps) => {
  const { username, status } = await params

  if (!isStatus(status)) redirect(`/users/${username}/library`)

  const user = await getUser(username)

  return {
    title: `${user?.name} - 「${STATUS_TEXT(status)}」作品 | ${PROJECT_NAME}`,
    description: `${user?.name}が「${STATUS_TEXT(status)}」として設定した作品の一覧`,
  }
}

const UserLibraryLayout: FC<UserLibraryLayoutProps> = async ({ params }) => {
  const { username, status } = await params

  if (!isStatus(status)) redirect(`/users/${username}/library`)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <StatusIcon status={status} className="text-anicotto-accent" size={24} />「
        {STATUS_TEXT(status)}
        」のライブラリ
      </h1>
      <Tab username={username} />
      <Suspense fallback={<WorkListSkeleton />}>
        <WorkList username={username} status={status} />
      </Suspense>
    </div>
  )
}

export default UserLibraryLayout
