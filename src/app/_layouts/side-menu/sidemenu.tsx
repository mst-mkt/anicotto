import type { FC } from 'react'
import { BookTextIcon } from '../../../components/ui/icons/book-text'
import { HomeIcon } from '../../../components/ui/icons/home'
import { PenToolIcon } from '../../../components/ui/icons/pen-tool'
import { SearchIcon } from '../../../components/ui/icons/search'
import { TelescopeIcon } from '../../../components/ui/icons/telescope'
import { cn } from '../../../utils/classnames'
import { SidemenuLink } from './link'
import { SidemenuProfile } from './profile'

type SidemenuProps = {
  className: string
}

export const Sidemenu: FC<SidemenuProps> = ({ className }) => (
  <aside
    className={cn('flex h-full w-full max-w-64 flex-col justify-between gap-y-4 px-4', className)}
  >
    <ul className="sticky top-16 flex flex-col gap-y-2">
      <SidemenuLink icon={HomeIcon} href="/" label="ホーム" />
      <SidemenuLink icon={SearchIcon} href="/search" label="検索" />
      <SidemenuLink icon={BookTextIcon} href="/library" label="ライブラリ" />
      <SidemenuLink icon={TelescopeIcon} href="/discover" label="探す" />
      <SidemenuLink icon={PenToolIcon} href="/track" label="記録する" />
    </ul>
    <SidemenuProfile />
  </aside>
)
