import type { FC } from 'react'
import { STATUS_TEXT } from '../../constants/text/status'
import type { Status } from '../../schemas/annict/common'
import { cn } from '../../utils/classnames'
import { StatusIcon } from '../icon/status'
import { Badge, type BadgeProps } from '../ui/badge'

type StatusBadgeProps = {
  status: Status
} & BadgeProps

export const StatusBadge: FC<StatusBadgeProps> = ({ status, ...props }) => (
  <Badge
    {...props}
    className={cn(
      'w-fit shrink-0 grow-0 cursor-default gap-x-1 break-keep px-2 py-1',
      status === 'watching' &&
        '!border-anicotto-status-watching/16 bg-anicotto-status-watching-pale/16 text-anicotto-status-watching hover:bg-anicotto-status-watching-pale/24',
      status === 'watched' &&
        '!border-anicotto-status-watched/16 bg-anicotto-status-watched-pale/16 text-anicotto-status-watched hover:bg-anicotto-status-watched-pale/24',
      status === 'on_hold' &&
        '!border-anicotto-status-on_hold/16 bg-anicotto-status-on_hold-pale/16 text-anicotto-status-on_hold hover:bg-anicotto-status-on_hold-pale/24',
      status === 'stop_watching' &&
        '!border-anicotto-status-stop_watching/16 bg-anicotto-status-stop_watching-pale/16 text-anicotto-status-stop_watching hover:bg-anicotto-status-stop_watching-pale/24',
      status === 'wanna_watch' &&
        '!border-anicotto-status-wanna_watch/16 bg-anicotto-status-wanna_watch-pale/16 text-anicotto-status-wanna_watch hover:bg-anicotto-status-wanna_watch-pale/24',
      props.className,
    )}
  >
    <StatusIcon status={status} size={16} />
    {STATUS_TEXT(status)}
  </Badge>
)
