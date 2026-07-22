import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { type FC, Suspense } from 'react'
import { StatusIcon } from '../../../../../../../components/icon/status'
import { PROJECT_NAME } from '../../../../../../../constants/project'
import { STATUS_TEXT } from '../../../../../../../constants/text/status'
import { type Status, statusPicklist } from '../../../../../../../schemas/annict/common'
import { getUser } from '../../../../../../actions/api/get/users'
import { Tab } from './_components/tabs'
import { WorkList, WorkListSkeleton } from './_components/work-list'

const isStatus = (status: string): status is Exclude<Status, 'no_select'> => {
  return status !== 'no_select' && statusPicklist.options.includes(status as Status)
}

export const generateMetadata = async ({
  params,
}: PageProps<'/users/[username]/library/[status]'>): Promise<Metadata> => {
  const { username, status } = await params

  if (!isStatus(status)) redirect(`/users/${username}/library`)

  const user = await getUser(username)

  return {
    title: `${user?.name} - 「${STATUS_TEXT(status)}」作品 | ${PROJECT_NAME}`,
    description: `${user?.name}が「${STATUS_TEXT(status)}」として設定した作品の一覧`,
  }
}

const UserLibraryLayout: FC<PageProps<'/users/[username]/library/[status]'>> = async ({
  params,
}) => {
  const { username, status } = await params

  if (!isStatus(status)) redirect(`/users/${username}/library`)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex items-center gap-x-2 font-bold text-lg">
        <StatusIcon className="text-anicotto-accent" size={24} status={status} />「
        {STATUS_TEXT(status)}
        」のライブラリ
      </h1>
      <Tab username={username} />
      <Suspense fallback={<WorkListSkeleton />}>
        <WorkList status={status} username={username} />
      </Suspense>
    </div>
  )
}

export default UserLibraryLayout
