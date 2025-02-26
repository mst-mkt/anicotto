import { toast } from 'sonner'
import {
  MISSKEY_DEFAULT_INSTANCE,
  MISSKEY_DEFAULT_NOTE_PROMPT,
  MISSKEY_NOTE_VISIBILITY,
  type MisskeyNoteVisibility,
} from '../../constants/misskey'
import { PROJECT_ID } from '../../constants/project'
import type { EpisodeWithInfo } from '../../schemas/annict/episodes'
import { useLocalStorage } from '../useLocalStorage'

const generatePrompt = (prompt: string, episode: EpisodeWithInfo) => {
  const variablesMap = {
    'work.id': episode.work.id,
    'work.title': episode.work.title,
    'work.season': episode.work.season_name_text,
    'work.hashtag': episode.work.twitter_hashtag !== '' ? `#${episode.work.twitter_hashtag}` : '',
    'episode.id': episode.id,
    'episode.number': episode.number_text,
    'episode.title': episode.title,
  }

  return Object.entries(variablesMap).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{${key}}`, `${value ?? ''}`)
  }, prompt)
}

const postNote = async (
  instance: string,
  accessToken: string,
  {
    visibility,
    localOnly,
    noteBody,
  }: { visibility: MisskeyNoteVisibility; localOnly: boolean; noteBody: string },
) => {
  try {
    const res = await fetch(`https://${instance}/api/notes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        visibility,
        localOnly,
        text: noteBody,
      }),
    })

    if (!res.ok) {
      console.error('Failed to post note:', res.statusText)
      toast.error('Misskeyへの記録の共有に失敗しました')
    }
  } catch (error) {
    console.error('Failed to post note:', error)
    toast.error('Misskeyへの記録の共有に失敗しました')
  }
}

export const useShareMisskey = () => {
  const [shareMisskey] = useLocalStorage(`${PROJECT_ID}:share/misskey`, false)
  const [misskeyInstance] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/instance`,
    MISSKEY_DEFAULT_INSTANCE,
  )
  const [accessToken] = useLocalStorage(`${PROJECT_ID}:share/misskey/accessToken`, '')
  const [visibility] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/visibility`,
    MISSKEY_NOTE_VISIBILITY[0],
  )
  const [localOnly] = useLocalStorage(`${PROJECT_ID}:share/misskey/localOnly`, false)
  const [notePrompt] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/notePrompt`,
    MISSKEY_DEFAULT_NOTE_PROMPT,
  )

  const share = async (episode: EpisodeWithInfo) => {
    if (!shareMisskey) return
    if (misskeyInstance.trim() === '') {
      console.error('Misskey instance is not set')
      return
    }
    if (accessToken.trim() === '') {
      console.error('Access token is not set')
      return
    }

    const noteBody = generatePrompt(notePrompt, episode)

    if (noteBody.trim() === '') {
      console.error('Note body is empty')
      return
    }

    await postNote(misskeyInstance, accessToken, {
      visibility,
      localOnly,
      noteBody,
    })
  }

  return share
}
