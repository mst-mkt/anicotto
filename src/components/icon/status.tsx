import {
  CheckIcon,
  CircleIcon,
  CircleSlashIcon,
  type LucideProps,
  PauseIcon,
  PlayIcon,
  SquareIcon,
} from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import type { Status } from '../../schemas/annict/common'

type StatusIconProps = {
  status: Status
} & LucideProps

export const StatusIcon: FC<StatusIconProps> = ({ status, ...props }) => {
  return match(status)
    .with('no_select', () => <CircleSlashIcon {...props} />)
    .with('wanna_watch', () => <CircleIcon {...props} />)
    .with('watching', () => <PlayIcon {...props} />)
    .with('watched', () => <CheckIcon {...props} />)
    .with('on_hold', () => <PauseIcon {...props} />)
    .with('stop_watching', () => <SquareIcon {...props} />)
    .exhaustive()
}
