'use client'

import type { Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import type { MouseEvent } from 'react'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import type { PqoqubbwIconHandle, PqoqubbwIconProps } from './types'

const pathVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
}

const SunIcon = forwardRef<PqoqubbwIconHandle, PqoqubbwIconProps>(
  ({ onMouseEnter, onMouseLeave, size, ...props }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
      isControlledRef.current = true

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      }
    })

    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate')
        } else {
          onMouseEnter?.(e)
        }
      },
      [controls, onMouseEnter],
    )

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal')
        } else {
          onMouseLeave?.(e)
        }
      },
      [controls, onMouseLeave],
    )
    return (
      <div
        className="select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size ?? 28}
          height={size ?? 28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none"
        >
          <title>sun icon by pqoqubbw/icons</title>
          <circle cx="12" cy="12" r="4" />
          {[
            'M12 2v2',
            'm19.07 4.93-1.41 1.41',
            'M20 12h2',
            'm17.66 17.66 1.41 1.41',
            'M12 20v2',
            'm6.34 17.66-1.41 1.41',
            'M2 12h2',
            'm4.93 4.93 1.41 1.41',
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              animate={controls}
              variants={pathVariants}
              custom={index + 1}
            />
          ))}
        </svg>
      </div>
    )
  },
)

SunIcon.displayName = 'SunIcon'

export { SunIcon }
