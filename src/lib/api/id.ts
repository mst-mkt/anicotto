import { arm } from '@kawaiioverflow/arm'
import { cache } from 'react'

export const malToAnnict = cache((malId: number): number | undefined => {
  return arm.find(({ mal_id }) => mal_id === malId)?.annict_id
})

export const malToAnilist = cache((malId: number): number | undefined => {
  return arm.find(({ mal_id }) => mal_id === malId)?.anilist_id
})

export const annictToMal = cache((annictId: number): number | undefined => {
  return arm.find(({ annict_id }) => annict_id === annictId)?.mal_id
})

export const annictToAnilist = cache((annictId: number): number | undefined => {
  return arm.find(({ annict_id }) => annict_id === annictId)?.anilist_id
})

export const anilistToMal = cache((anilistId: number): number | undefined => {
  return arm.find(({ anilist_id }) => anilist_id === anilistId)?.mal_id
})

export const anilistToAnnict = cache((anilistId: number): number | undefined => {
  return arm.find(({ anilist_id }) => anilist_id === anilistId)?.annict_id
})
