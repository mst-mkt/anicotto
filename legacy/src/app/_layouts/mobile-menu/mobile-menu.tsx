import { BookTextIcon, HomeIcon, PenToolIcon, SearchIcon, TelescopeIcon } from 'lucide-react'
import Link from 'next/link'

export const BottomMenu = () => (
  <div className="fixed bottom-0 z-50 left-0 flex w-full justify-between rounded-t-xl border border-muted border-b-0 bg-background/64 p-2 backdrop-blur-lg md:hidden [@media(display-mode:standalone)]:pb-4">
    <Link
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors active:bg-background-400/10 active:text-foreground"
      href="/"
    >
      <HomeIcon size={20} />
      <span className="break-keep text-xs">ホーム</span>
    </Link>
    <Link
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors active:bg-background-400/10 active:text-foreground"
      href="/search"
    >
      <SearchIcon size={20} />
      <span className="break-keep text-xs">検索</span>
    </Link>
    <Link
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors active:bg-background-400/10 active:text-foreground"
      href="/library"
    >
      <BookTextIcon size={20} />
      <span className="break-keep text-xs">ライブラリ</span>
    </Link>
    <Link
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors active:bg-background-400/10 active:text-foreground"
      href="/discover"
    >
      <TelescopeIcon size={20} />
      <span className="break-keep text-xs">探す</span>
    </Link>
    <Link
      className="flex w-full shrink flex-col items-center gap-y-2 rounded-lg p-2 text-muted-foreground transition-colors active:bg-background-400/10 active:text-foreground"
      href="/track"
    >
      <PenToolIcon size={20} />
      <span className="break-keep text-xs">記録する</span>
    </Link>
  </div>
)
