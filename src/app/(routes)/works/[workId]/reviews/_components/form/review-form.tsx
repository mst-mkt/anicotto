'use client'

import { LoaderIcon, SendIcon } from 'lucide-react'
import { type FC, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '../../../../../../../components/ui/button'
import { Label } from '../../../../../../../components/ui/label'
import { Textarea } from '../../../../../../../components/ui/textarea'
import type { Work } from '../../../../../../../schemas/annict/works'
import { createReview } from '../../../../../../actions/api/mutate/create-review'
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
    <form action={submitAction} className="grid grid-cols-4 gap-4" ref={formRef}>
      <input className="sr-only" name="workId" readOnly={true} type="hidden" value={workId} />
      <RatingSelect className="col-span-4" label="全体の評価" name="overall" />
      <RatingSelect
        className="col-span-2"
        label="キャラクター"
        name="character"
        showItemLabel={false}
      />
      <RatingSelect className="col-span-2" label="ストーリー" name="story" showItemLabel={false} />
      <RatingSelect className="col-span-2" label="映像" name="animation" showItemLabel={false} />
      <RatingSelect className="col-span-2" label="音楽" name="music" showItemLabel={false} />
      <div className="col-span-4 flex flex-col gap-y-2">
        <Label htmlFor="review-body">レビュー</Label>
        <Textarea id="review-body" name="body" placeholder="レビューを書く" required={true} />
      </div>
      <SubmitButton />
    </form>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      className="col-span-4 w-fit cursor-pointer justify-self-end"
      disabled={pending}
      type="submit"
    >
      {pending ? <LoaderIcon className="animate-spin" /> : <SendIcon />}
      <span>{pending ? '送信中...' : '投稿する'}</span>
    </Button>
  )
}
