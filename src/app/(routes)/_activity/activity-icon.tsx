import {
  type LucideProps,
  MessageCircleHeartIcon,
  MonitorCheckIcon,
  PenToolIcon,
} from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import type { Action } from '../../../schemas/annict/common'

type ActivityIcon = LucideProps & {
  action: Action
}

export const ActivityIcon: FC<ActivityIcon> = ({ action, ...props }) => {
  return match(action)
    .with('create_record', () => <PenToolIcon {...props} />)
    .with('create_multiple_records', () => <PenToolIcon {...props} />)
    .with('create_review', () => <MessageCircleHeartIcon {...props} />)
    .with('create_status', () => <MonitorCheckIcon {...props} />)
    .exhaustive()
}
