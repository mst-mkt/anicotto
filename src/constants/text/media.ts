import { match, P } from 'ts-pattern'
import type { Media } from '../../schemas/annict/common'
import type { introspection_types } from '../../types/graphql-env'

export const MEDIA_TEXT = (media: Media | introspection_types['Media']['enumValues']) => {
  return match(media)
    .with(P.union('TV', 'tv'), () => 'TV')
    .with(P.union('OVA', 'ova'), () => 'OVA')
    .with(P.union('MOVIE', 'movie'), () => '映画')
    .with(P.union('WEB', 'web'), () => 'Web')
    .with(P.union('OTHER', 'other'), () => 'その他')
    .exhaustive()
}
