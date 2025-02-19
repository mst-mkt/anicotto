import type { FC, ReactNode } from 'react'
import { MiniProfile } from './_layouts/mini-profile'

type UserMiniProfileLayoutProps = {
  children: ReactNode
  params: Promise<{
    username: string
  }>
}

const UserMiniProfileLayout: FC<UserMiniProfileLayoutProps> = async ({ children, params }) => {
  const { username } = await params

  return (
    <div className="flex flex-col gap-y-8">
      <MiniProfile username={username} />
      {children}
    </div>
  )
}

export default UserMiniProfileLayout
