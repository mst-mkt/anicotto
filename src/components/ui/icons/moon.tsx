'use client'

import type { Transition, Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import type { MouseEvent } from 'react'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import type { PqoqubbwIconHandle, PqoqubbwIconProps } from './types'

const svgVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
  },
}

const svgTransition: Transition = {
  duration: 1.2,
  ease: 'easeInOut',
}

const MoonIcon = forwardRef<PqoqubbwIconHandle, PqoqubbwIconProps>(
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
        <motion.svg
          animate={controls}
          className="pointer-events-none"
          fill="none"
          height={size ?? 28}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transition={svgTransition}
          variants={svgVariants}
          viewBox="0 0 24 24"
          width={size ?? 28}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>moon icon by pqoqubbw/icons</title>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </motion.svg>
      </div>
    )
  },
)

MoonIcon.displayName = 'MoonIcon'

export { MoonIcon }
