'use client'

import type { FC } from 'react'
import { login } from '../../lib/auth-client'

export const LoginButton: FC = () => (
  <button type="button" onClick={login}>
    ログイン
  </button>
)
