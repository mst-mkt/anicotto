import { ExternalLinkIcon, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'

type LinkItemProps = {
  icon: LucideIcon
  href: string
  children: ReactNode
}

export const LinkItem: FC<LinkItemProps> = ({ icon: Icon, href, children }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-x-2 rounded-lg bg-muted px-4 py-3 transition-[filter] hover:brightness-95 "
  >
    <Icon size={20} className="text-anicotto-accent" />
    <span className="flex grow items-center text-sm">{children}</span>
    <ExternalLinkIcon size={16} className="text-muted-foreground" />
  </Link>
)
