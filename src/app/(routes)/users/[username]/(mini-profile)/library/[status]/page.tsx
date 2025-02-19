import { redirect } from 'next/navigation'
import { type FC, Suspense } from 'react'
import { STATUS_ICON, STATUS_TEXT } from '../../../../../../../constants/status'
import { type Status, statusPicklist } from '../../../../../../../schemas/annict/common'
import { Tab } from './_components/tabs'
import { WorkList, WorkListSkeleton } from './_components/work-list'

type UserLibraryLayoutProps = {
  params: Promise<{
    username: string
    status: string
  }>
}

const isStatus = (status: string): status is Exclude<Status, 'no_select'> => {
  return status !== 'no_select' && statusPicklist.options.includes(status as Status)
}

const UserLibraryLayout: FC<UserLibraryLayoutProps> = async ({ params }) => {
  const { username, status } = await params

  if (!isStatus(status)) redirect(`/users/${username}/library`)

  const StatusIcon = STATUS_ICON[status]

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <StatusIcon className="text-anicotto-accent" size={24} />「{STATUS_TEXT[status]}
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
