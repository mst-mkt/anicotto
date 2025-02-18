import { type FC, Suspense } from 'react'
import { Loading } from '../../../../../../components/shared/loading'
import { getUser } from '../../get-user'

type UserRawPageProps = {
  params: Promise<{
    username: string
  }>
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
