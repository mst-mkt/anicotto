'use client'

import { Button } from '@anicotto/ui'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

import { signOut } from '../../libs/auth-client'

export const SignOutButton: FC = () => {
  const router = useRouter()

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/signin')
          router.refresh()
        },
      },
    })
  }

  return <Button onClick={handleSignOut}>サインアウト</Button>
}
