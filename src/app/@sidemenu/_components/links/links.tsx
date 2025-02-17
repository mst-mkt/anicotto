import { BookTextIcon } from '../../../../components/icons/book-text'
import { HomeIcon } from '../../../../components/icons/home'
import { PenToolIcon } from '../../../../components/icons/pen-tool'
import { SearchIcon } from '../../../../components/icons/search'
import { TelescopeIcon } from '../../../../components/icons/telescope'
import { SidemenuLinkItem } from './item'

export const SidemenuLinks = () => (
  <ul className="sticky top-16 flex flex-col gap-y-4">
    <SidemenuLinkItem icon={HomeIcon} href="/" label="ホーム" />
    <SidemenuLinkItem icon={SearchIcon} href="/search" label="検索" />
    <SidemenuLinkItem icon={BookTextIcon} href="/library" label="ライブラリ" />
    <SidemenuLinkItem icon={TelescopeIcon} href="/discover" label="探す" />
    <SidemenuLinkItem icon={PenToolIcon} href="/track" label="記録する" />
  </ul>
)
