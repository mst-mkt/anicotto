'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from '../../ui/dropdown'

export const SideProfileLogout = () => (
  <DropdownMenuItem onClick={() => signOut({ redirectTo: '/login' })}>
    <LogOutIcon />
    <span>ログアウト</span>
  </DropdownMenuItem>
)
