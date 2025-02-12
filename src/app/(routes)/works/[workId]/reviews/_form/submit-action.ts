'use server'
import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../../../../lib/api/client'
import { auth } from '../../../../../../lib/auth'
import { getFormData } from './check-data'

export const submitAction = async (formData: FormData) => {
  await auth()

  const formDataResult = getFormData(formData)

  if (formDataResult.isErr()) return { success: false, error: formDataResult.error } as const

  const result = await annictApiClient.createReviews(
    {
      query: {
        work_id: formDataResult.value.workId,
        body: formDataResult.value.body,
        rating_overall_state: formDataResult.value.ratings.overall,
        rating_character_state: formDataResult.value.ratings.character,
        rating_story_state: formDataResult.value.ratings.story,
        rating_animation_state: formDataResult.value.ratings.animation,
        rating_music_state: formDataResult.value.ratings.music,
      },
    },
    { next: { tags: [`work-reviews-${formDataResult.value.workId}`] } },
  )

  if (result.isErr()) return { success: false, error: result.error } as const

  revalidateTag(`work-reviews-${formDataResult.value.workId}`)

  return { success: true, value: result.value } as const
}
