import { CherryIcon, CloudAlertIcon, SwordsIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../components/ui/table'
import type { Work } from '../../../../../../schemas/annict/works'
import { getWorkCasts } from '../../../../../actions/api/get/casts'

type CastsProps = {
  workId: Work['id']
}

export const Casts: FC<CastsProps> = async ({ workId }) => {
  const casts = await getWorkCasts(workId)

  if (casts === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CloudAlertIcon className="text-anicotto-accent" size={40} />
        <p>キャストの取得に失敗しました</p>
      </div>
    )
  }

  if (casts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CherryIcon className="text-anicotto-accent" size={40} />
        <p>キャストが見当たりません</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">
            <div className="flex items-center gap-x-2">
              <SwordsIcon />
              <span>キャラクター</span>
            </div>
          </TableHead>
          <TableHead className="w-1/2">
            <div className="flex items-center gap-x-2">
              <UsersIcon />
              <span>キャスト</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {casts.map((cast) => (
          <TableRow key={cast.id}>
            <TableCell>
              <Link
                className="py-4 transition-colors hover:text-anicotto-accent"
                href={`/characters/${cast.character.id}`}
              >
                {cast.character.name}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                className="py-4 transition-colors hover:text-anicotto-accent"
                href={`/people/${cast.person.id}`}
              >
                {cast.person.name}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const CastsSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/2">
          <div className="flex items-center gap-x-2">
            <SwordsIcon />
            <span>キャラクター</span>
          </div>
        </TableHead>
        <TableHead className="w-1/2">
          <div className="flex items-center gap-x-2">
            <UsersIcon />
            <span>キャスト</span>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: this is keys of static array
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-[1lh] w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[1lh] w-24" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
