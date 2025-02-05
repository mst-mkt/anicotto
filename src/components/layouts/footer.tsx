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
import { EarthIcon } from '../icons/earth'
import { GithubIcon } from '../icons/github'
import { HomeIcon } from '../icons/home'
import { FooterLink, type FooterLinkProps } from './footer-link'

const getLinkIcon = (href: string) => {
  return match(href)
    .returnType<FooterLinkProps>()
    .when(
      (href) => href.startsWith('https://github.com/'),
      (href) => ({ icon: GithubIcon, label: 'GitHub', href }),
    )
    .when(
      (href) => href.startsWith('https://annict.com/'),
      (href) => ({ icon: HomeIcon, label: 'Annict', href }),
    )
    .otherwise((href) => ({ icon: EarthIcon, label: href, href }))
}

type FooterProps = {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className }) => (
  <footer
    className={twJoin(
      className,
      'mx-auto flex w-full min-w-[56svw] max-w-[600px] flex-col gap-y-4 px-[4svmin] py-4',
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
    <div className="flex gap-x-6">
      {PROJECT_LINKS.map(getLinkIcon).map((link) => (
        <FooterLink key={link.href} {...link} />
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
