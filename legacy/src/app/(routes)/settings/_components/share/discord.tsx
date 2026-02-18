'use client'

import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Switch } from '../../../../../components/ui/switch'
import { PROJECT_ID } from '../../../../../constants/project'
import { useLocalStorage } from '../../../../../hooks/useLocalStorage'

export const DiscordShareConfig = () => {
  const [shareDiscord, setShareDiscord] = useLocalStorage(`${PROJECT_ID}:share/discord`, false)
  const [discordWebhookUrl, setDiscordWebhookUrl] = useLocalStorage(
    `${PROJECT_ID}:share/discord/webhook`,
    '',
  )
  const [discordWebhookUsername, setDiscordWebhookUsername] = useLocalStorage(
    `${PROJECT_ID}:share/discord/username`,
    'Anicotto',
  )
  const [discordWebhookAvatarUrl, setDiscordWebhookAvatarUrl] = useLocalStorage(
    `${PROJECT_ID}:share/discord/avatar`,
    '',
  )

  return (
    <div className="flex flex-col gap-y-4">
      <Label className="flex items-center justify-between gap-x-4">
        <span>Discord に共有する</span>
        <Switch checked={shareDiscord} onCheckedChange={setShareDiscord} />
      </Label>
      {shareDiscord && (
        <div className="flex flex-col gap-y-4 rounded-md bg-muted p-4">
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <span>Webhook URL</span>
            <Input
              className="w-full shrink-0 grow-0 md:w-1/2"
              onChange={({ currentTarget }) => setDiscordWebhookUrl(currentTarget.value)}
              placeholder="https://discord.com/api/webhooks/..."
              type="url"
              value={discordWebhookUrl}
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <span>Webhook ユーザー名</span>
            <Input
              className="w-full shrink-0 grow-0 md:w-1/2"
              onChange={({ currentTarget }) => setDiscordWebhookUsername(currentTarget.value)}
              placeholder="Anicotto"
              value={discordWebhookUsername}
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <span>Webhook アバターURL</span>
            <Input
              className="w-full shrink-0 grow-0 md:w-1/2"
              onChange={({ currentTarget }) => setDiscordWebhookAvatarUrl(currentTarget.value)}
              placeholder="https://example.com/avatar.png"
              type="url"
              value={discordWebhookAvatarUrl}
            />
          </Label>
        </div>
      )}
    </div>
  )
}
