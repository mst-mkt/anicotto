import { EllipsisIcon, ExternalLinkIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { annictApiClient } from '../../../lib/api/client'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown'
import { Skeleton } from '../../ui/skeleton'
import { SideProfileLogout } from './side-profile-logout'

export const SideProfile = async () => {
  const profile = await annictApiClient.getMe({})

  if (profile.isErr()) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <div className="sticky bottom-8 mt-auto flex cursor-pointer items-center justify-between gap-x-2 rounded-full p-2 transition-colors hover:bg-background-50">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={profile.value.avatar_url} alt={profile.value.name} loading="lazy" />
            <AvatarFallback className="bg-anicotto-accent-300 text-white">
              {profile.value.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full shrink grow flex-col gap-y-1">
            <p className="truncate text-sm">{profile.value.name}</p>
            <p className="truncate text-foreground-300 text-xs">@{profile.value.username}</p>
          </div>
          <div className="shrink-0 p-4">
            <EllipsisIcon size={16} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>アカウント</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild={true}>
            <Link href="/profile">
              <UserCircleIcon />
              <span>プロフィール</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild={true}>
            <Link href={`https://annict.com/@${profile.value.username}`}>
              <ExternalLinkIcon />
              <span>Annict プロフィール</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SideProfileLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const SideProfileSkeleton = () => (
  <div className="sticky bottom-8 mt-auto flex cursor-pointer items-center justify-between gap-x-2 rounded-md p-2">
    <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
    <div className="flex w-full shrink grow flex-col gap-y-1">
      <Skeleton className="h-[1lh] w-24" />
      <Skeleton className="h-[1lh] w-16 text-sm" />
    </div>
  </div>
)
