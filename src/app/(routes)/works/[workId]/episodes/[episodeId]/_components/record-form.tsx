'use client'

import { CheckIcon, PenToolIcon } from 'lucide-react'
import type { FC } from 'react'
import { toast } from 'sonner'
import { safeParse } from 'valibot'
import {} from '../../../../../../../components/ui/alert-dialog'
import { Badge } from '../../../../../../../components/ui/badge'
import { Label } from '../../../../../../../components/ui/label'
import { Textarea } from '../../../../../../../components/ui/textarea'
import { ratingPicklist } from '../../../../../../../schemas/annict/common'
import { createRecord } from '../../../../../../actions/api/create-record'
import type { Episode } from '../get-episode'
import { RatingSelect } from './rating-select'
import { RecordSubmitButton } from './record-submit-button'

type RecordFormProps = {
  episodeId: Episode['id']
  tracked: boolean
}

export const RecordForm: FC<RecordFormProps> = ({ episodeId, tracked }) => {
  const handleSubmit = async (formData: FormData) => {
    const comment = formData.get('comment')?.toString()
    const ratingString = formData.get('rating')?.toString()

    const ratingResult = safeParse(ratingPicklist, ratingString)

    const { success, data, error } = await createRecord(
      episodeId,
      comment,
      ratingResult.success ? ratingResult.output : undefined,
    )

    if (success) {
      toast.success(`${data.work.title} ${data.episode.number_text} のエピソードを記録しました`)
    } else {
      toast.error(`記録の作成に失敗しました: ${error}`)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-y-4 rounded-lg bg-muted p-4">
      <h2 className="flex items-center gap-x-2 py-1">
        <PenToolIcon size={20} className="text-anicotto-accent" />
        <span className="grow font-bold text-sm">記録する</span>
        {tracked && (
          <Badge className="!border-anicotto-accent-100 gap-x-1 bg-anicotto-accent-50 text-anicotto-accent hover:bg-anicotto-accent-50">
            <CheckIcon size={16} />
            記録済み
          </Badge>
        )}
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Label className="row-span-2 flex flex-col gap-y-2">
          <span>感想</span>
          <Textarea name="comment" placeholder="感想を入力" className="h-full" />
        </Label>
        <RatingSelect />
        <RecordSubmitButton />
      </div>
    </form>
  )
}
