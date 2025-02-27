export const MISSKEY_DEFAULT_INSTANCE = 'misskey.io'
export const MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD =
  '{work.title} ?[{episode.number} {episode.title}](https://annict.com/works/{work.id}/episodes/{episode.id}) を見ました {work.hashtag} #Annict'
export const MISSKEY_DEFAULT_NOTE_PROMPT_FOR_MULTIPLE_RECORDS =
  '{work.title} ?[{from.number}](https://annict.com/works/{work.id}/episodes/{from.id}) から ?[{to.number}](https://annict.com/works/{work.id}/episodes/{to.id}) の{count}エピソードを見ました {work.hashtag} #Annict'
export const MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS =
  'アニメ「?[{work.title}](https://annict.com/works/{work.id})」の視聴ステータスを「{work.status}」に変更しました {work.hashtag} #Annict'

export const MISSKEY_NOTE_VISIBILITY = ['public', 'home', 'followers'] as const
export type MisskeyNoteVisibility = (typeof MISSKEY_NOTE_VISIBILITY)[number]
export const isMisskeyNoteVisibility = (value: unknown): value is MisskeyNoteVisibility =>
  MISSKEY_NOTE_VISIBILITY.includes(value as MisskeyNoteVisibility)
