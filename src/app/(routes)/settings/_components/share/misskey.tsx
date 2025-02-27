'use client'

import { EarthIcon, HomeIcon, LockIcon } from 'lucide-react'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select'
import { Switch } from '../../../../../components/ui/switch'
import { Textarea } from '../../../../../components/ui/textarea'
import {
  MISSKEY_DEFAULT_INSTANCE,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS,
  MISSKEY_NOTE_VISIBILITY,
  type MisskeyNoteVisibility,
  isMisskeyNoteVisibility,
} from '../../../../../constants/misskey'
import { PROJECT_ID } from '../../../../../constants/project'
import { useLocalStorage } from '../../../../../hooks/useLocalStorage'

export const MisskeyShareConfig = () => {
  const [shareMisskey, setShareMisskey] = useLocalStorage(`${PROJECT_ID}:share/misskey`, false)
  const [misskeyInstance, setMisskeyInstance] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/instance`,
    MISSKEY_DEFAULT_INSTANCE,
  )
  const [accessToken, setAccessToken] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/accessToken`,
    '',
  )
  const [visibility, setVisibility] = useLocalStorage<MisskeyNoteVisibility>(
    `${PROJECT_ID}:share/misskey/visibility`,
    MISSKEY_NOTE_VISIBILITY[0],
  )
  const [localOnly, setLocalOnly] = useLocalStorage(`${PROJECT_ID}:share/misskey/localOnly`, false)
  const [promptForRecord, setPromptForRecord] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/prompt/record`,
    MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  )
  const [promptForStatus, setPromptForStatus] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/prompt/status`,
    MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS,
  )

  return (
    <div className="flex flex-col gap-y-4">
      <Label className="flex items-center justify-between gap-x-4">
        <span>Misskeyで共有する</span>
        <Switch checked={shareMisskey} onCheckedChange={setShareMisskey} />
      </Label>
      {shareMisskey && (
        <div className="flex flex-col gap-y-4 rounded-md bg-muted p-4">
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <span className="w-full px-2 py-1">インスタンス</span>
            <Input
              value={misskeyInstance}
              type="url"
              onChange={({ currentTarget }) => setMisskeyInstance(currentTarget.value)}
              className="w-full shrink-0 grow-0 md:w-1/2"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <span className="w-full px-2 py-1">アクセストークン</span>
            <Input
              value={accessToken}
              type="password"
              onChange={({ currentTarget }) => setAccessToken(currentTarget.value)}
              className="w-full shrink-0 grow-0 md:w-1/2"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <span className="w-full px-2 py-1">公開範囲</span>
            <Select
              value={visibility}
              onValueChange={(value) => isMisskeyNoteVisibility(value) && setVisibility(value)}
            >
              <SelectTrigger className="w-full shrink-0 grow-0 cursor-pointer md:w-1/2 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="public"
                  className="cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <EarthIcon size={16} />
                  パブリック
                </SelectItem>
                <SelectItem
                  value="home"
                  className="cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <HomeIcon size={16} />
                  ホーム
                </SelectItem>
                <SelectItem
                  value="followers"
                  className="cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <LockIcon size={16} />
                  フォロワー
                </SelectItem>
              </SelectContent>
            </Select>
          </Label>
          <Label className="flex items-center justify-between gap-x-4">
            <span className="w-full px-2 py-1">連合なし</span>
            <Switch checked={localOnly} onCheckedChange={setLocalOnly} />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <span className="w-full px-2 py-1">投稿内容 - 記録</span>
            <Textarea
              value={promptForRecord}
              onChange={({ currentTarget }) => setPromptForRecord(currentTarget.value)}
              className="w-full shrink-0 grow-0"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <span className="w-full px-2 py-1">投稿内容 - ステータス</span>
            <Textarea
              value={promptForStatus}
              onChange={({ currentTarget }) => setPromptForStatus(currentTarget.value)}
              className="w-full shrink-0 grow-0"
            />
          </Label>
        </div>
      )}
    </div>
  )
}
