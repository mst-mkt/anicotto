import {
  EarthIcon,
  ListVideoIcon,
  type LucideProps,
  TvIcon,
  VideoIcon,
  VideotapeIcon,
} from 'lucide-react'
import type { FC } from 'react'
import { P, match } from 'ts-pattern'
import type { Media } from '../../schemas/annict/common'
import type { introspection_types } from '../../types/graphql-env'

type MediaIconProps = {
  media: Media | introspection_types['Media']['enumValues']
} & LucideProps

export const MediaIcon: FC<MediaIconProps> = ({ media, ...props }) => {
  return match(media)
    .with(P.union('tv', 'TV'), () => <TvIcon {...props} />)
    .with(P.union('ova', 'OVA'), () => <VideotapeIcon {...props} />)
    .with(P.union('movie', 'MOVIE'), () => <VideoIcon {...props} />)
    .with(P.union('web', 'WEB'), () => <EarthIcon {...props} />)
    .with(P.union('other', 'OTHER'), () => <ListVideoIcon {...props} />)
    .exhaustive()
}
