import {
  type LucideProps,
  MessageCircleHeartIcon,
  MonitorCheckIcon,
  PenToolIcon,
} from 'lucide-react'
import type { FC } from 'react'
import { match, P } from 'ts-pattern'
import type { Action } from '../../schemas/annict/common'

type ActionIconProps = {
  action: Action
} & LucideProps

export const ActionIcon: FC<ActionIconProps> = ({ action, ...props }) => {
  return match(action)
    .with(P.union('create_record', 'create_multiple_records'), () => <PenToolIcon {...props} />)
    .with('create_review', () => <MessageCircleHeartIcon {...props} />)
    .with('create_status', () => <MonitorCheckIcon {...props} />)
    .exhaustive()
}
