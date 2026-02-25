'use client'

import { Button } from '@anicotto/ui'
import type { FC } from 'react'

import { signIn } from '../../libs/auth-client'

export const SignInButton: FC = () => {
  const handleSignIn = () => {
    signIn.oauth2({ providerId: 'annict', callbackURL: '/' })
  }

  return <Button onClick={handleSignIn}>サインイン</Button>
}
