'use client'

import { classnames, variants } from '@anicotto/utils/classname'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import type { FC } from 'react'

// TODO: Temporary styles and variants
const buttonVariants = variants({
  base: 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50',
})

export type ButtonProps = useRender.ComponentProps<'button'>

export const Button: FC<ButtonProps> = (props) => {
  const { render, ...otherProps } = props
  const merged = mergeProps<'button'>({ className: buttonVariants(), type: 'button' }, otherProps)

  return useRender({
    defaultTagName: 'button',
    render,
    props: { ...merged, className: classnames(merged.className) },
  })
}
