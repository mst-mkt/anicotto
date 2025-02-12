import { err, ok } from 'neverthrow'
import { type Rating, ratingPicklist } from '../../../../../../schemas/annict/common'

const isString = (value: unknown): value is string => typeof value === 'string'
const isRating = (value: unknown): value is Rating => {
  return ratingPicklist.options.includes(value as Rating)
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: mainly type-guard, so allowable
export const getFormData = (formData: FormData) => {
  const workIdString = formData.get('workId')
  const workId = Number.parseInt(workIdString as string, 10)

  if (Number.isNaN(workId)) return err('workId is invalid')

  const body = formData.get('body')

  if (!isString(body)) return err('review body is invalid')

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
