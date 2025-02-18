import type { FC, ReactNode } from 'react'
import { Profile } from './_layouts/profile'
import { Tab } from './_layouts/tabs'

type UserProfileLayoutProps = {
  children: ReactNode
  params: Promise<{
    username: string
  }>
}

const UserProfileLayout: FC<UserProfileLayoutProps> = async ({ params, children }) => {
  const { username } = await params

  return (
    <div className="flex flex-col gap-y-4">
      <Profile username={username} />
      <Tab username={username} />
      {children}
    </div>
  )
}

export default UserProfileLayout
