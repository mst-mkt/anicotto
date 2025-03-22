export const postDiscordMessage = async (
  webhookUrl: string,
  webHookContent: {
    content: string
    username: string
    avatar_url: string
    embeds: {
      type: 'link'
      title: string
      description?: string
      url: string
    }[]
  },
) => {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webHookContent),
    })

    if (!res.ok) {
      console.error('Failed to post message:', res.statusText)
      return { success: false, error: res.statusText } as const
    }

    return { success: true } as const
  } catch (error) {
    console.error('Failed to post message:', error)
    return { success: false, error } as const
  }
}
