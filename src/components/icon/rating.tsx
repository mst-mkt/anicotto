import { BombIcon, CupSodaIcon, type LucideProps, MoonStarIcon, SparklesIcon } from 'lucide-react'
import type { FC } from 'react'
import { match, P } from 'ts-pattern'
import type { Rating } from '../../schemas/annict/common'
import type { introspection_types } from '../../types/graphql-env'

type RatingIconProps = {
  rating: Rating | introspection_types['RatingState']['enumValues']
} & LucideProps

export const RatingIcon: FC<RatingIconProps> = ({ rating, ...props }) => {
  return match(rating)
    .with(P.union('bad', 'BAD'), () => <BombIcon {...props} />)
    .with(P.union('average', 'AVERAGE'), () => <CupSodaIcon {...props} />)
    .with(P.union('good', 'GOOD'), () => <SparklesIcon {...props} />)
    .with(P.union('great', 'GREAT'), () => <MoonStarIcon {...props} />)
    .exhaustive()
}
