import { Root } from '@radix-ui/react-label'
import { type VariantProps, cva } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'
import { cn } from '../../utils/classnames'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = Root.displayName

export { Label }
