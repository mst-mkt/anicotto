'use server'

import type { MisskeyNoteVisibility } from '../../../constants/misskey'
import { annictApiClient } from '../../../lib/api/annict-rest/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import { postMisskeyNote } from '../../../lib/share/misskey/post'
import {
  generateMisskeyPromptForMultipleRecords,
  generateMisskeyPromptForRecord,
  generateMisskeyPromptForStatus,
} from '../../../lib/share/misskey/prompt'
import type { Status } from '../../../schemas/annict/common'
import type { Episode } from '../../../schemas/annict/episodes'
import type { Work } from '../../../schemas/annict/works'

type MisskeyConfig = {
  instance: string
  accessToken: string
  visibility: MisskeyNoteVisibility
  localOnly: boolean
  prompt: string
}

export const shareRecordForMisskey = async (episodeId: Episode['id'], config: MisskeyConfig) => {
  await auth()
  const { instance, accessToken, visibility, localOnly, prompt } = config

  if (instance.trim().length <= 0) {
    console.error('Misskey instance is not set')
    return { success: false, error: 'Misskey instance is not set' } as const
  }
  if (accessToken.trim().length <= 0) {
    console.error('Access token is not set')
    return { success: false, error: 'Access token is not set' } as const
  }

  const episodeResult = await annictApiClient.getEpisodes(
    { query: { filter_ids: [episodeId], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.EPISODE(episodeId)] } },
  )

  if (episodeResult.isErr()) {
    console.error('Failed to fetch episode:', episodeResult.error)
    return { success: false, error: episodeResult.error } as const
  }

  const episode = episodeResult.value.episodes.at(0)

  if (episode === undefined) {
    console.error('Episode not found')
    return { success: false, error: 'Episode not found' } as const
  }

  const noteBody = generateMisskeyPromptForRecord(prompt, episode)

  if (noteBody.trim().length <= 0) {
    console.error('Note body is empty')
    return { success: false, error: 'Note body is empty' } as const
  }

  return await postMisskeyNote(instance, accessToken, {
    visibility,
    localOnly,
    noteBody,
  })
}

export const shareMultipleRecordsForMisskey = async (
  episodeIds: Episode['id'][],
  config: MisskeyConfig,
) => {
  await auth()
  const { instance, accessToken, visibility, localOnly, prompt } = config

  if (instance.trim().length <= 0) {
    console.error('Misskey instance is not set')
    return { success: false, error: 'Misskey instance is not set' } as const
  }
  if (accessToken.trim().length <= 0) {
    console.error('Access token is not set')
    return { success: false, error: 'Access token is not set' } as const
  }

  const episodesResult = await annictApiClient.getEpisodes(
    { query: { filter_ids: episodeIds, per_page: episodeIds.length } },
    { next: { tags: episodeIds.map((id) => CACHE_TAGS.EPISODE(id)) } },
  )

  if (episodesResult.isErr()) {
    console.error('Failed to fetch episodes:', episodesResult.error)
    return { success: false, error: episodesResult.error } as const
  }

  const episodes = episodesResult.value.episodes

  if (episodes.length !== episodeIds.length) {
    console.error('Some episodes not found')
    return { success: false, error: 'Some episodes not found' } as const
  }

  const from = episodes.at(0)
  const to = episodes.at(-1)

  if (from === undefined || to === undefined) {
    console.error('Episodes not found')
    return { success: false, error: 'Episodes not found' } as const
  }

  const noteBody = generateMisskeyPromptForMultipleRecords(prompt, {
    from,
    to,
    work: from.work,
    count: episodes.length,
  })

  if (noteBody.trim().length <= 0) {
    console.error('Note body is empty')
    return { success: false, error: 'Note body is empty' } as const
  }

  return await postMisskeyNote(instance, accessToken, {
    visibility,
    localOnly,
    noteBody,
  })
}

export const shareStatusForMisskey = async (
  workId: Work['id'],
  status: Status,
  config: MisskeyConfig,
) => {
  await auth()
  const { instance, accessToken, visibility, localOnly, prompt } = config

  if (instance.trim().length <= 0) {
    console.error('Misskey instance is not set')
    return { success: false, error: 'Misskey instance is not set' } as const
  }
  if (accessToken.trim().length <= 0) {
    console.error('Access token is not set')
    return { success: false, error: 'Access token is not set' } as const
  }

  const workResult = await annictApiClient.getWorks(
    { query: { filter_ids: [workId], per_page: 1 } },
    { next: { tags: [CACHE_TAGS.WORK(workId)] } },
  )

  if (workResult.isErr()) {
    console.error('Failed to fetch work:', workResult.error)
    return { success: false, error: workResult.error } as const
  }

  const work = workResult.value.works.at(0)

  if (work === undefined) {
    console.error('Work not found')
    return { success: false, error: 'Work not found' } as const
  }

  const noteBody = generateMisskeyPromptForStatus(prompt, work, status)

  if (noteBody.trim().length <= 0) {
    console.error('Note body is empty')
    return { success: false, error: 'Note body is empty' } as const
  }

  return await postMisskeyNote(instance, accessToken, {
    visibility,
    localOnly,
    noteBody,
  })
}
