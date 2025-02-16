import { getPlaiceholder } from 'plaiceholder'

export const fetchImageBase64 = async (url: string) => {
  const buffer = await fetch(url, { cache: 'force-cache' }).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  )
  const { base64 } = await getPlaiceholder(buffer)
  return base64
}
