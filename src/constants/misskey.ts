export const MISSKEY_DEFAULT_INSTANCE = 'misskey.io'
export const MISSKEY_DEFAULT_NOTE_PROMPT =
  '{work.title} ?[{episode.number} {episode.title}](https://annict.com/works/{work.id}/episodes/{episode.id}) を見ました {work.hashtag} #Annict'

export const MISSKEY_NOTE_VISIBILITY = ['public', 'home', 'followers'] as const
export type MisskeyNoteVisibility = (typeof MISSKEY_NOTE_VISIBILITY)[number]
export const isMisskeyNoteVisibility = (value: unknown): value is MisskeyNoteVisibility =>
  MISSKEY_NOTE_VISIBILITY.includes(value as MisskeyNoteVisibility)
