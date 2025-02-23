'use client'

import { LogOutIcon } from 'lucide-react'
import { logoutAction } from '../../actions/auth/logout'

export const LogOutButton = () => (
  <button
    type="button"
    onClick={logoutAction}
    className="flex cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors active:bg-muted"
  >
    <LogOutIcon size={20} />
    ログアウト
  </button>
)
