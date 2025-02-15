import { HomeIcon, PenToolIcon, SearchIcon, TelescopeIcon } from 'lucide-react'
import Link from 'next/link'

export const BottomMenu = () => (
  <div className="fixed bottom-0 left-0 flex w-full justify-between gap-x-2 rounded-t-xl border border-muted border-b-0 bg-background/64 p-2 pb-4 backdrop-blur-lg md:hidden">
    <Link
      href="/"
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background-400/10 hover:text-foreground"
    >
      <HomeIcon size={20} />
      <span className="text-xs">ホーム</span>
    </Link>
    <Link
      href="/search"
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background-400/10 hover:text-foreground"
    >
      <SearchIcon size={20} />
      <span className="text-xs">検索</span>
    </Link>
    <Link
      href="/settings"
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background-400/10 hover:text-foreground"
    >
      <TelescopeIcon size={20} />
      <span className="text-xs">探す</span>
    </Link>
    <Link
      href="/track"
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background-400/10 hover:text-foreground"
    >
      <PenToolIcon size={20} />
      <span className="text-xs">記録する</span>
    </Link>
  </div>
)
