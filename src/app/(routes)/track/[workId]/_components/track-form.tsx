'use client'

import type { CheckedState } from '@radix-ui/react-checkbox'
import { LoaderIcon, PenToolIcon } from 'lucide-react'
import { type FC, useCallback, useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Badge } from '../../../../../components/ui/badge'
import { Button } from '../../../../../components/ui/button'
import { Checkbox } from '../../../../../components/ui/checkbox'
import { Label } from '../../../../../components/ui/label'
import { useDiscordShare } from '../../../../../hooks/share/useDiscordShare'
import { useShareMisskey } from '../../../../../hooks/share/useMisskeyShare'
import type { LibraryWithEpisodes } from '../../../../actions/api/get/libraries'
import { createMultipleRecords } from '../../../../actions/api/mutate/create-multiple-records'
import {
  shareMultipleRecordsForDiscord,
  shareRecordForDiscord,
} from '../../../../actions/share/discord'
import {
  shareMultipleRecordsForMisskey,
  shareRecordForMisskey,
} from '../../../../actions/share/misskey'

type TrackFormProps = {
  episodes: LibraryWithEpisodes['work']['episodes']
}

export const TrackForm: FC<TrackFormProps> = ({ episodes }) => {
  const displayEpisodes = useMemo(() => episodes.slice(0, 64), [episodes])
  const [selected, setSelected] = useState(displayEpisodes.map(({ id }) => `${id}`))
  const [isPending, startTransition] = useTransition()
  const { shareMisskey, multipleRecordsMisskeyConfig, recordMisskeyConfig } = useShareMisskey()
  const { shareDiscord, discordConfig } = useDiscordShare()

  const currentAllCheckedState = useMemo(() => {
    if (selected.length === 0) return false
    if (selected.length === displayEpisodes.length) return true
    return 'indeterminate'
  }, [selected, displayEpisodes])

  const handleAllCheckedChange = () => {
    if (currentAllCheckedState === true) {
      setSelected([])
    } else {
      const allIds = displayEpisodes.map(({ id }) => `${id}`)
      setSelected(allIds)
    }
  }

  const handleCheckedChange = useCallback((checked: CheckedState, id: string) => {
    if (checked) {
      setSelected((prev) => [...prev, id].toSorted())
    } else {
      setSelected((prev) => prev.filter((prevId) => prevId !== id))
    }
  }, [])

  const createRecords = async () => {
    const ids = selected.map((id) => Number.parseInt(id, 10))
    const result = await createMultipleRecords(ids)

    if (!result.success) {
      toast.error(`記録に失敗しました: ${result.error}`)
      return
    }

    toast.success('記録しました')

    if (shareMisskey) {
      const result = await (() => {
        if (ids.length === 1) return shareRecordForMisskey(ids[0], recordMisskeyConfig)

        return shareMultipleRecordsForMisskey(ids, multipleRecordsMisskeyConfig)
      })()

      if (!result.success) {
        toast.error(`Misskeyへの共有に失敗しました: ${result.error}`)
      }
    }

    if (shareDiscord) {
      const result = await (() => {
        if (ids.length === 1) return shareRecordForDiscord(ids[0], discordConfig)
        return shareMultipleRecordsForDiscord(ids, discordConfig)
      })()

      if (!result.success) {
        toast.error(`Discordへの共有に失敗しました: ${result.error}`)
      }
    }
  }

  const handleSubmit = () => {
    if (selected.length > 64) {
      return toast.error('選択したエピソードが多すぎます。100話以下にしてください')
    }
    startTransition(() => createRecords())
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      <Label className="flex cursor-pointer items-center gap-x-2 px-4">
        <Checkbox checked={currentAllCheckedState} onCheckedChange={handleAllCheckedChange} />
        <span className="font-bold">未記録エピソード 全{episodes.length}話</span>
      </Label>
      <div className="flex flex-col gap-y-2 rounded-md border border-muted p-4">
        {displayEpisodes.slice(0, 100).map((episode) => (
          <Label className="flex cursor-pointer items-center gap-x-2" key={episode.id}>
            <Checkbox
              checked={selected.includes(`${episode.id}`)}
              onCheckedChange={(checked) => handleCheckedChange(checked, `${episode.id}`)}
            />
            <Badge className="break-keep">{episode.number_text}</Badge>
            {episode.title === null ? (
              <span className="min-w-0 shrink text-muted-foreground">タイトル不明</span>
            ) : (
              <span className="min-w-0 shrink truncate">{episode.title}</span>
            )}
          </Label>
        ))}
        {episodes.length > 64 && (
          <span className="text-muted-foreground text-sm">
            あと{episodes.length - 64}話のエピソードがあります
          </span>
        )}
      </div>
      <Button
        className="sticky bottom-24 cursor-pointer md:bottom-4"
        disabled={selected.length === 0 || isPending}
        onClick={handleSubmit}
      >
        {isPending ? <LoaderIcon className="animate-spin" /> : <PenToolIcon />}
        記録する
      </Button>
    </div>
  )
}
