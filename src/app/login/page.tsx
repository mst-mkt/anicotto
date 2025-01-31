import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '../../lib/auth'
import { LoginButton } from './login-button'

export const metadata = {
  title: 'ログイン',
  description: 'Annictにログインしてアプリを使用する',
} satisfies Metadata

const Login = async () => {
  const session = await getSession()

  if (session !== null) redirect('/')

  return (
    <>
      <h1>Annictにログイン</h1>
      <p>アプリを使用するためには、Annictにログインする必要があります。</p>
      <LoginButton />
    </>
  )
}

export default Login
