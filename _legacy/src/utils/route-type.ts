type WithProtocol = __next_route_internal_types__.WithProtocol

export const isWithProtocol = (url: string): url is WithProtocol => {
  return url.includes(':')
}
