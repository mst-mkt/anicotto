import {
  MISSKEY_DEFAULT_INSTANCE,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_RECORD,
  MISSKEY_DEFAULT_NOTE_PROMPT_FOR_STATUS,
  MISSKEY_NOTE_VISIBILITY,
} from '../../constants/misskey'
import { PROJECT_ID } from '../../constants/project'
import { useLocalStorage } from '../useLocalStorage'

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

  return {
    shareMisskey,
    recordMisskeyConfig: {
      instance: misskeyInstance,
      accessToken,
      visibility,
      localOnly,
      prompt: promptForRecord,
    },
    multipleRecordsMisskeyConfig: {
      instance: misskeyInstance,
      accessToken,
      visibility,
      localOnly,
      prompt: promptForMultipleRecords,
    },
    statusMisskeyConfig: {
      instance: misskeyInstance,
      accessToken,
      visibility,
      localOnly,
      prompt: promptForStatus,
    },
  }
}
