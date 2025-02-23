'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import type { Work } from '../../../../schemas/annict/works'

type MultiTrackLinkProps = {
  workId: Work['id']
}

export const MultiTrackLink: FC<MultiTrackLinkProps> = ({ workId }) => (
  <Link
    href={`/track/${workId}`}
    className="flex w-fit items-center justify-end gap-x-2 self-end text-anicotto-accent text-sm hover:underline"
  >
    この作品をまとめて記録する
    <ChevronRightIcon size={16} />
  </Link>
)
