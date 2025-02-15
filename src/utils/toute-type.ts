type WithProtocol = `${string}:${string}`

export const isWithProtocol = (url: string): url is WithProtocol => {
  return url.includes(':')
}
