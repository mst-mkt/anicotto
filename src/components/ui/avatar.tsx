'use client'

import { Fallback, Image, Root } from '@radix-ui/react-avatar'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'
import { cn } from '../../utils/classnames'

const Avatar = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  ),
)
Avatar.displayName = Root.displayName

const AvatarImage = forwardRef<ComponentRef<typeof Image>, ComponentPropsWithoutRef<typeof Image>>(
  ({ className, ...props }, ref) => (
    <Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
  ),
)
AvatarImage.displayName = Image.displayName

const AvatarFallback = forwardRef<
  ComponentRef<typeof Fallback>,
  ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
