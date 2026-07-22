import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../components/ui/avatar'
import type { User } from '../../../../../../schemas/annict/users'
import { getUser } from '../../../../../actions/api/get/users'

type MiniProfileProps = {
  username: User['username']
}

export const MiniProfile: FC<MiniProfileProps> = async ({ username }) => {
  const user = await getUser(username)

  if (user === null) {
    notFound()
  }

  return (
    <header className="flex h-10 items-center gap-x-2">
      <Link className="contents" href={`/users/${user.username}`}>
        <div className="cursor-pointer rounded-full p-2 transition-colors hover:bg-muted">
          <ChevronLeftIcon size={20} />
        </div>
        <div className="flex min-w-0 gap-x-2 rounded-lg px-2 py-1 transition-colors hover:bg-muted">
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={`${user.username}のアバター`}
              className="h-8 w-8"
              src={user.avatar_url}
            />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1 className="truncate text-sm">{user.name}</h1>
            <p className="truncate text-muted-foreground text-xs">@{user.username}</p>
          </div>
        </div>
      </Link>
    </header>
  )
}
