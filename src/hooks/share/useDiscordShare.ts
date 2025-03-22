import { PROJECT_ID, PROJECT_NAME } from '../../constants/project'
import type {} from '../../schemas/annict/episodes'
import { useLocalStorage } from '../useLocalStorage'

export const useDiscordShare = () => {
  const [shareDiscord] = useLocalStorage(`${PROJECT_ID}:share/discord`, false)
  const [discordWebhookUrl] = useLocalStorage(`${PROJECT_ID}:share/discord/webhook`, '')
  const [discordWebhookUsername] = useLocalStorage(
    `${PROJECT_ID}:share/discord/username`,
    PROJECT_NAME,
  )
  const [discordWebhookAvatarUrl] = useLocalStorage(`${PROJECT_ID}:share/discord/avatar`, '')

  return {
    shareDiscord,
    discordConfig: {
      webhookUrl: discordWebhookUrl,
      username: discordWebhookUsername,
      avatarUrl: discordWebhookAvatarUrl,
    },
  }
}
