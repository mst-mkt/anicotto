import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type FC, Suspense } from 'react'
import { Image } from '../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../components/ui/avatar'
import { Badge } from '../../../../../../components/ui/badge'
import { proxiedImage } from '../../../../../../lib/images/proxy'
import { getMe, getUser } from '../../../../../actions/api/get/users'
import { FollowButton } from './follow-button'
import { IsFollowed } from './is-followed'

type ProfileProps = {
  username: string
}

export const Profile: FC<ProfileProps> = async ({ username }) => {
  const me = await getMe()
  const user = await getUser(username)

  if (user === null) {
    notFound()
  }

  return (
    <div>
      <header className="relative">
        <AspectRatio className="overflow-hidden rounded-lg" ratio={3}>
          <Image
            alt={`${user.name}のバナー`}
            className="h-full w-full object-cover blur-xs brightness-75"
            fallback={<div className="h-full w-full bg-anicotto-accent object-cover" />}
            fill={true}
            sizes="100%"
            src={
              user.background_image_url.endsWith('no-image.jpg')
                ? undefined
                : proxiedImage(user.background_image_url)
            }
          />
        </AspectRatio>
        <Suspense>
          <IsFollowed
            className="absolute top-4 left-4 rounded-sm bg-black/16 px-2 py-1 font-bold text-sm text-white"
            username={user.username}
          />
        </Suspense>
      </header>
      <div className="-mt-2 flex items-center gap-x-4">
        <Avatar className="h-24 w-24 outline-4 outline-background">
          <AvatarImage alt={`${user.name}のアバター`} src={user.avatar_url} />
          <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 grow flex-col gap-y-1 pt-4">
          <hgroup className="flex items-center gap-x-2">
            <h1 className="shrink truncate font-bold text-lg">{user.name}</h1>
            <Badge className="rounded-sm px-1 py-0.5" variant="outline">
              @{user.username}
            </Badge>
          </hgroup>
          <p className="truncate text-sm">{user.description}</p>
          <div className="flex h-5 items-center gap-x-1">
            {user.url !== null && user.url !== '' && (
              <Link
                className="text-anicotto-accent"
                href={user.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkIcon size={16} />
              </Link>
            )}
            <time className="text-muted-foreground text-xs" dateTime={user.created_at}>
              {new Date(user.created_at).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              に登録
            </time>
          </div>
        </div>
        {me !== null && user.id !== me.id && (
          <Suspense>
            <FollowButton myUsername={me.username} username={user.username} />
          </Suspense>
        )}
      </div>
      <div className="flex gap-x-4 truncate py-4 text-sm">
        <Link
          className="flex items-center gap-x-1 hover:underline"
          href={`/users/${user.username}/following`}
        >
          <span className="text-muted-foreground text-sm">フォロー</span>
          <span>{user.followings_count}</span>
        </Link>
        <Link
          className="flex items-center gap-x-1 hover:underline"
          href={`/users/${user.username}/followers`}
        >
          <span className="text-muted-foreground text-sm">フォロワー</span>
          <span>{user.followers_count}</span>
        </Link>
        <Link
          className="flex items-center gap-x-1 hover:underline"
          href={`/users/${user.username}/records`}
        >
          <span className="text-muted-foreground text-sm">記録した数</span>
          <span>{user.records_count}</span>
        </Link>
      </div>
    </div>
  )
}
