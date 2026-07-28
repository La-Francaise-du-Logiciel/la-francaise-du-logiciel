'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealVariant = 'fade-up' | 'mask-rise' | 'group'

const VARIANT_CLASSES: Record<RevealVariant, { init: string; in: string }> = {
  /* Fade + rise of the element itself. */
  'fade-up': { init: 'reveal-init', in: 'reveal-in' },
  /* Clip-mask rise, for serif headings. */
  'mask-rise': { init: 'mask-init', in: 'mask-in' },
  /* No animation on the wrapper: toggles .reveal-on so descendants
     (.step-*, .mw, .ignite) run their own staggered transitions. */
  group: { init: '', in: 'reveal-on' },
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Delay in milliseconds before the reveal transition begins. */
  delay?: number
  variant?: RevealVariant
  as?: 'div' | 'section' | 'li' | 'article' | 'ol' | 'blockquote'
}

export function Reveal({ children, className, delay = 0, variant = 'fade-up', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let timeout = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          timeout = window.setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [delay])

  const Tag = as as 'div'
  const classes = VARIANT_CLASSES[variant]
  const stateClass = visible ? classes.in : classes.init

  /* The mask clips its element to zero area, which stops IntersectionObserver
     from ever seeing the wrapper intersect, so clip an inner element instead. */
  if (variant === 'mask-rise') {
    return (
      <Tag ref={ref} className={className}>
        <div className={stateClass}>{children}</div>
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={cn(stateClass, className)}>
      {children}
    </Tag>
  )
}
