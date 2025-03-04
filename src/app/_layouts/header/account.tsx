import { ExternalLinkIcon, SettingsIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../components/ui/drawer'
import {} from '../../../components/ui/dropdown'
import { Separator } from '../../../components/ui/separator'
import { annictApiClient } from '../../../lib/api/annict-rest/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import { LogOutButton } from './logout-button'

export const HeaderAccount = async () => {
  await auth()
  const me = await annictApiClient.getMe({}, { next: { tags: [CACHE_TAGS.ME] } })

  if (me.isErr()) return null

  return (
    <Drawer>
      <DrawerTrigger className="flex cursor-pointer md:hidden">
        <Avatar className="h-8 w-8">
          <AvatarImage src={me.value.avatar_url} />
          <AvatarFallback className="text-xs">{me.value.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent className="[@media(display-mode:standalone)]:pb-4">
        <DrawerHeader>
          <DrawerTitle>アカウント</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-y-2 p-[4svw]">
          <DrawerClose asChild={true}>
            <Link
              href={`/users/${me.value.username}`}
              className="flex items-center gap-x-2 rounded-md p-2 transition-colors active:bg-muted"
            >
              <UserCircleIcon size={20} />
              プロフィール
            </Link>
          </DrawerClose>
          <DrawerClose asChild={true}>
            <Link
              href={`https://annict.com/@${me.value.username}`}
              className="flex items-center gap-x-2 rounded-md p-2 transition-colors active:bg-muted"
            >
              <ExternalLinkIcon size={20} />
              Annict プロフィール
            </Link>
          </DrawerClose>
          <Separator />
          <DrawerClose asChild={true}>
            <Link
              href="/settings"
              className="flex items-center gap-x-2 rounded-md p-2 transition-colors active:bg-muted"
            >
              <SettingsIcon size={20} />
              設定
            </Link>
          </DrawerClose>
          <Separator />
          <DrawerClose asChild={true}>
            <LogOutButton />
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
