'use client'

import { LogOutIcon } from 'lucide-react'
import { logoutAction } from '../../actions/auth/logout'

export const LogOutButton = () => (
  <button
    className="flex cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors active:bg-muted"
    onClick={logoutAction}
    type="button"
  >
    <LogOutIcon size={20} />
    ログアウト
  </button>
)
