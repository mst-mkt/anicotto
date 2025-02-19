import { HomeIcon, LinkIcon, UserRoundXIcon } from 'lucide-react'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { Image } from '../../../../../../components/shared/image'
import { AspectRatio } from '../../../../../../components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../components/ui/avatar'
import { Badge } from '../../../../../../components/ui/badge'
import { Button } from '../../../../../../components/ui/button'
import { proxiedImage } from '../../../../../../lib/images/proxy'
import { getMe, getUser } from '../../get-user'
import { FollowButton } from './follow-button'
import { IsFollowed } from './is-followed'

type ProfileProps = {
  username: string
}

export const Profile: FC<ProfileProps> = async ({ username }) => {
  const me = await getMe()
  const user = await getUser(username)

  if (user === null) {
    return (
      <div className="flex flex-col items-center gap-y-8 py-16">
        <UserRoundXIcon size={40} className="text-anicotto-accent" />
        <p>ユーザーが見つかりませんでした</p>
        <Button asChild={true}>
          <Link href="/">
            <HomeIcon />
            ホームに戻る
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <header className="relative">
        <AspectRatio ratio={3} className="overflow-hidden rounded-lg">
          <Image
            fill={true}
            sizes="100%"
            src={
              user.background_image_url.endsWith('no-image.jpg')
                ? undefined
                : proxiedImage(user.background_image_url)
            }
            fallback={<div className="h-full w-full bg-anicotto-accent object-cover" />}
            alt={`${user.name}のバナー`}
            className="h-full w-full object-cover blur-xs brightness-75"
          />
        </AspectRatio>
        <Suspense>
          <IsFollowed
            username={user.username}
            className="absolute top-4 left-4 rounded-sm bg-black/16 px-2 py-1 font-bold text-sm text-white"
          />
        </Suspense>
      </header>
      <div className="-mt-2 flex items-center gap-x-4">
        <Avatar className="h-24 w-24 outline-4 outline-background">
          <AvatarImage src={user.avatar_url} alt={`${user.name}のアバター`} />
          <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 grow flex-col gap-y-1 pt-4">
          <hgroup className="flex items-center gap-x-2">
            <h1 className="shrink truncate font-bold text-lg">{user.name}</h1>
            <Badge variant="outline" className="rounded-sm px-1 py-0.5">
              @{user.username}
            </Badge>
          </hgroup>
          <p className="truncate text-sm">{user.description}</p>
          <div className="flex h-5 items-center gap-x-1">
            {user.url !== null && user.url !== '' && (
              <Link
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-anicotto-accent"
              >
                <LinkIcon size={16} />
              </Link>
            )}
            <time dateTime={user.created_at} className="text-muted-foreground text-xs">
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
            <FollowButton username={user.username} myUsername={me.username} />
          </Suspense>
        )}
      </div>
      <div className="flex gap-x-4 truncate py-4 text-sm">
        <Link
          href={`/users/${user.username}/following`}
          className="flex items-center gap-x-1 hover:underline"
        >
          <span className="text-muted-foreground text-sm">フォロー</span>
          <span>{user.followings_count}</span>
        </Link>
        <Link
          href={`/users/${user.username}/followers`}
          className="flex items-center gap-x-1 hover:underline"
        >
          <span className="text-muted-foreground text-sm">フォロワー</span>
          <span>{user.followers_count}</span>
        </Link>
        <Link
          href={`/users/${user.username}/records`}
          className="flex items-center gap-x-1 hover:underline"
        >
          <span className="text-muted-foreground text-sm">記録した数</span>
          <span>{user.records_count}</span>
        </Link>
      </div>
    </div>
  )
}
