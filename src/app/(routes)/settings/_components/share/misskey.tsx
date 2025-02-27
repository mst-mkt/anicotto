'use client'

import { EarthIcon, HomeIcon, InfoIcon, LockIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../../components/ui/badge'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../../../components/ui/hover-card'
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
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_MULTIPLE_RECORDS,
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
  const [promptForMultipleRecords, setPromptForMultipleRecords] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/prompt/multipleRecords`,
    MISSKEY_DEFAULT_NOTE_PROMPT_FOR_MULTIPLE_RECORDS,
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
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>インスタンス</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  Misskeyのサーバーのドメインを入力してください。
                </HoverCardContent>
              </HoverCard>
            </p>
            <Input
              value={misskeyInstance}
              type="url"
              onChange={({ currentTarget }) => setMisskeyInstance(currentTarget.value)}
              placeholder='例: "misskey.io"'
              className="w-full shrink-0 grow-0 md:w-1/2"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>アクセストークン</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  <p>Misskeyのアクセストークンを入力してください。</p>
                  <Link
                    href={`https://${misskeyInstance}/settings/api`}
                    className="text-anicotto-accent"
                  >
                    アクセストークンを取得する
                  </Link>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Input
              value={accessToken}
              type="password"
              onChange={({ currentTarget }) => setAccessToken(currentTarget.value)}
              className="w-full shrink-0 grow-0 md:w-1/2"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>公開範囲</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="flex w-fit flex-col gap-y-2 text-sm">
                  <p>投稿の公開範囲を選択してください。</p>
                  <div>
                    <Badge variant="secondary" className="rounded-sm px-1 py-0.5 text-xs">
                      パブリック
                    </Badge>{' '}
                    すべてのユーザーに公開されます。
                  </div>
                  <div>
                    <Badge variant="secondary" className="rounded-sm px-1 py-0.5 text-xs">
                      ホーム
                    </Badge>{' '}
                    ホームタイムラインに表示されます。
                  </div>
                  <div>
                    <Badge variant="secondary" className="rounded-sm px-1 py-0.5 text-xs">
                      フォロワー
                    </Badge>{' '}
                    あなたのフォロワーにのみ表示されます。
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
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
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>連合なし</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  連合している他のサーバーへ投稿を行わないようにします。
                </HoverCardContent>
              </HoverCard>
            </p>
            <Switch checked={localOnly} onCheckedChange={setLocalOnly} />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>投稿内容 - 記録</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm">
                  <p>記録の投稿内容を入力してください。</p>
                  <div className="flex flex-col gap-y-1">
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.id}'}
                      </Badge>{' '}
                      作品のID
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.title}'}
                      </Badge>{' '}
                      作品のタイトル
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.season}'}
                      </Badge>{' '}
                      作品が放送された時期
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.hashtag}'}
                      </Badge>{' '}
                      作品のハッシュタグ
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{episode.id}'}
                      </Badge>{' '}
                      エピソードのID
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{episode.number}'}
                      </Badge>{' '}
                      エピソードの話数
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{episode.title}'}
                      </Badge>{' '}
                      エピソードのタイトル
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Textarea
              value={promptForRecord}
              onChange={({ currentTarget }) => setPromptForRecord(currentTarget.value)}
              className="w-full shrink-0 grow-0"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>投稿内容 - 複数の記録</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm">
                  <p>複数の記録の投稿内容を入力してください。</p>
                  <div className="flex flex-col gap-y-1">
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.id}'}
                      </Badge>{' '}
                      作品のID
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.title}'}
                      </Badge>{' '}
                      作品のタイトル
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.season}'}
                      </Badge>{' '}
                      作品が放送された時期
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.hashtag}'}
                      </Badge>{' '}
                      作品のハッシュタグ
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{from.id}'}
                      </Badge>{' '}
                      1つめのエピソードのID
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{from.number}'}
                      </Badge>{' '}
                      1つめのエピソードの話数
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{from.title}'}
                      </Badge>{' '}
                      1つめのエピソードのタイトル
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{to.id}'}
                      </Badge>{' '}
                      最後のエピソードのID
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{to.number}'}
                      </Badge>{' '}
                      最後のエピソードの話数
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{to.title}'}
                      </Badge>{' '}
                      最後のエピソードのタイトル
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{count}'}
                      </Badge>{' '}
                      記録したエピソードの数
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Textarea
              value={promptForMultipleRecords}
              onChange={({ currentTarget }) => setPromptForMultipleRecords(currentTarget.value)}
              className="w-full shrink-0 grow-0"
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>投稿内容 - ステータス</span>
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon size={16} className="text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm">
                  <p>視聴ステータスの投稿内容を入力してください。</p>
                  <div className="flex flex-col gap-y-1">
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.id}'}
                      </Badge>{' '}
                      作品のID
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.title}'}
                      </Badge>{' '}
                      作品のタイトル
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.season}'}
                      </Badge>{' '}
                      作品が放送された時期
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.hashtag}'}
                      </Badge>{' '}
                      作品のハッシュタグ
                    </div>
                    <div>
                      <Badge variant="secondary" className="rounded-sm px-1 py-0 text-xs">
                        {'{work.status}'}
                      </Badge>{' '}
                      作品の視聴ステータス
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
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
