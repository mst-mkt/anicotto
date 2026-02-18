'use client'

import { LoaderIcon } from 'lucide-react'
import { type FC, useCallback, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateStatus as updateStatusAction } from '../../../app/actions/api/mutate/update-status'
import { STATUS_TEXT } from '../../../constants/text/status'
import { type Status, statusPicklist } from '../../../schemas/annict/common'
import type { Work } from '../../../schemas/annict/works'
import { cn } from '../../../utils/classnames'
import { StatusIcon } from '../../icon/status'
import { Tooltip, TooltipContent, TooltipTrigger } from '../..//ui/tooltip'

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
    (status: Status) => {
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
              className={cn(
                'cursor-pointer rounded-full bg-background-100 p-1.5 transition-colors disabled:cursor-not-allowed disabled:text-muted-foreground data-[state=closed]:bg-transparent',
                option === status &&
                  'bg-background-900 text-foreground-900 data-[state=closed]:bg-background-800',
              )}
              disabled={isUpdating}
              onClick={() => handleClick(option)}
              type="button"
            >
              {updatingStatus === option ? (
                <LoaderIcon className="animate-spin" size={16} />
              ) : (
                <StatusIcon size={16} status={option} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>{STATUS_TEXT(option)}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export const StatusSelectSkeleton = () => (
  <div className="mx-auto flex w-fit gap-x-0.5 rounded-full border border-muted p-1 relative overflow-hidden">
    {statusPicklist.options.map((option) => (
      <div key={option} className="rounded-full p-1.5">
        <StatusIcon size={16} status={option} />
      </div>
    ))}
    <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center bg-background/80">
      <LoaderIcon className="animate-spin" size={16} />
    </div>
  </div>
)
