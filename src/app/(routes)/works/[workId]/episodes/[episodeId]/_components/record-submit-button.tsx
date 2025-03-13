'use client'

import { LoaderIcon, PenToolIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from '../../../../../../../components/ui/button'

export const RecordSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="cursor-pointer">
      {pending ? <LoaderIcon className="animate-spin" /> : <PenToolIcon />}
      投稿する
    </Button>
  )
}
