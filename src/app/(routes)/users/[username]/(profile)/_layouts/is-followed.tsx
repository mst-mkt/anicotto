import type { FC } from 'react'
import type { User } from '../../../../../../schemas/annict/users'
import { getIsFollowed, getMe } from '../get-user'

type IsFollowedProps = {
  username: User['username']
  className?: string
}

export const IsFollowed: FC<IsFollowedProps> = async ({ username, className }) => {
  const me = await getMe()

  if (me === null) return null

  const isFollowed = await getIsFollowed(username, me.username)

  if (!isFollowed) return null

  return <div className={className}>フォローされています</div>
}
