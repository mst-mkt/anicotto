import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { HomeIcon } from '../icons/home'
import { PenToolIcon } from '../icons/pen-tool'
import { SearchIcon } from '../icons/search'
import { TelescopeIcon } from '../icons/telescope'
import type {} from '../icons/types'
import { SideMenuItem, type SideMenuItemProps } from './side-menu-item'

const items = [
  {
    icon: HomeIcon,
    href: '/',
    label: 'ホーム',
  },
  {
    icon: TelescopeIcon,
    href: '/discover',
    label: '探す',
  },
  {
    icon: SearchIcon,
    href: '/search',
    label: '検索',
  },
  {
    icon: PenToolIcon,
    href: '/track',
    label: '記録する',
  },
] satisfies SideMenuItemProps[]

type SideMenuProps = {
  className?: string
}

export const SideMenu: FC<SideMenuProps> = ({ className }) => (
  <aside
    className={twMerge('sticky top-16 flex h-fit w-full max-w-64 flex-col gap-y-4 p-4', className)}
  >
    <ul className="contents">
      {items.map((item) => (
        <SideMenuItem key={item.href} {...item} />
      ))}
    </ul>
  </aside>
)
