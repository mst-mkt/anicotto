'use client'

import { type ComponentProps, type FC, useRef } from 'react'
import { toast } from 'sonner'
import { createRecord } from '../../../actions/api/create-record'

export const TrackFormWrapper: FC<ComponentProps<'form'>> = (props) => {
  const formRef = useRef<HTMLFormElement>(null)

  const submitAction = async (formData: FormData) => {
    const result = await createRecord(formData)
    if (result.success) {
      toast.success(
        <p>
          <span>{result.data.work.title}</span>のエピソードを記録しました
        </p>,
      )
      formRef.current?.reset()
    } else {
      toast.error(`記録に失敗しました ${result.error}`)
    }
  }

  return <form action={submitAction} ref={formRef} {...props} />
}
