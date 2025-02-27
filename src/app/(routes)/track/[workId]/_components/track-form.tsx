'use client'

import type { CheckedState } from '@radix-ui/react-checkbox'
import { LoaderIcon, PenToolIcon } from 'lucide-react'
import { type FC, useCallback, useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Badge } from '../../../../../components/ui/badge'
import { Button } from '../../../../../components/ui/button'
import { Checkbox } from '../../../../../components/ui/checkbox'
import { Label } from '../../../../../components/ui/label'
import { useShareMisskey } from '../../../../../hooks/share/useMisskeyShare'
import { createMultipleRecords } from '../../../../actions/api/create-multiple-records'
import type { Library } from '../get-libraries'

type TrackFormProps = {
  episodes: Library['work']['episodes']
}

export const TrackForm: FC<TrackFormProps> = ({ episodes }) => {
  const displayEpisodes = useMemo(() => episodes.slice(0, 64), [episodes])
  const [selected, setSelected] = useState(displayEpisodes.map(({ id }) => `${id}`))
  const [isPending, startTransition] = useTransition()
  const { shareRecord, shareMultipleRecords } = useShareMisskey()

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

  const handleCheckedChange = useCallback(async (checked: CheckedState, id: string) => {
    if (checked) {
      setSelected((prev) => [...prev, id].toSorted())
    } else {
      setSelected((prev) => prev.filter((prevId) => prevId !== id))
    }
  }, [])

  const createRecords = async () => {
    const ids = selected.map((id) => Number.parseInt(id, 10))
    const result = await createMultipleRecords(ids)

    if (result.success) {
      toast.success('記録しました')

      if (result.data.length === 1) {
        const data = result.data[0]
        shareRecord({ ...data.episode, work: data.work, next_episode: null, prev_episode: null })
      } else {
        const length = result.data.length
        const from = result.data[0].episode
        const to = result.data[result.data.length - 1].episode
        const work = result.data[0].work
        shareMultipleRecords(length, { from, to }, work)
      }
    } else {
      toast.error(`記録に失敗しました: ${result.error}`)
    }
  }

  const handleSubmit = async () => {
    if (selected.length > 64) {
      return toast.error('選択したエピソードが多すぎます。100話以下にしてください')
    }
    startTransition(() => createRecords())
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      <Label className="flex cursor-pointer items-center gap-x-2 px-4">
        <Checkbox onCheckedChange={handleAllCheckedChange} checked={currentAllCheckedState} />
        <span className="font-bold">未記録エピソード 全{episodes.length}話</span>
      </Label>
      <div className="flex flex-col gap-y-2 rounded-md border border-muted p-4">
        {displayEpisodes.slice(0, 100).map((episode) => (
          <Label key={episode.id} className="flex cursor-pointer items-center gap-x-2">
            <Checkbox
              onCheckedChange={(checked) => handleCheckedChange(checked, `${episode.id}`)}
              checked={selected.includes(`${episode.id}`)}
            />
            <Badge className="break-keep">{episode.numberText}</Badge>
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
        disabled={selected.length === 0 || isPending}
        className="sticky bottom-24 cursor-pointer md:bottom-4"
        onClick={handleSubmit}
      >
        {isPending ? <LoaderIcon className="animate-spin" /> : <PenToolIcon />}
        記録する
      </Button>
    </div>
  )
}
