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
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>キャストの取得に失敗しました</p>
      </div>
    )
  }

  if (casts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CherryIcon size={40} className="text-anicotto-accent" />
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
                href={`/characters/${cast.character.id}`}
                className="py-4 transition-colors hover:text-anicotto-accent"
              >
                {cast.character.name}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/people/${cast.person.id}`}
                className="py-4 transition-colors hover:text-anicotto-accent"
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
