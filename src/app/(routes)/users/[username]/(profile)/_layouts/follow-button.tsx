import { ExternalLinkIcon, UserCheckIcon, UserPlusIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../../../components/ui/alert-dialog'
import { Button } from '../../../../../../components/ui/button'
import { getIsFollowing } from '../../../../../actions/api/get/followings'

type FollowButtonProps = {
  myUsername: string
  username: string
}

export const FollowButton: FC<FollowButtonProps> = async ({ username, myUsername }) => {
  const isFollowing = await getIsFollowing(username, myUsername)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button
          className="aspect-square rounded-full px-2 md:aspect-auto md:px-4"
          variant={isFollowing ? 'outline' : 'default'}
        >
          {isFollowing ? <UserCheckIcon /> : <UserPlusIcon />}
          <span className="hidden md:block">{isFollowing ? 'フォロー中' : 'フォローする'}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-128 max-w-[92svw] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{isFollowing ? 'フォローを解除する' : 'フォローする'}</AlertDialogTitle>
          <AlertDialogDescription>
            フォローの操作を行うためには、Annictからの操作が必要です。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>やめる</AlertDialogCancel>
          <AlertDialogAction asChild={true}>
            <Link
              href={`https://annict.com/@${username}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              開く
              <ExternalLinkIcon />
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
