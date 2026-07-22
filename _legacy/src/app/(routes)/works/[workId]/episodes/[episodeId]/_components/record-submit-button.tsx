'use client'

import { LoaderIcon, PenToolIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from '../../../../../../../components/ui/button'

export const RecordSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button className="cursor-pointer" disabled={pending} type="submit">
      {pending ? <LoaderIcon className="animate-spin" /> : <PenToolIcon />}
      投稿する
    </Button>
  )
}
