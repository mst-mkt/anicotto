import type { FC } from 'react'

type UserPageProps = {
  params: Promise<{
    username: string
  }>
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const { username } = await params

  return <div className="flex flex-col gap-y-8">{username}</div>
}

export default UserPage
