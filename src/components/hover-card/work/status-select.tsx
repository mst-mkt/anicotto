'use client'

import { LoaderIcon } from 'lucide-react'
import { type FC, useCallback, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateStatus as updateStatusAction } from '../../../app/actions/api/update-status'
import { STATUS_TEXT } from '../../../constants/text/status'
import { type Status, statusPicklist } from '../../../schemas/annict/common'
import type { Work } from '../../../schemas/annict/works'
import { cn } from '../../../utils/classnames'
import { Tooltip, TooltipContent, TooltipTrigger } from '../..//ui/tooltip'
import { StatusIcon } from '../../icon/status'

type StatusSelectSelectProps = {
  id: Work['id']
  title: Work['title']
  status: Status
}

export const StatusSelect: FC<StatusSelectSelectProps> = ({ id, title, status }) => {
  const [updatingStatus, setUpdatingStatus] = useState<Status | null>(null)
  const [isUpdating, startTransition] = useTransition()
  // const { shareStatus: shareMisskey } = useShareMisskey()
  // const { shareStatus: shareDiscord } = useDiscordShare()

  const updateStatus = useCallback(
    async (status: Status) => {
      const result = await updateStatusAction(id, status)

      if (result.success) {
        toast.success(
          <span>
            <b className="font-bold">{title}</b> のステータスを更新しました
          </span>,
        )
        // shareMisskey(work, status)
        // shareDiscord(work, status)
      } else {
        toast.error(
          <span>
            <b className="font-bold">{title}</b> のステータスの更新に失敗しました
          </span>,
        )
      }

      setUpdatingStatus(null)
    },
    [id, title],
  )

  const handleClick = useCallback(
    async (status: Status) => {
      setUpdatingStatus(status)
      startTransition(() => updateStatus(status))
    },
    [updateStatus],
  )

  return (
    <div className="mx-auto flex w-fit gap-x-0.5 rounded-full border border-muted p-1">
      {statusPicklist.options.map((option) => (
        <Tooltip key={option}>
          <TooltipTrigger asChild={true}>
            <button
              type="button"
              onClick={() => handleClick(option)}
              disabled={isUpdating}
              className={cn(
                'cursor-pointer rounded-full bg-background-100 p-1.5 transition-colors disabled:cursor-not-allowed disabled:text-muted-foreground data-[state=closed]:bg-transparent',
                option === status &&
                  'bg-background-900 text-foreground-900 data-[state=closed]:bg-background-800',
              )}
            >
              {updatingStatus === option ? (
                <LoaderIcon size={16} className="animate-spin" />
              ) : (
                <StatusIcon status={option} size={16} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>{STATUS_TEXT(option)}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
