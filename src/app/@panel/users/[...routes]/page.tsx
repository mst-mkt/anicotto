import type { FC } from 'react'
import { UserPanel } from './_components/user-panel'

type UserSidePanelProps = {
  params: Promise<{
    routes: string[]
  }>
}

const UserSidePanel: FC<UserSidePanelProps> = async ({ params }) => {
  const {
    routes: [_, username],
  } = await params

  return username !== undefined && <UserPanel username={username} />
}

export default UserSidePanel
