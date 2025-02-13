'use client'

import { LoaderIcon, RotateCwIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useRevalidate } from '../../../../hooks/useRevalidate'

export const ReloadActivityButton = () => {
  const { isPending, revalidate: handleClick } = useRevalidate('activities')

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
