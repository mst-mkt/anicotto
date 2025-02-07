import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth, signIn } from '../../../lib/auth'

export const metadata = {
  title: 'ログイン',
  description: 'Annictにログインしてアプリを使用する',
} satisfies Metadata

const Login = async () => {
  const session = await auth()

  if (session !== null) redirect('/')

  const loginAction = async () => {
    'use server'
    await signIn('annict', { redirectTo: '/' })
  }

  return (
    <form action={loginAction}>
      <h1>Annictにログイン</h1>
      <p>アプリを使用するためには、Annictにログインする必要があります。</p>
      <button type="submit">ログイン</button>
    </form>
  )
}

export default Login
