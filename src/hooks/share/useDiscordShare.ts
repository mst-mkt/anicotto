import { toast } from 'sonner'
import { PROJECT_ID, PROJECT_NAME } from '../../constants/project'
import { STATUS_TEXT } from '../../constants/text/status'
import type { Status } from '../../schemas/annict/common'
import type { Episode, EpisodeWithInfo } from '../../schemas/annict/episodes'
import type { Work } from '../../schemas/annict/works'
import { useLocalStorage } from '../useLocalStorage'

const postMessage = async (
  webhookUrl: string,
  webHookContent: {
    content: string
    username: string
    avatar_url: string
    embeds: {
      type: 'link'
      title: string
      description?: string
      url: string
    }[]
  },
) => {
  if (webhookUrl === '') return

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webHookContent),
    })

    if (!res.ok) {
      console.error('Failed to post message:', res.statusText)
      toast.error('Discord への共有に失敗しました')
    }
  } catch (e) {
    console.error('Failed to post message:', e)
    toast.error('Discord への共有に失敗しました')
  }
}

export const useDiscordShare = () => {
  const [shareDiscord] = useLocalStorage(`${PROJECT_ID}:share/discord`, false)
  const [discordWebhookUrl] = useLocalStorage(`${PROJECT_ID}:share/discord/webhook`, '')
  const [discordWebhookUsername] = useLocalStorage(
    `${PROJECT_ID}:share/discord/username`,
    PROJECT_NAME,
  )
  const [discordWebhookAvatarUrl] = useLocalStorage(`${PROJECT_ID}:share/discord/avatar`, '')

  const shareRecord = async (episode: EpisodeWithInfo) => {
    if (!shareDiscord) return
    if (discordWebhookUrl.trim() === '') {
      console.error('Webhook URL is not set')
      return
    }

    await postMessage(discordWebhookUrl, {
      content: `「**${episode.work.title}**」 ${episode.number_text} **${episode.title}** を視聴しました`,
      username: discordWebhookUsername,
      avatar_url: discordWebhookAvatarUrl,
      embeds: [
        {
          type: 'link',
          title: `${episode.title} - Annict`,
          description: `「${episode.work.title}」 ${episode.number_text}`,
          url: `https://annict.com/works/${episode.work.id}/episodes/${episode.id}`,
        },
      ],
    })
  }

  const shareMultipleRecords = async (
    count: number,
    episodes: {
      from: Episode
      to: Episode
    },
    work: Work,
  ) => {
    if (!shareDiscord) return
    if (discordWebhookUrl.trim() === '') {
      console.error('Webhook URL is not set')
      return
    }

    await postMessage(discordWebhookUrl, {
      content: `「**${work.title}**」 **${episodes.from.number_text}** 〜 **${episodes.to.number_text}** の**${count}エピソード**をまとめて視聴しました`,
      username: discordWebhookUsername,
      avatar_url: discordWebhookAvatarUrl,
      embeds: [
        {
          type: 'link',
          title: `${work.title} - Annict`,
          url: `https://annict.com/works/${work.id}`,
        },
      ],
    })
  }

  const shareStatus = async (work: Work, status: Status) => {
    if (!shareDiscord) return
    if (discordWebhookUrl.trim() === '') {
      console.error('Webhook URL is not set')
      return
    }

    await postMessage(discordWebhookUrl, {
      content: `「**${work.title}**」 の視聴ステータスを「${STATUS_TEXT(status)}」に変更しました`,
      username: discordWebhookUsername,
      avatar_url: discordWebhookAvatarUrl,
      embeds: [
        {
          type: 'link',
          title: `${work.title} - Annict`,
          url: `https://annict.com/works/${work.id}`,
        },
      ],
    })
  }

  return { shareRecord, shareMultipleRecords, shareStatus }
}
