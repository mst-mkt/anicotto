import { Indicator, Item, Root } from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'
import { cn } from '../../utils/classnames'

const RadioGroup = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root className={cn('grid gap-2', className)} {...props} ref={ref} />
  ),
)
RadioGroup.displayName = Root.displayName

const RadioGroupItem = forwardRef<ComponentRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => (
    <Item
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </Indicator>
    </Item>
  ),
)
RadioGroupItem.displayName = Item.displayName

export { RadioGroup, RadioGroupItem }
