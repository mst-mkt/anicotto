'use client'

import { LoaderIcon, RotateCwIcon } from 'lucide-react'
import { useCallback, useTransition } from 'react'
import { Button } from '../../../components/ui/button'
import { updateActivities } from './update-activities'

export const ReloadActivityButton = () => {
  const [isPending, startTransition] = useTransition()

  const handleClick = useCallback(() => {
    startTransition(() => updateActivities())
  }, [])

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
