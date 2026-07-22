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
  isMisskeyNoteVisibility,
  MISSKEY_DEFAULT_INSTANCE,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_MULTIPLE_RECORDS,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS,
  MISSKEY_NOTE_VISIBILITY,
  type MisskeyNoteVisibility,
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
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  Misskeyのサーバーのドメインを入力してください。
                </HoverCardContent>
              </HoverCard>
            </p>
            <Input
              className="w-full shrink-0 grow-0 md:w-1/2"
              onChange={({ currentTarget }) => setMisskeyInstance(currentTarget.value)}
              placeholder='例: "misskey.io"'
              type="url"
              value={misskeyInstance}
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>アクセストークン</span>
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  <p>Misskeyのアクセストークンを入力してください。</p>
                  <Link
                    className="text-anicotto-accent"
                    href={`https://${misskeyInstance}/settings/api`}
                  >
                    アクセストークンを取得する
                  </Link>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Input
              className="w-full shrink-0 grow-0 md:w-1/2"
              onChange={({ currentTarget }) => setAccessToken(currentTarget.value)}
              type="password"
              value={accessToken}
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-x-4 gap-y-2 md:flex-row">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>公開範囲</span>
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="flex w-fit flex-col gap-y-2 text-sm">
                  <p>投稿の公開範囲を選択してください。</p>
                  <div>
                    <Badge className="rounded-sm px-1 py-0.5 text-xs" variant="secondary">
                      パブリック
                    </Badge>{' '}
                    すべてのユーザーに公開されます。
                  </div>
                  <div>
                    <Badge className="rounded-sm px-1 py-0.5 text-xs" variant="secondary">
                      ホーム
                    </Badge>{' '}
                    ホームタイムラインに表示されます。
                  </div>
                  <div>
                    <Badge className="rounded-sm px-1 py-0.5 text-xs" variant="secondary">
                      フォロワー
                    </Badge>{' '}
                    あなたのフォロワーにのみ表示されます。
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Select
              onValueChange={(value) => isMisskeyNoteVisibility(value) && setVisibility(value)}
              value={visibility}
            >
              <SelectTrigger className="w-full shrink-0 grow-0 cursor-pointer md:w-1/2 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className="cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                  value="public"
                >
                  <EarthIcon size={16} />
                  パブリック
                </SelectItem>
                <SelectItem
                  className="cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                  value="home"
                >
                  <HomeIcon size={16} />
                  ホーム
                </SelectItem>
                <SelectItem
                  className="cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                  value="followers"
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
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
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
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm">
                  <p>記録の投稿内容を入力してください。</p>
                  <div className="flex flex-col gap-y-1">
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.id}'}
                      </Badge>{' '}
                      作品のID
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.title}'}
                      </Badge>{' '}
                      作品のタイトル
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.season}'}
                      </Badge>{' '}
                      作品が放送された時期
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.hashtag}'}
                      </Badge>{' '}
                      作品のハッシュタグ
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{episode.id}'}
                      </Badge>{' '}
                      エピソードのID
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{episode.number}'}
                      </Badge>{' '}
                      エピソードの話数
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{episode.title}'}
                      </Badge>{' '}
                      エピソードのタイトル
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Textarea
              className="w-full shrink-0 grow-0"
              onChange={({ currentTarget }) => setPromptForRecord(currentTarget.value)}
              value={promptForRecord}
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>投稿内容 - 複数の記録</span>
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm">
                  <p>複数の記録の投稿内容を入力してください。</p>
                  <div className="flex flex-col gap-y-1">
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.id}'}
                      </Badge>{' '}
                      作品のID
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.title}'}
                      </Badge>{' '}
                      作品のタイトル
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.season}'}
                      </Badge>{' '}
                      作品が放送された時期
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.hashtag}'}
                      </Badge>{' '}
                      作品のハッシュタグ
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{from.id}'}
                      </Badge>{' '}
                      1つめのエピソードのID
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{from.number}'}
                      </Badge>{' '}
                      1つめのエピソードの話数
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{from.title}'}
                      </Badge>{' '}
                      1つめのエピソードのタイトル
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{to.id}'}
                      </Badge>{' '}
                      最後のエピソードのID
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{to.number}'}
                      </Badge>{' '}
                      最後のエピソードの話数
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{to.title}'}
                      </Badge>{' '}
                      最後のエピソードのタイトル
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{count}'}
                      </Badge>{' '}
                      記録したエピソードの数
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Textarea
              className="w-full shrink-0 grow-0"
              onChange={({ currentTarget }) => setPromptForMultipleRecords(currentTarget.value)}
              value={promptForMultipleRecords}
            />
          </Label>
          <Label className="flex flex-col items-center justify-between gap-y-2">
            <p className="flex w-full items-center gap-x-1 px-2 py-1">
              <span>投稿内容 - ステータス</span>
              <HoverCard closeDelay={100} openDelay={100}>
                <HoverCardTrigger asChild={true}>
                  <InfoIcon className="text-muted-foreground" size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="w-fit text-sm">
                  <p>視聴ステータスの投稿内容を入力してください。</p>
                  <div className="flex flex-col gap-y-1">
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.id}'}
                      </Badge>{' '}
                      作品のID
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.title}'}
                      </Badge>{' '}
                      作品のタイトル
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.season}'}
                      </Badge>{' '}
                      作品が放送された時期
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.hashtag}'}
                      </Badge>{' '}
                      作品のハッシュタグ
                    </div>
                    <div>
                      <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
                        {'{work.status}'}
                      </Badge>{' '}
                      作品の視聴ステータス
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Textarea
              className="w-full shrink-0 grow-0"
              onChange={({ currentTarget }) => setPromptForStatus(currentTarget.value)}
              value={promptForStatus}
            />
          </Label>
        </div>
      )}
    </div>
  )
}
