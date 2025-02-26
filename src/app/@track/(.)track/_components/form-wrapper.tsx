'use client'

import { err, ok } from 'neverthrow'
import { useRouter } from 'next/navigation'
import { type ComponentProps, type FC, useRef } from 'react'
import { toast } from 'sonner'
import { useShareMisskey } from '../../../../hooks/share/useMisskeyShare'
import { type Rating, ratingPicklist } from '../../../../schemas/annict/common'
import { createRecord } from '../../../actions/api/create-record'
import { getEpisode } from '../get-episode'

type TrackFormWrapperProps = ComponentProps<'form'>

export const TrackFormWrapper: FC<TrackFormWrapperProps> = (props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const shareMisskey = useShareMisskey()

  const getFormData = (formData: FormData) => {
    const isRating = (value: unknown): value is Rating => {
      return ratingPicklist.options.includes(value as Rating)
    }

    const episodeIdString = formData.get('episode_id')?.toString()
    const episodeId = Number.parseInt(episodeIdString as string, 10)

    if (Number.isNaN(episodeId)) return err('episode_id is invalid')

    const comment = formData.get('comment')?.toString()
    const rating = formData.get('rating')?.toString()

    if (rating !== undefined && !isRating(rating)) {
      return err('rating is invalid')
    }

    return ok({ episodeId, comment, rating })
  }

  const submitAction = async (formData: FormData) => {
    const formDataResult = getFormData(formData)

    if (formDataResult.isErr()) {
      toast.error(`記録の作成に失敗しました: ${formDataResult.error}`)
      return
    }

    const { episodeId, comment, rating } = formDataResult.value
    const result = await createRecord(episodeId, comment, rating)

    if (!result.success) {
      toast.error(`記録の作成に失敗しました: ${result.error}`)
      return
    }

    toast.success(
      <p>
        <span>{result.data.work.title}</span>のエピソードを記録しました
      </p>,
    )

    const episode = await getEpisode(episodeId)

    if (episode !== null) {
      shareMisskey(episode)
    }

    formRef.current?.reset()
    router.back()
  }

  return <form action={submitAction} ref={formRef} {...props} />
}
