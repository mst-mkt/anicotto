import { IconBrandGithub, IconDeviceTv, IconWorld, type TablerIcon } from '@tabler/icons-react'
import Link from 'next/link'
import type { FC } from 'react'
import { twJoin } from 'tailwind-merge'
import { match } from 'ts-pattern'
import {
  PROJECT_DESCRIPTION,
  PROJECT_LINKS,
  PROJECT_NAME,
  PROJECT_OWNER,
} from '../../constants/project'

type UrlInfo = {
  icon: TablerIcon
  label: string
  url: string
}

const getLinkIcon = (url: string) => {
  return match(url)
    .returnType<UrlInfo>()
    .when(
      (url) => url.startsWith('https://github.com/'),
      (url) => ({ icon: IconBrandGithub, label: 'GitHub', url }),
    )
    .when(
      (url) => url.startsWith('https://annict.com/'),
      (url) => ({ icon: IconDeviceTv, label: 'Annict', url }),
    )
    .otherwise((url) => ({ icon: IconWorld, label: url, url }))
}

type FooterProps = {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className }) => (
  <footer
    className={twJoin(
      className,
      'mx-auto flex w-full min-w-[56svw] max-w-[600px] flex-col gap-y-4 py-4',
    )}
  >
    <div className="flex gap-x-1">
      {[...Array(3)].map((_, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static array
          key={index}
          className="block h-3 w-2 bg-accent"
          style={{
            clipPath: 'polygon(50% 0, 100% 0, 50% 100%, 0 100%)',
          }}
        />
      ))}
    </div>
    <hgroup>
      <h2 className="font-bold text-xl">{PROJECT_NAME}</h2>
      <p className="text-foreground-300 text-sm">{PROJECT_DESCRIPTION}</p>
    </hgroup>
    <div className="flex gap-x-4">
      {PROJECT_LINKS.map(getLinkIcon).map((link) => (
        <Link
          key={link.url}
          href={link.url}
          className="flex items-center gap-x-2 transition-colors hover:text-accent"
        >
          <link.icon size={20} />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
    <p className="flex gap-x-2 text-foreground-300 text-sm">
      &copy; {new Date().getFullYear()}
      <Link href={`https://github.com/${PROJECT_OWNER}`} className="hover:underline">
        {PROJECT_OWNER}
      </Link>
    </p>
  </footer>
)
