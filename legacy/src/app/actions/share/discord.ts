'use server'

import { annictApiClient } from '../../../lib/api/annict-rest/client'
import { auth } from '../../../lib/auth'
import { CACHE_TAGS } from '../../../lib/cache-tag'
import { postDiscordMessage } from '../../../lib/share/discord/post'
import {
  generateDiscordPromptForMultipleRecords,
  generateDiscordPromptForRecord,
  generateDiscordPromptForStatus,
} from '../../../lib/share/discord/prompt'
import type { Status } from '../../../schemas/annict/common'
import type { EpisodeWithInfo } from '../../../schemas/annict/episodes'
import type { Work } from '../../../schemas/annict/works'

type DiscordConfig = {
  webhookUrl: string
  username: string
  avatarUrl: string
}

export const shareRecordForDiscord = async (
  episodeId: EpisodeWithInfo['id'],
  config: DiscordConfig,
) => {
  await auth()
  const { webhookUrl, username, avatarUrl } = config

  if (webhookUrl.trim().length <= 0) {
    console.error('Discord webhook URL is not set')
    return { success: false, error: 'Discord webhook URL is not set' } as const
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

  const { content, embed } = generateDiscordPromptForRecord(episode)

  return await postDiscordMessage(webhookUrl, {
    content,
    username,
    avatar_url: avatarUrl,
    embeds: [embed],
  })
}

export const shareMultipleRecordsForDiscord = async (
  episodeIds: EpisodeWithInfo['id'][],
  config: DiscordConfig,
) => {
  await auth()
  const { webhookUrl, username, avatarUrl } = config

  if (webhookUrl.trim().length <= 0) {
    console.error('Discord webhook URL is not set')
    return { success: false, error: 'Discord webhook URL is not set' } as const
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
    console.error('Episodes not found')
    return { success: false, error: 'Episodes not found' } as const
  }

  const from = episodes.at(0)
  const to = episodes.at(-1)

  if (from === undefined || to === undefined) {
    console.error('Episodes not found')
    return { success: false, error: 'Episodes not found' } as const
  }

  const { content, embed } = generateDiscordPromptForMultipleRecords(
    from,
    to,
    from.work,
    episodes.length,
  )

  return await postDiscordMessage(webhookUrl, {
    content,
    username,
    avatar_url: avatarUrl,
    embeds: [embed],
  })
}

export const shareStatusForDiscord = async (
  workId: Work['id'],
  status: Status,
  config: DiscordConfig,
) => {
  await auth()
  const { webhookUrl, username, avatarUrl } = config

  if (webhookUrl.trim().length <= 0) {
    console.error('Discord webhook URL is not set')
    return { success: false, error: 'Discord webhook URL is not set' } as const
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

  const { content, embed } = generateDiscordPromptForStatus(work, status)

  return await postDiscordMessage(webhookUrl, {
    content,
    username,
    avatar_url: avatarUrl,
    embeds: [embed],
  })
}
