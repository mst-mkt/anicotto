import { RatingIcon } from '../../../../../../../components/icon/rating'
import { Label } from '../../../../../../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../../../../../../components/ui/radio-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../../../components/ui/tooltip'
import { RATING_TEXT } from '../../../../../../../constants/text/rating'
import { ratingPicklist } from '../../../../../../../schemas/annict/common'
import { cn } from '../../../../../../../utils/classnames'

export const RatingSelect = () => (
  <Label className="flex flex-col gap-y-2">
    <span>評価</span>
    <RadioGroup name="rating" className="flex gap-0 rounded-lg bg-background shadow-xs">
      {ratingPicklist.options.map((rating) => (
        <Tooltip key={rating}>
          <TooltipTrigger asChild={true}>
            <Label
              className={cn(
                '!border-input relative flex w-full shrink cursor-pointer justify-center border p-2 outline-background-900/10 transition-colors',
                'first:rounded-s-lg last:rounded-e-lg',
                'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
                'has-[[data-state=checked]]:z-10',
                'has-[:focus-visible]:outline-4',

                rating === 'great' &&
                  '!border-anicotto-rating-good/12 bg-anicotto-rating-great-pale/10 text-anicotto-rating-great hover:bg-anicotto-rating-great-pale/16',
                rating === 'good' &&
                  '!border-anicotto-rating-good/12 bg-anicotto-rating-good-pale/10 text-anicotto-rating-good hover:bg-anicotto-rating-good-pale/16',
                rating === 'average' &&
                  '!border-anicotto-rating-average/12 bg-anicotto-rating-average-pale/10 text-anicotto-rating-average hover:bg-anicotto-rating-average-pale/16',
                rating === 'bad' &&
                  '!border-anicotto-rating-bad/12 bg-anicotto-rating-bad-pale/10 text-anicotto-rating-bad hover:bg-anicotto-rating-bad-pale/16',
              )}
            >
              <RadioGroupItem value={rating} className="sr-only" />
              <RatingIcon rating={rating} size={20} className="text-muted-foreground" />
            </Label>
          </TooltipTrigger>
          <TooltipContent>{RATING_TEXT(rating)}</TooltipContent>
        </Tooltip>
      ))}
    </RadioGroup>
  </Label>
)
