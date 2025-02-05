import {
  IconHome,
  IconPencil,
  IconSearch,
  IconTelescope,
  type TablerIcon,
} from '@tabler/icons-react'
import Link from 'next/link'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'

const items = [
  {
    icon: IconHome,
    href: '/',
    label: 'ホーム',
  },
  {
    icon: IconTelescope,
    href: '/discover',
    label: '探す',
  },
  {
    icon: IconSearch,
    href: '/search',
    label: '検索',
  },
  {
    icon: IconPencil,
    href: '/track',
    label: '記録する',
  },
] satisfies { icon: TablerIcon; href: string; label: string }[]

type SideMenuProps = {
  className?: string
}

export const SideMenu: FC<SideMenuProps> = ({ className }) => (
  <aside
    className={twMerge('sticky top-16 flex h-fit w-full max-w-64 flex-col gap-y-4 p-4', className)}
  >
    <ul className="contents">
      {items.map((item) => (
        <li key={item.href} className="rounded-lg transition-colors hover:bg-background-50">
          <Link href={item.href} className="flex items-center gap-x-4 px-4 py-3">
            <item.icon className="shrink-0 grow-0 text-foreground" />
            <span className="shrink grow">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
)
