'use client'

import { useQueryState } from 'nuqs'
import type { FC, ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs'
import { STATUS_ICON, STATUS_TEXT } from '../../../../constants/status'
import { type Status, statusPicklist } from '../../../../schemas/annict/common'
import { librarySearchParams } from '../search-params'

type SelectedStatus = Exclude<Status, 'no_select'>

type TabProps = {
  initialStatus: SelectedStatus
  children: ReactNode
}

export const Tab: FC<TabProps> = ({ initialStatus, children }) => {
  const [status, setStatus] = useQueryState('status', librarySearchParams.status)

  return (
    <Tabs
      defaultValue={initialStatus}
      onValueChange={(value) => setStatus(value as SelectedStatus)}
      value={status ?? initialStatus}
    >
      <TabsList>
        {statusPicklist.options
          .filter((status) => status !== 'no_select')
          .map((status) => (
            <TabTrigger key={status} status={status} />
          ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

type TabTriggerProps = {
  status: SelectedStatus
}

const TabTrigger: FC<TabTriggerProps> = ({ status }) => {
  const Icon = STATUS_ICON[status]

  return (
    <TabsTrigger value={status} className="cursor-pointer gap-x-1">
      <Icon size={16} className="hidden md:block" />
      {STATUS_TEXT[status]}
    </TabsTrigger>
  )
}
