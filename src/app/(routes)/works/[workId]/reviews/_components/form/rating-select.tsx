import type { FC } from 'react'
import { RatingIcon } from '../../../../../../../components/icon/rating'
import { Label } from '../../../../../../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../../../../../../components/ui/radio-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../../../components/ui/tooltip'
import { RATING_TEXT } from '../../../../../../../constants/text/rating'
import { ratingPicklist } from '../../../../../../../schemas/annict/common'
import { cn } from '../../../../../../../utils/classnames'

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
      {ratingPicklist.options.map((rating) => (
        <Tooltip key={rating}>
          <TooltipTrigger asChild={true}>
            <Label
              className={cn(
                '!border-input relative flex w-full shrink cursor-pointer flex-col items-center justify-center gap-2 border p-2 text-sm outline-background-900/10 transition-colors md:flex-row',
                'first:rounded-s-lg last:rounded-e-lg',
                'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
                'has-[[data-state=checked]]:z-10',
                'has-[:focus-visible]:outline-4',

                rating === 'great' &&
                  'has-[[data-state=checked]]:!border-anicotto-rating-great has-[[data-state=checked]]:bg-anicotto-rating-great/4 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:text-anicotto-rating-great has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-great',
                rating === 'good' &&
                  'has-[[data-state=checked]]:!border-anicotto-rating-good has-[[data-state=checked]]:bg-anicotto-rating-good/4 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:text-anicotto-rating-good has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-good',
                rating === 'average' &&
                  'has-[[data-state=checked]]:!border-anicotto-rating-average has-[[data-state=checked]]:bg-anicotto-rating-average/4 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:text-anicotto-rating-average has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-average',
                rating === 'bad' &&
                  'has-[[data-state=checked]]:!border-anicotto-rating-bad has-[[data-state=checked]]:bg-anicotto-rating-bad/4 has-[[data-state=checked]]:font-bold has-[[data-state=checked]]:text-anicotto-rating-bad has-[[data-state=checked]]:[&>svg]:text-anicotto-rating-bad',
              )}
            >
              <RadioGroupItem value={rating} className="sr-only" />
              <RatingIcon rating={rating} size={20} className="text-muted-foreground" />
              {showItemLabel && <span>{RATING_TEXT(rating)}</span>}
            </Label>
          </TooltipTrigger>
          {!showItemLabel && <TooltipContent>{RATING_TEXT(rating)}</TooltipContent>}
        </Tooltip>
      ))}
    </RadioGroup>
  </div>
)
