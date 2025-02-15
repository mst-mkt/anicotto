'use client'

import Link from 'next/link'
import { type FC, useCallback, useRef } from 'react'
import type { PqoqubbwIcon, PqoqubbwIconHandle } from '../../../../components/icons/types'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../components/ui/tooltip'

type SidemenuLinkItemProps = {
  icon: PqoqubbwIcon
  href: string
  label: string
}

export const SidemenuLinkItem: FC<SidemenuLinkItemProps> = (props) => {
  const iconRef = useRef<PqoqubbwIconHandle>(null)

  const handleMouseEnter = useCallback(() => {
    iconRef.current?.startAnimation()
  }, [])

  const handleMouseLeave = useCallback(() => {
    iconRef.current?.stopAnimation()
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <li
          className="w-fit rounded-lg transition-colors hover:bg-background-50 lg:w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={props.href} className="flex items-center gap-x-4 p-4">
            <props.icon className="shrink-0 grow-0 text-foreground" size={20} ref={iconRef} />
            <span className="hidden shrink grow lg:block">{props.label}</span>
          </Link>
        </li>
      </TooltipTrigger>
      <TooltipContent side="right" className="block lg:hidden">
        {props.label}
      </TooltipContent>
    </Tooltip>
  )
}
