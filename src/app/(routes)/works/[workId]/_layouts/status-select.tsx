'use client'

import { LoaderIcon } from 'lucide-react'
import { type FC, useCallback, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { StatusIcon } from '../../../../../components/icon/status'
import { Separator } from '../../../../../components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../components/ui/tooltip'
import { STATUS_TEXT } from '../../../../../constants/text/status'
import { useDiscordShare } from '../../../../../hooks/share/useDiscordShare'
import { useShareMisskey } from '../../../../../hooks/share/useMisskeyShare'
import { type Status, statusPicklist } from '../../../../../schemas/annict/common'
import type { Work } from '../../../../../schemas/annict/works'
import { cn } from '../../../../../utils/classnames'
import { updateStatus as updateStatusAction } from '../../../../actions/api/mutate/update-status'
import { shareStatusForDiscord } from '../../../../actions/share/discord'
import { shareStatusForMisskey } from '../../../../actions/share/misskey'

type StatusSelectSelectProps = {
  work: Work
  status: Status
}

export const StatusSelect: FC<StatusSelectSelectProps> = ({ work, status }) => {
  const [updatingStatus, setUpdatingStatus] = useState<Status | null>(null)
  const [isUpdating, startTransition] = useTransition()
  const { shareMisskey, statusMisskeyConfig } = useShareMisskey()
  const { shareDiscord, discordConfig } = useDiscordShare()

  const updateStatus = useCallback(
    async (status: Status) => {
      const result = await updateStatusAction(work.id, status)
      setUpdatingStatus(null)

      if (!result.success) {
        toast.error(
          <span>
            <b className="font-bold">{work.title}</b> のステータスの更新に失敗しました
          </span>,
        )
        return
      }

      toast.success(
        <span>
          <b className="font-bold">{work.title}</b> のステータスを更新しました
        </span>,
      )

      if (shareMisskey) {
        const result = await shareStatusForMisskey(work.id, status, statusMisskeyConfig)

        if (!result.success) {
          toast.error(`Misskeyへの共有に失敗しました: ${result.error}`)
        }
      }

      if (shareDiscord) {
        const result = await shareStatusForDiscord(work.id, status, discordConfig)

        if (!result.success) {
          toast.error(`Discordへの共有に失敗しました: ${result.error}`)
        }
      }
    },
    [work, shareDiscord, shareMisskey, statusMisskeyConfig, discordConfig],
  )

  const handleClick = useCallback(
    async (status: Status) => {
      setUpdatingStatus(status)
      startTransition(() => updateStatus(status))
    },
    [updateStatus],
  )

  return (
    <div className="flex items-center gap-x-2">
      <div className="flex w-fit gap-x-0.5 rounded-full border border-muted p-1">
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
      <Separator orientation="vertical" className="hidden h-1/2 sm:block" />
      <p className="hidden truncate text-muted-foreground text-sm sm:block">
        {STATUS_TEXT(status)}
      </p>
    </div>
  )
}
