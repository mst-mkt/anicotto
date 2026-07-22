'use client'

import { LoaderIcon, Trash2Icon } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import { useRevalidate } from '../../../../../hooks/useRevalidate'
import { CACHE_TAGS } from '../../../../../lib/cache-tag'

export const RevalidateButton = () => {
  const { revalidate, isPending } = useRevalidate(
    ...Object.values(CACHE_TAGS).filter((tag) => typeof tag === 'string'),
  )

  return (
    <Button
      className="w-fit cursor-pointer self-end"
      disabled={isPending}
      onClick={revalidate}
      variant="destructive"
    >
      {isPending ? <LoaderIcon className="animate-spin" /> : <Trash2Icon />}
      キャッシュを再検証
    </Button>
  )
}
