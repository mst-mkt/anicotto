'use client'

import Link from 'next/link'
import { type FC, useCallback, useRef } from 'react'
import type { PqoqubbwIcon, PqoqubbwIconHandle } from '../../../components/icons/types'

export type SideMenuItemProps = {
  icon: PqoqubbwIcon
  href: string
  label: string
}

export const SideMenuItem: FC<SideMenuItemProps> = (props) => {
  const iconRef = useRef<PqoqubbwIconHandle>(null)

  const handleMouseEnter = useCallback(() => {
    iconRef.current?.startAnimation()
  }, [])

  const handleMouseLeave = useCallback(() => {
    iconRef.current?.stopAnimation()
  }, [])

  return (
    <li
      key={props.href}
      className="rounded-lg transition-colors hover:bg-background-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={props.href} className="flex items-center gap-x-4 px-4 py-3">
        <props.icon className="shrink-0 grow-0 text-foreground" size={20} ref={iconRef} />
        <span className="shrink grow">{props.label}</span>
      </Link>
    </li>
  )
}
