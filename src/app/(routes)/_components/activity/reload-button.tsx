'use client'

import { LoaderIcon, RotateCwIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useRevalidate } from '../../../../hooks/useRevalidate'
import { CACHE_TAGS } from '../../../../lib/cache-tag'

export const ReloadActivityButton = () => {
  const { isPending, revalidate: handleClick } = useRevalidate(CACHE_TAGS.MY_ACTIVITY)

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      disabled={isPending}
    >
      {isPending ? <LoaderIcon size={24} className="animate-spin" /> : <RotateCwIcon size={24} />}
    </Button>
  )
}
