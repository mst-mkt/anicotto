import { toast } from 'sonner'
import {
  MISSKEY_DEFAULT_INSTANCE,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS,
  MISSKEY_NOTE_VISIBILITY,
  type MisskeyNoteVisibility,
} from '../../constants/misskey'
import { PROJECT_ID } from '../../constants/project'
import { STATUS_TEXT } from '../../constants/text/status'
import type { Status } from '../../schemas/annict/common'
import type { Episode, EpisodeWithInfo } from '../../schemas/annict/episodes'
import type { Work } from '../../schemas/annict/works'
import { useLocalStorage } from '../useLocalStorage'

const generatePromptForRecord = (prompt: string, episode: EpisodeWithInfo) => {
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

const generatePromptForMultipleRecords = (
  prompt: string,
  data: {
    from: Episode
    to: Episode
    work: Work
    count: number
  },
) => {
  const variablesMap = {
    'work.id': data.work.id,
    'work.title': data.work.title,
    'work.season': data.work.season_name_text,
    'work.hashtag': data.work.twitter_hashtag !== '' ? `#${data.work.twitter_hashtag}` : '',
    'from.id': data.from.id,
    'from.number': data.from.number_text,
    'from.title': data.from.title,
    'to.id': data.to.id,
    'to.number': data.to.number_text,
    'to.title': data.to.title,
    count: data.count,
  }

  return Object.entries(variablesMap).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{${key}}`, `${value ?? ''}`)
  }, prompt)
}

const generatePromptForStatus = (prompt: string, work: Work, status: Status) => {
  const variablesMap = {
    'work.id': work.id,
    'work.title': work.title,
    'work.season': work.season_name_text,
    'work.hashtag': work.twitter_hashtag !== '' ? `#${work.twitter_hashtag}` : '',
    'work.status': STATUS_TEXT(status),
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
  const [promptForRecord] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/prompt/record`,
    MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  )
  const [promptForMultipleRecords] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/prompt/multipleRecords`,
    MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  )
  const [promptForStatus] = useLocalStorage(
    `${PROJECT_ID}:share/misskey/prompt/status`,
    MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS,
  )

  const shareRecord = async (episode: EpisodeWithInfo) => {
    if (!shareMisskey) return
    if (misskeyInstance.trim() === '') {
      console.error('Misskey instance is not set')
      return
    }
    if (accessToken.trim() === '') {
      console.error('Access token is not set')
      return
    }

    const noteBody = generatePromptForRecord(promptForRecord, episode)

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

  const shareMultipleRecords = async (
    count: number,
    episodes: {
      from: Episode
      to: Episode
    },
    work: Work,
  ) => {
    if (!shareMisskey) return
    if (misskeyInstance.trim() === '') {
      console.error('Misskey instance is not set')
      return
    }
    if (accessToken.trim() === '') {
      console.error('Access token is not set')
      return
    }

    const noteBody = generatePromptForMultipleRecords(promptForMultipleRecords, {
      from: episodes.from,
      to: episodes.to,
      work,
      count,
    })

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

  const shareStatus = async (work: Work, status: Status) => {
    if (!shareMisskey) return
    if (misskeyInstance.trim() === '') {
      console.error('Misskey instance is not set')
      return
    }
    if (accessToken.trim() === '') {
      console.error('Access token is not set')
      return
    }

    const noteBody = generatePromptForStatus(promptForStatus, work, status)

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

  return { shareRecord, shareStatus, shareMultipleRecords }
}
