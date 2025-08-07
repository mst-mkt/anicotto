import { CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import type { User } from '../../../schemas/annict/users'
import { timeText } from '../../../utils/time-text'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../ui/hover-card'

type UserHoverCardProps = {
  user:
    | User
    | {
        username: string
        avatar_url: string
        name: string
        description: string
        followings_count: number
        followers_count: number
        created_at: string
      }
  children: ReactNode
}

export const UserHoverCard: FC<UserHoverCardProps> = ({ user, children }) => (
  <HoverCard closeDelay={100} openDelay={100}>
    <HoverCardTrigger asChild={true}>{children}</HoverCardTrigger>
    <HoverCardContent align="start" className="w-fit max-w-80 rounded-lg" sideOffset={16}>
      <div className="flex gap-x-4">
        <Link href={`/users/${user.username}`}>
          <Avatar className="h-12 w-12">
            <AvatarImage alt={`${user.username} のアバター`} src={user.avatar_url} />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col gap-y-2">
          <Link className="flex items-center gap-x-2" href={`/users/${user.username}`}>
            <span className="font-bold">{user.name}</span>
            <span className="text-muted-foreground text-sm">@{user.username}</span>
          </Link>
          {user.description !== '' && (
            <p className="text-muted-foreground text-sm">{user.description}</p>
          )}
          <div className="flex gap-x-4">
            <Link
              className="group flex items-center gap-x-0.5 font-bold"
              href={`/users/${user.username}/following`}
            >
              <span className="text-sm transition-colors group-hover:text-anicotto-accent">
                {user.followings_count}
              </span>
              <span className="text-muted-foreground text-xs transition-colors group-hover:text-anicotto-accent">
                フォロー
              </span>
            </Link>
            <Link
              className="group flex items-center gap-x-0.5 font-bold"
              href={`/users/${user.username}/followers`}
            >
              <span className="text-sm transition-colors group-hover:text-anicotto-accent">
                {user.followers_count}
              </span>
              <span className="text-muted-foreground text-xs transition-colors group-hover:text-anicotto-accent">
                フォロワー
              </span>
            </Link>
          </div>
          <p className="flex items-center gap-x-1 text-muted-foreground text-xs">
            <CalendarIcon size={16} />
            <time dateTime={user.created_at}>{timeText(user.created_at)}に登録</time>
          </p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
)
