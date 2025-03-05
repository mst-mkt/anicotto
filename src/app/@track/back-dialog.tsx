'use client'

import { useRouter } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type BackDialogProps = {
  children?: ReactNode
  title?: string
  description?: string
}

export const BackDialog: FC<BackDialogProps> = (props) => {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 48rem)')

  return isMobile ? (
    <Drawer open={true} onOpenChange={(open) => !open && router.back()}>
      <DrawerContent className="max-h-[92svh]">
        <div className="overflow-y-auto">
          <DrawerHeader className="text-center sm:text-center">
            <DrawerTitle>{props.title}</DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-[4svw]">{props.children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={true} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="w-[92svw] max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="w-full min-w-0">{props.children}</div>
      </DialogContent>
    </Dialog>
  )
}
