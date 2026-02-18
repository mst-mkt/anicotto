import { STATUS_TEXT } from '../../../constants/text/status'
import type { Status } from '../../../schemas/annict/common'
import type { EpisodeWithInfo } from '../../../schemas/annict/episodes'
import type { Work } from '../../../schemas/annict/works'

export const generateDiscordPromptForRecord = (episode: EpisodeWithInfo) => ({
  content: `「**${episode.work.title}**」 ${episode.number_text} **${episode.title}** を視聴しました`,
  embed: {
    type: 'link',
    title: `${episode.title} - Annict`,
    description: `「${episode.work.title}」 ${episode.number_text}`,
    url: `https://annict.com/works/${episode.work.id}/episodes/${episode.id}`,
  } as const,
})

export const generateDiscordPromptForMultipleRecords = (
  from: EpisodeWithInfo,
  to: EpisodeWithInfo,
  work: Work,
  count: number,
) => ({
  content: `「**${work.title}**」 **${from.number_text}** 〜 **${to.number_text}** の**${count}エピソード**をまとめて視聴しました`,
  embed: {
    type: 'link',
    title: `${work.title} - Annict`,
    url: `https://annict.com/works/${work.id}`,
  } as const,
})

export const generateDiscordPromptForStatus = (work: Work, status: Status) => ({
  content: `「**${work.title}**」 の視聴ステータスを「${STATUS_TEXT(status)}」に変更しました`,
  embed: {
    type: 'link',
    title: `${work.title} - Annict`,
    url: `https://annict.com/works/${work.id}`,
  } as const,
})
