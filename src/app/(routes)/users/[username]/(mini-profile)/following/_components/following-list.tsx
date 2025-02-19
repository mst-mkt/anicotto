import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../../components/ui/avatar'
import { Badge } from '../../../../../../../components/ui/badge'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import type { User } from '../../../../../../../schemas/annict/users'
import { getFollowing } from '../get-following'

type FollowingListProps = {
  username: User['username']
}

export const FollowingList: FC<FollowingListProps> = async ({ username }) => {
  const followers = await getFollowing(username)

  if (followers === null) {
    return (
      <div className="flex flex-col items-center gap-y-8 py-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>フォローを取得できませんでした</p>
      </div>
    )
  }

  if (followers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-8 py-16">
        <OrigamiIcon size={40} className="text-anicotto-accent" />
        <p>フォローしているユーザーがいません</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-y-4">
      {followers.map((follower) => (
        <li key={follower.id}>
          <Link
            href={`/users/${follower.username}`}
            className="flex items-center gap-x-4 rounded-lg border border-muted p-4 transition-colors hover:bg-muted"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={follower.avatar_url} alt={`${follower.name}のアバター`} />
              <AvatarFallback>{follower.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
              <hgroup className="flex items-center gap-x-2">
                <h2 className="font-bold">{follower.name}</h2>
                <Badge variant="outline" className="rounded-sm px-1 py-0.5">
                  @{follower.username}
                </Badge>
              </hgroup>
              <div className="flex items-center gap-x-2 text-sm">
                <div>
                  <span>{follower.followings_count}</span>
                  <span className="text-muted-foreground">フォロー</span>
                </div>
                <div>
                  <span>{follower.followers_count}</span>
                  <span className="text-muted-foreground">フォロワー</span>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const FollowingListSkeleton = () => (
  <ul className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this is static array
      <li key={index} className="flex items-center gap-x-4 rounded-lg border border-muted p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex w-full flex-col gap-y-1">
          <Skeleton className="h-[1lh] w-1/2" />
          <Skeleton className="h-[1lh] w-1/3 text-sm" />
        </div>
      </li>
    ))}
  </ul>
)
