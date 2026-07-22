'use client'

import { ChevronDownIcon } from 'lucide-react'
import { type FC, type ReactNode, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../components/ui/collapsible'

type CollapseListProps = {
  children: ReactNode[]
  thumbnailCount: number
  className?: string
}

export const CollapseList: FC<CollapseListProps> = ({ children, thumbnailCount, className }) => {
  const [open, setOpen] = useState(false)

  if (children.length <= thumbnailCount) {
    return <div className={className}>{children}</div>
  }

  return (
    <Collapsible className={className} onOpenChange={setOpen} open={open}>
      {children.slice(0, thumbnailCount)}
      {!open && (
        <CollapsibleTrigger asChild={true}>
          <Button className="mx-auto w-fit cursor-pointer rounded-full" variant="ghost">
            <ChevronDownIcon size={24} />
            <span>すべて表示する</span>
          </Button>
        </CollapsibleTrigger>
      )}
      <CollapsibleContent className="contents">{children.slice(thumbnailCount)}</CollapsibleContent>
    </Collapsible>
  )
}
