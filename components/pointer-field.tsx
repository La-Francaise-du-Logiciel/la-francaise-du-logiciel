'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Tracks the pointer over its parent element and exposes the normalized
 * position as --mx/--my custom properties on its own root, so children
 * (e.g. .bloom) can drift relative to the cursor in pure CSS.
 */
export function PointerField({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = node.parentElement ?? node
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.setProperty('--mx', x.toFixed(4))
        node.style.setProperty('--my', y.toFixed(4))
      })
    }
    target.addEventListener('mousemove', onMove)
    return () => {
      target.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {children}
    </div>
  )
}
