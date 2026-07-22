import Link from 'next/link'
import type { FC } from 'react'
import { twJoin } from 'tailwind-merge'
import { GithubIcon } from '../../../components/ui/icons/github'
import { HomeIcon } from '../../../components/ui/icons/home'
import {
  PROJECT_DESCRIPTION,
  PROJECT_LINKS,
  PROJECT_NAME,
  PROJECT_OWNER,
} from '../../../constants/project'
import { FooterLink } from './link'

type FooterProps = {
  className: string
}

export const Footer: FC<FooterProps> = ({ className }) => (
  <footer className={twJoin(className, 'flex w-full flex-col gap-y-4 pt-24 pb-4')}>
    <div className="flex gap-x-1">
      {[...Array(3)].map((_, index) => (
        <span
          className="block h-3 w-2 bg-anicotto-accent"
          // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
          key={index}
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
      <FooterLink href={PROJECT_LINKS.github} icon={GithubIcon} label="GitHub" />
      <FooterLink href={PROJECT_LINKS.annict} icon={HomeIcon} label="Annict" />
    </div>
    <p className="flex gap-x-2 text-foreground-300 text-sm">
      &copy; {new Date().getFullYear()}
      <Link className="hover:underline" href={`https://github.com/${PROJECT_OWNER}`}>
        {PROJECT_OWNER}
      </Link>
    </p>
  </footer>
)
