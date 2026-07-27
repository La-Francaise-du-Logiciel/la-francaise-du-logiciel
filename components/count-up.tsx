'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  from?: number
  /** Total animation time in ms. */
  duration?: number
  /** Fraction digits, rendered with a French decimal comma. */
  decimals?: number
  suffix?: string
  className?: string
}

/**
 * Renders the final value on the server, then counts from `from` to `to`
 * with an ease-out when scrolled into view. Static under reduced motion.
 */
export function CountUp({ to, from = 0, duration = 1400, decimals = 0, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          setValue(from + (to - from) * eased)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        setValue(from)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [from, to, duration])

  const display = decimals > 0 ? value.toFixed(decimals).replace('.', ',') : String(Math.round(value))

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
