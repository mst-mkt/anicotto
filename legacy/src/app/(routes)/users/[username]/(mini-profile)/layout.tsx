import type { FC } from 'react'
import { MiniProfile } from './_layouts/mini-profile'

const UserMiniProfileLayout: FC<LayoutProps<'/users/[username]'>> = async ({
  children,
  params,
}) => {
  const { username } = await params

  return (
    <div className="flex flex-col gap-y-8">
      <MiniProfile username={username} />
      {children}
    </div>
  )
}

export default UserMiniProfileLayout
