'use server'

import { err, ok } from 'neverthrow'
import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import { type Rating, ratingPicklist } from '../../../schemas/annict/common'

const isRating = (value: unknown): value is Rating => {
  return ratingPicklist.options.includes(value as Rating)
}

const getFormData = (formData: FormData) => {
  const episodeIdString = formData.get('episode_id')?.toString()
  const episodeId = Number.parseInt(episodeIdString as string, 10)

  if (Number.isNaN(episodeId)) return err('episode_id is invalid')

  const comment = formData.get('comment')?.toString()
  const rating = formData.get('rating')?.toString()

  if (rating !== undefined && !isRating(rating)) {
    return err('rating is invalid')
  }

  const shareTwitter = formData.get('share_twitter') === 'true'
  const shareFacebook = formData.get('share_facebook') === 'true'

  return ok({ episodeId, comment, rating, shareTwitter, shareFacebook })
}

export const createRecord = async (formData: FormData) => {
  await auth()

  const formDataResult = getFormData(formData)

  if (formDataResult.isErr()) return { success: false, error: formDataResult.error } as const

  const result = await annictApiClient.createRecords(
    {
      query: {
        episode_id: formDataResult.value.episodeId,
        comment: formDataResult.value.comment,
        rating_state: formDataResult.value.rating,
        share_twitter: formDataResult.value.shareTwitter,
        share_facebook: formDataResult.value.shareFacebook,
      },
    },
    { next: { tags: [`records-${formDataResult.value.episodeId}`] } },
  )

  if (result.isErr()) return { success: false, error: result.error } as const

  revalidateTag(`episodes-${formDataResult.value.episodeId}`)
  revalidateTag(`records-${formDataResult.value.episodeId}`)
  revalidateTag('libraries')
  revalidateTag('activities')

  return { success: true, data: result.value } as const
}
