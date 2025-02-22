'use server'
import { err, ok } from 'neverthrow'
import { revalidateTag } from 'next/cache'
import { annictApiClient } from '../../../lib/api/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import { type Rating, ratingPicklist } from '../../../schemas/annict/common'

const isRating = (value: unknown): value is Rating => {
  return ratingPicklist.options.includes(value as Rating)
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: mainly type-guard, so allowable
const getFormData = (formData: FormData) => {
  const workIdString = formData.get('workId')
  const workId = Number.parseInt(workIdString as string, 10)

  if (Number.isNaN(workId)) return err('workId is invalid')

  const body = formData.get('body')

  if (typeof body !== 'string') return err('review body is invalid')

  const overallRate = formData.get('overall')
  const characterRate = formData.get('character')
  const storyRate = formData.get('story')
  const animationRate = formData.get('animation')
  const musicRate = formData.get('music')

  const ratings = {
    overall: isRating(overallRate) ? overallRate : undefined,
    character: isRating(characterRate) ? characterRate : undefined,
    story: isRating(storyRate) ? storyRate : undefined,
    animation: isRating(animationRate) ? animationRate : undefined,
    music: isRating(musicRate) ? musicRate : undefined,
  }

  return ok({ workId, body, ratings })
}

export const createReview = async (formData: FormData) => {
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
    {
      next: {
        tags: [
          CACHE_TAGS.WORK(formDataResult.value.workId),
          CACHE_TAGS.WORK_REVIEWS(formDataResult.value.workId),
          CACHE_TAGS.MY_ACTIVITY,
        ],
      },
    },
  )

  if (result.isErr()) return { success: false, error: result.error } as const

  revalidateTag(CACHE_TAGS.WORK(formDataResult.value.workId))
  revalidateTag(CACHE_TAGS.WORK_REVIEWS(formDataResult.value.workId))
  revalidateTag(CACHE_TAGS.MY_ACTIVITY)

  return { success: true, value: result.value } as const
}
