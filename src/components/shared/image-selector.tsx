'use client'

import { type ComponentProps, type FC, useLayoutEffect, useState } from 'react'

const checkValidSource = async (source: string) => {
  if (source === '') return false

  const img = new Image()
  img.src = source

  return new Promise<boolean>((resolve) => {
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

type ImageSelectorProps = {
  sources: string[]
} & Omit<ComponentProps<'img'>, 'src'>

export const ImageSelector: FC<ImageSelectorProps> = ({ sources, ...props }) => {
  const [validSource, setValidSource] = useState(sources[0] ?? '')

  useLayoutEffect(() => {
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: for checking valid source
    const checkSources = async () => {
      for (const source of sources) {
        const isValid = await checkValidSource(source)
        if (isValid) {
          setValidSource(source)
          break
        }
      }
    }

    checkSources()
  }, [sources])

  if (validSource === '') return null

  // biome-ignore lint/a11y/useAltText: `props` includes `alt` attribute
  return <img src={validSource} {...props} />
}
