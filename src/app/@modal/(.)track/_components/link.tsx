'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { FC } from 'react'
import type { Work } from '../../../../schemas/annict/works'

type MultiTrackLinkProps = {
  workId: Work['id']
}

export const MultiTrackLink: FC<MultiTrackLinkProps> = ({ workId }) => (
  <Link
    href={`/track/${workId}`}
    // without this onClick, intercepting-routes (track modal) will remain open
    // このやり方は無理矢理感があるのでなんとかしたい
    onClick={() => redirect(`/track/${workId}`)}
    className="flex items-center justify-end gap-x-2 text-anicotto-accent text-sm hover:underline"
  >
    この作品をまとめて記録する
    <ChevronRightIcon size={16} />
  </Link>
)
