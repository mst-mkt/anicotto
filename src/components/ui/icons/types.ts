import type { LucideIcon } from 'lucide-react'
import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

export type PqoqubbwIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

export type PqoqubbwIconProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export type PqoqubbwIcon = ForwardRefExoticComponent<
  PqoqubbwIconProps & RefAttributes<PqoqubbwIconHandle>
>

export type Icon = PqoqubbwIcon | LucideIcon
