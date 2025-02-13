'use client'

import Link from 'next/link'
import { type FC, useRef } from 'react'
import type { PqoqubbwIcon, PqoqubbwIconHandle } from '../../components/icons/types'

export type FooterLinkProps = {
  icon: PqoqubbwIcon
  href: string
  label: string
}

export const FooterLink: FC<FooterLinkProps> = (props) => {
  const iconRef = useRef<PqoqubbwIconHandle>(null)

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation()
  }

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation()
  }

  return (
    <Link
      href={props.href}
      className="flex items-center gap-x-2 transition-colors hover:text-anicotto-accent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <props.icon size={20} ref={iconRef} />
      <span>{props.label}</span>
    </Link>
  )
}
