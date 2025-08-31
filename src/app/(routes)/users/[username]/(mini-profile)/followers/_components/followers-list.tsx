import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../../components/ui/avatar'
import { Badge } from '../../../../../../../components/ui/badge'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import type { User } from '../../../../../../../schemas/annict/users'
import { getFollowers } from '../../../../../../actions/api/get/followers'

type FollowersListProps = {
  username: User['username']
}

export const FollowersList: FC<FollowersListProps> = async ({ username }) => {
  const followers = await getFollowers(username)

  if (followers === null) {
    return (
      <div className="flex flex-col items-center gap-y-8 py-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>フォロワーを取得できませんでした</p>
      </div>
    )
  }

  if (followers.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-8 py-16">
        <OrigamiIcon className="text-anicotto-accent" size={40} />
        <p>フォロワーがいません</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-y-4">
      {followers.data.map((follower) => (
        <li key={follower.id}>
          <Link
            className="flex items-center gap-x-4 rounded-lg border border-muted p-4 transition-colors hover:bg-muted"
            href={`/users/${follower.username}`}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage alt={`${follower.name}のアバター`} src={follower.avatar_url} />
              <AvatarFallback>{follower.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
              <hgroup className="flex items-center gap-x-2">
                <h2 className="font-bold">{follower.name}</h2>
                <Badge className="rounded-sm px-1 py-0.5" variant="outline">
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

export const FollowersListSkeleton = () => (
  <ul className="flex flex-col gap-y-4">
    {[...Array(8)].map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
      <li className="flex items-center gap-x-4 rounded-lg border border-muted p-4" key={index}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex w-full flex-col gap-y-1">
          <Skeleton className="h-[1lh] w-1/2" />
          <Skeleton className="h-[1lh] w-1/3 text-sm" />
        </div>
      </li>
    ))}
  </ul>
)
