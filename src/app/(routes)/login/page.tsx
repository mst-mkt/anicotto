import { LogInIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '../../../components/ui/button'
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
    <form action={loginAction} className="flex flex-col gap-y-4">
      <h1 className="font-bold text-xl">Annictにログイン</h1>
      <p className="text-muted-foreground">
        アプリを使用するためには、
        <Link href="https://annict.com" className="font-bold text-anicotto-accent hover:underline">
          Annict
        </Link>
        にログインする必要があります。
      </p>
      <Button type="submit" className="w-fit cursor-pointer">
        <LogInIcon size={16} />
        ログイン
      </Button>
    </form>
  )
}

export default Login
