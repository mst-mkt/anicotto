import {} from 'lucide-react'
import type { FC } from 'react'
import { Label } from '../../../../../../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../../../../../../components/ui/radio-group'
import { RATING_ICON, RATING_TEXT } from '../../../../../../../constants/rating'
import { cn } from '../../../../../../../utils/classnames'

const rating = [
  {
    value: 'great',
    label: RATING_TEXT.great,
    icon: RATING_ICON.great,
    className:
      'has-[[data-state=checked]]:!border-anicotto-rating-great has-[[data-state=checked]]:text-anicotto-rating-great has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-anicotto-rating-great/4 has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-great',
  },
  {
    value: 'good',
    label: RATING_TEXT.good,
    icon: RATING_ICON.good,
    className:
      'has-[[data-state=checked]]:!border-anicotto-rating-good has-[[data-state=checked]]:text-anicotto-rating-good has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-anicotto-rating-good/4 has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-good',
  },
  {
    value: 'average',
    label: RATING_TEXT.average,
    icon: RATING_ICON.average,
    className:
      'has-[[data-state=checked]]:!border-anicotto-rating-average has-[[data-state=checked]]:text-anicotto-rating-average has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-anicotto-rating-average/4 has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-average',
  },
  {
    value: 'bad',
    label: RATING_TEXT.bad,
    icon: RATING_ICON.bad,
    className:
      'has-[[data-state=checked]]:!border-anicotto-rating-bad has-[[data-state=checked]]:text-anicotto-rating-bad has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:bg-anicotto-rating-bad/4 has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-bad',
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
