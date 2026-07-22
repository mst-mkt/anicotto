import type { MisskeyNoteVisibility } from '../../../constants/misskey'

export const postMisskeyNote = async (
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
      return { success: false, error: res.statusText } as const
    }

    const data = await res.json()
    return { success: true, data } as const
  } catch (error) {
    console.error('Failed to post note:', error)
    return { success: false, error } as const
  }
}
