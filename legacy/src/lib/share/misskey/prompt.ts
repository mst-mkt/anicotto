import { STATUS_TEXT } from '../../../constants/text/status'
import type { Status } from '../../../schemas/annict/common'
import type { Episode, EpisodeWithInfo } from '../../../schemas/annict/episodes'
import type { Work } from '../../../schemas/annict/works'

export const generateMisskeyPromptForRecord = (prompt: string, episode: EpisodeWithInfo) => {
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

export const generateMisskeyPromptForMultipleRecords = (
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

export const generateMisskeyPromptForStatus = (prompt: string, work: Work, status: Status) => {
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
