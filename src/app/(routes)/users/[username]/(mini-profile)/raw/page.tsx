import { type FC, Suspense } from 'react'
import { Loading } from '../../../../../../components/shared/loading'
import { PROJECT_NAME } from '../../../../../../constants/project'
import { getUser } from '../../../../../actions/api/get/users'

type UserRawPageProps = {
  params: Promise<{
    username: string
  }>
}

export const generateMetadata = async ({ params }: UserRawPageProps) => {
  const { username } = await params
  const user = await getUser(username)

  return {
    title: `${user?.name} - 情報 | ${PROJECT_NAME}`,
    description: `${user?.name}の情報 (APIのレスポンス)`,
  }
}

const UserRawPage: FC<UserRawPageProps> = async ({ params }) => {
  const { username } = await params

  return (
    <Suspense fallback={<Loading />}>
      <RawData username={username} />
    </Suspense>
  )
}

const RawData = async ({ username }: { username: string }) => {
  const user = await getUser(username)

  if (user === null) {
    return <pre>user ({username}) not found</pre>
  }

  return (
    <pre className="scrollbar-thin overflow-x-scroll rounded-lg border border-background-300 bg-muted p-4">
      {JSON.stringify(user, null, 2)}
    </pre>
  )
}

export default UserRawPage
