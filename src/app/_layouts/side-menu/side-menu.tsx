import { type FC, Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import { HomeIcon } from '../../../components/icons/home'
import { PenToolIcon } from '../../../components/icons/pen-tool'
import { SearchIcon } from '../../../components/icons/search'
import { TelescopeIcon } from '../../../components/icons/telescope'
import { auth } from '../../../lib/auth'
import { SideMenuItem, type SideMenuItemProps } from './side-menu-item'
import { SideProfile, SideProfileSkeleton } from './side-profile'

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

export const SideMenu: FC<SideMenuProps> = async ({ className }) => {
  const session = await auth()

  return (
    <aside
      className={twMerge(
        'flex h-full w-full max-w-64 flex-col justify-between gap-y-4 px-4',
        className,
      )}
    >
      <ul className="sticky top-16 flex flex-col gap-y-4">
        {items.map((item) => (
          <SideMenuItem key={item.href} {...item} />
        ))}
      </ul>
      {session !== null && (
        <Suspense fallback={<SideProfileSkeleton />}>{<SideProfile />}</Suspense>
      )}
    </aside>
  )
}
