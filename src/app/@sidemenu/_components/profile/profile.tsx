import { EllipsisIcon, ExternalLinkIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown'
import { Skeleton } from '../../../../components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../components/ui/tooltip'
import { getMe } from '../../get-me'
import { SideProfileLogout } from './logout'

export const SideProfile = async () => {
  const profile = await getMe()

  if (profile === null) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="sticky bottom-8 mt-auto ">
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div className="flex w-fit cursor-pointer items-center justify-between gap-x-2 rounded-full p-2 transition-colors hover:bg-background-50 lg:w-full">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarImage src={profile.avatar_url} alt={profile.name} loading="lazy" />
                <AvatarFallback className="bg-anicotto-accent-300 text-white">
                  {profile.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden w-full shrink grow flex-col gap-y-1 lg:flex">
                <p className="truncate text-sm">{profile.name}</p>
                <p className="truncate text-foreground-300 text-xs">@{profile.username}</p>
              </div>
              <div className="hidden shrink-0 p-4 lg:block">
                <EllipsisIcon size={16} />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="block lg:hidden">
            {profile.name}
          </TooltipContent>
        </Tooltip>
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
            <Link href={`https://annict.com/@${profile.username}`}>
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
    <div className="hidden w-full shrink grow flex-col gap-y-1 lg:flex">
      <Skeleton className="h-[1lh] w-24" />
      <Skeleton className="h-[1lh] w-16 text-sm" />
    </div>
  </div>
)
