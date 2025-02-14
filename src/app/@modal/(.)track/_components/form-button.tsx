'use client'

import { LoaderIcon, PenToolIcon } from 'lucide-react'
import type { FC } from 'react'
import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from '../../../../components/ui/button'

export const FormButton: FC<Omit<ButtonProps, 'children'>> = (props) => {
  const { pending } = useFormStatus()

  return (
    <Button {...props} disabled={pending}>
      {pending ? <LoaderIcon className="animate-spin" /> : <PenToolIcon />}
      <span>{pending ? '送信中...' : '記録する'}</span>
    </Button>
  )
}
