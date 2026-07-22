import { ExternalLinkIcon, type LucideIcon } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'

type LinkItemProps = {
  icon: LucideIcon
  href: Route
  children: ReactNode
}

export const LinkItem: FC<LinkItemProps> = ({ icon: Icon, href, children }) => (
  <Link
    className="flex items-center gap-x-2 rounded-lg bg-muted px-4 py-3 transition-[filter] hover:brightness-95"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    <Icon className="text-anicotto-accent" size={20} />
    <span className="flex grow items-center text-sm">{children}</span>
    <ExternalLinkIcon className="text-muted-foreground" size={16} />
  </Link>
)
