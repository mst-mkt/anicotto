import type { FC } from 'react'

import { SignInButton } from '../../components/auth/signin-button'
import { SignOutButton } from '../../components/auth/signout-button'
import { getSession } from '../../libs/auth-client'

const SignInPage: FC = async () => {
  const { data: sessionData } = await getSession()

  return (
    <div className="flex min-h-dvh items-center justify-center">
      {sessionData === null ? <SignInButton /> : <SignOutButton />}
    </div>
  )
}

export default SignInPage
