'use client'

import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { match } from 'ts-pattern'
import { Button } from '../components/ui/button'

const NotFound = () => {
  const currentPath = window.location.pathname

  return (
    <div className="flex h-full flex-col items-center gap-y-8 py-16">
      <h1 className="font-black text-6xl text-anicotto-accent">404</h1>
      <p className="font-bold text-lg">
        {match(currentPath.split('/').at(1))
          .with('works', () => '作品が見つかりませんでした')
          .with('users', () => 'ユーザーが見つかりませんでした')
          .otherwise(() => 'ページが見つかりませんでした')}
      </p>
      <Button variant="outline" asChild={true}>
        <Link href="/">
          <HomeIcon />
          トップへ戻る
        </Link>
      </Button>
    </div>
  )
}

export default NotFound
