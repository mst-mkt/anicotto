import type { Metadata } from 'next'
import { LoginButton } from './login-button'

export const metadata = {
  title: 'ログイン',
  description: 'Annictにログインしてアプリを使用する',
} satisfies Metadata

const Login = () => {
  return (
    <>
      <h1>Annictにログイン</h1>
      <p>アプリを使用するためには、Annictにログインする必要があります。</p>
      <LoginButton />
    </>
  )
}

export default Login
