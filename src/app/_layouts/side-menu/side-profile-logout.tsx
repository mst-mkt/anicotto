'use client'

import { LogOutIcon } from 'lucide-react'
import { DropdownMenuItem } from '../../../components/ui/dropdown'
import { logoutAction } from '../../actions/auth/logout'

export const SideProfileLogout = () => (
  <DropdownMenuItem onClick={logoutAction}>
    <LogOutIcon />
    <span>ログアウト</span>
  </DropdownMenuItem>
)
