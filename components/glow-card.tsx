'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  /** CSS color of the glow, e.g. 'var(--blue)'. */
  accent?: string
  className?: string
  contentClassName?: string
  children: ReactNode
}

/**
 * Card whose 1px border ring is lit by a radial gradient chasing the
 * pointer (with a lagged ease, so it drifts behind the cursor), plus a
 * faint interior tint of the same light. The gradient position is driven
 * by --gx/--gy custom properties; CSS does all the animating.
 */
export function GlowCard({ accent = 'var(--primary)', className, contentClassName, children }: GlowCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--gx', `${node.clientWidth / 2}px`)
    node.style.setProperty('--gy', `${node.clientHeight / 2}px`)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.setProperty('--gx', `${x}px`)
        node.style.setProperty('--gy', `${y}px`)
      })
    }
    node.addEventListener('mousemove', onMove)
    return () => {
      node.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn('glow-card', className)}
      style={{ '--glow-accent': accent } as CSSProperties}
    >
      <div aria-hidden="true" className="glow-card__ring">
        <div className="glow-card__gradient" />
      </div>
      <div className={cn('glow-card__content', contentClassName)}>
        <div aria-hidden="true" className="glow-card__light">
          <div className="glow-card__gradient glow-card__gradient--soft" />
        </div>
        {children}
      </div>
    </div>
  )
}
