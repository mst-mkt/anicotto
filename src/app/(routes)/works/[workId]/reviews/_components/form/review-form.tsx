'use client'

import { LoaderIcon, SendIcon } from 'lucide-react'
import { type FC, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '../../../../../../../components/ui/button'
import { Label } from '../../../../../../../components/ui/label'
import { Textarea } from '../../../../../../../components/ui/textarea'
import type { Work } from '../../../../../../../schemas/annict/works'
import { createReview } from '../../../../../../actions/api/create-review'
import { RatingSelect } from './rating-select'

type ReviewFormProps = {
  workId: Work['id']
}

export const ReviewForm: FC<ReviewFormProps> = ({ workId }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const submitAction = async (formData: FormData) => {
    const result = await createReview(formData)
    if (result.success) {
      toast.success('レビューを投稿しました')
      formRef.current?.reset()
    } else {
      toast.error('レビューの投稿に失敗しました')
    }
  }

  return (
    <form ref={formRef} action={submitAction} className="grid grid-cols-4 gap-4">
      <input type="hidden" name="workId" value={workId} readOnly={true} className="sr-only" />
      <RatingSelect name="overall" label="全体の評価" className="col-span-4" />
      <RatingSelect
        name="character"
        label="キャラクター"
        showItemLabel={false}
        className="col-span-2"
      />
      <RatingSelect name="story" label="ストーリー" showItemLabel={false} className="col-span-2" />
      <RatingSelect name="animation" label="映像" showItemLabel={false} className="col-span-2" />
      <RatingSelect name="music" label="音楽" showItemLabel={false} className="col-span-2" />
      <div className="col-span-4 flex flex-col gap-y-2">
        <Label htmlFor="review-body">レビュー</Label>
        <Textarea id="review-body" name="body" required={true} placeholder="レビューを書く" />
      </div>
      <SubmitButton />
    </form>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="col-span-4 w-fit cursor-pointer justify-self-end"
      disabled={pending}
    >
      {pending ? <LoaderIcon className="animate-spin" /> : <SendIcon />}
      <span>{pending ? '送信中...' : '投稿する'}</span>
    </Button>
  )
}
