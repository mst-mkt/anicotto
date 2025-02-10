'use client'

import {
  CheckIcon,
  CircleIcon,
  CircleSlashIcon,
  LoaderIcon,
  PauseIcon,
  PlayIcon,
  SquareIcon,
} from 'lucide-react'
import { type FC, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { match } from 'ts-pattern'
import { Separator } from '../../../../../components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../components/ui/tooltip'
import { type Status, statusPicklist } from '../../../../../schemas/annict/common'
import type { Work } from '../../../../../schemas/annict/works'
import { cn } from '../../../../../utils/classnames'
import { updateStatus as updateStatusAction } from './update-status'

type StatusSelectSelectProps = {
  work: Work
  status: Status
}

export const StatusSelect: FC<StatusSelectSelectProps> = ({ work, status }) => {
  const [updatingStatus, setUpdatingStatus] = useState<Status | null>(null)
  const [isUpdating, startTransition] = useTransition()

  const updateStatus = async (status: Status) => {
    const { success } = await updateStatusAction(work.id, status)

    if (success) {
      toast.success(
        <span>
          <b className="font-bold">{work.title}</b> のステータスを更新しました
        </span>,
      )
    } else {
      toast.error(
        <span>
          <b className="font-bold">{work.title}</b> のステータスの更新に失敗しました
        </span>,
      )
    }

    setUpdatingStatus(null)
  }

  const handleClick = async (status: Status) => {
    setUpdatingStatus(status)
    startTransition(() => updateStatus(status))
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="flex w-fit gap-x-0.5 rounded-full border border-muted p-1">
        {statusPicklist.options
          .map((option) =>
            match(option)
              .with('no_select', (value) => ({ value, label: '未選択', icon: CircleSlashIcon }))
              .with('wanna_watch', (value) => ({ value, label: '見たい', icon: CircleIcon }))
              .with('watching', (value) => ({ value, label: '見てる', icon: PlayIcon }))
              .with('watched', (value) => ({ value, label: '見た', icon: CheckIcon }))
              .with('on_hold', (value) => ({ value, label: '一時中断', icon: PauseIcon }))
              .with('stop_watching', (value) => ({ value, label: '視聴中止', icon: SquareIcon }))
              .exhaustive(),
          )
          .map((option) => (
            <Tooltip key={option.value}>
              <TooltipTrigger asChild={true}>
                <button
                  type="button"
                  onClick={() => handleClick(option.value)}
                  disabled={isUpdating}
                  className={cn(
                    'cursor-pointer rounded-full bg-background-100 p-1.5 transition-colors disabled:cursor-not-allowed disabled:text-muted-foreground data-[state=closed]:bg-transparent',
                    option.value === status &&
                      'bg-background-900 text-foreground-900 data-[state=closed]:bg-background-800',
                  )}
                >
                  {updatingStatus === option.value ? (
                    <LoaderIcon size={16} className="animate-spin" />
                  ) : (
                    <option.icon size={16} />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{option.label}</TooltipContent>
            </Tooltip>
          ))}
      </div>
      <Separator orientation="vertical" className="hidden h-1/2 sm:block" />
      <p className="hidden truncate text-muted-foreground text-sm sm:block">
        {match(status)
          .with('no_select', () => '未選択')
          .with('wanna_watch', () => '見たい')
          .with('watching', () => '見てる')
          .with('watched', () => '見た')
          .with('on_hold', () => '一時中断')
          .with('stop_watching', () => '視聴中止')
          .exhaustive()}
      </p>
    </div>
  )
}
