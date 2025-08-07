'use client'

import { LoaderIcon, RotateCwIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useRevalidate } from '../../../../hooks/useRevalidate'
import { CACHE_TAGS } from '../../../../lib/cache-tag'

export const ReloadActivityButton = () => {
  const { isPending, revalidate: handleClick } = useRevalidate(
    CACHE_TAGS.MY_ACTIVITY,
    CACHE_TAGS.MY_LIBRARIES,
  )

  return (
    <Button
      className="cursor-pointer"
      disabled={isPending}
      onClick={handleClick}
      size="icon"
      variant="ghost"
    >
      {isPending ? <LoaderIcon className="animate-spin" size={24} /> : <RotateCwIcon size={24} />}
    </Button>
  )
}
