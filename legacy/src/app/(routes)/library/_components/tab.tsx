'use client'

import { useQueryState } from 'nuqs'
import type { FC, ReactNode } from 'react'
import { StatusIcon } from '../../../../components/icon/status'
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs'
import { STATUS_TEXT } from '../../../../constants/text/status'
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

const TabTrigger: FC<TabTriggerProps> = ({ status }) => (
  <TabsTrigger className="cursor-pointer gap-x-1" value={status}>
    <StatusIcon className="hidden md:block" size={16} status={status} />
    {STATUS_TEXT(status)}
  </TabsTrigger>
)
