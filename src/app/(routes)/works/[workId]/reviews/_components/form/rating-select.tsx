import { BombIcon, CupSodaIcon, MoonStarIcon, SparkleIcon } from 'lucide-react'
import type { FC } from 'react'
import { Label } from '../../../../../../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../../../../../../components/ui/radio-group'
import { cn } from '../../../../../../../utils/classnames'

const rating = [
  {
    value: 'great',
    label: 'とても良い',
    icon: MoonStarIcon,
    className:
      'has-[[data-state=checked]]:!border-amber-700 has-[[data-state=checked]]:text-amber-700 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-amber-500/4 has-[[data-state=checked]]:[&>svg]:text-amber-700',
  },
  {
    value: 'good',
    label: '良い',
    icon: SparkleIcon,
    className:
      'has-[[data-state=checked]]:!border-emerald-700 has-[[data-state=checked]]:text-emerald-700 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-emerald-500/4 has-[[data-state=checked]]:[&>svg]:text-emerald-700',
  },
  {
    value: 'average',
    label: '普通',
    icon: CupSodaIcon,
    className:
      'has-[[data-state=checked]]:!border-cyan-700 has-[[data-state=checked]]:text-cyan-700 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-cyan-500/4 has-[[data-state=checked]]:[&>svg]:text-cyan-700',
  },
  {
    value: 'bad',
    label: '良くない',
    icon: BombIcon,
    className:
      'has-[[data-state=checked]]:!border-rose-700 has-[[data-state=checked]]:text-rose-700 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-rose-500/4 has-[[data-state=checked]]:[&>svg]:text-rose-700',
  },
] as const

type RatingSelectProps = {
  name: string
  label?: string
  showItemLabel?: boolean
  className?: string
}

export const RatingSelect: FC<RatingSelectProps> = ({
  name,
  label,
  showItemLabel = true,
  className,
}) => (
  <div className={cn('flex flex-col gap-y-2', className)}>
    {label !== undefined && <Label htmlFor={`rating-${name}`}>{label}</Label>}
    <RadioGroup id={`rating-${name}`} name={name} className="flex gap-0 rounded-lg shadow-xs">
      {rating.map((rating) => (
        <Label
          key={rating.value}
          className={cn(
            '!border-input relative flex w-full shrink cursor-pointer flex-col items-center justify-center gap-2 border p-2 text-sm outline-background-900/10 transition-colors md:flex-row',
            'first:rounded-s-lg last:rounded-e-lg',
            'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
            'has-[[data-state=checked]]:z-10',
            'has-[:focus-visible]:outline-4',
            rating.className,
          )}
        >
          <RadioGroupItem value={rating.value} className="sr-only" />
          <rating.icon size={20} className="text-muted-foreground" />
          {showItemLabel && <span>{rating.label}</span>}
        </Label>
      ))}
    </RadioGroup>
  </div>
)
