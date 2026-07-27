import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Blueprint of the two métiers as an exploded stack: business software
 * (interfaces + cœur métier) resting on sovereign infrastructure. Each
 * plate draws itself in when revealed (stroke draw + fill fade), the
 * stack floats gently, and pulses of value travel the rails — blue rising
 * (value delivered), vermilion descending (control anchored). Pure SVG +
 * CSS keyframes, static under reduced motion.
 */

const PLATES = [
  {
    cy: 88,
    accent: 'var(--blue)',
    fill: 'oklch(0.48 0.19 262 / 5%)',
    label: 'Interfaces & produits',
    delay: 480,
    floatDelay: 0,
  },
  {
    cy: 170,
    accent: 'var(--foreground)',
    fill: 'oklch(0.21 0.03 264 / 4%)',
    label: 'Cœur métier',
    delay: 240,
    floatDelay: 900,
  },
  {
    cy: 252,
    accent: 'var(--red)',
    fill: 'oklch(0.55 0.22 27 / 5%)',
    label: 'Infrastructure souveraine',
    delay: 0,
    floatDelay: 1800,
  },
]

const HW = 150
const HH = 42
const CX = 250

const diamond = (cy: number, sx: number, sy: number) =>
  `M ${CX} ${cy - HH * sy} L ${CX + HW * sx} ${cy} L ${CX} ${cy + HH * sy} L ${CX - HW * sx} ${cy} Z`

export function StackDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 650 340"
      className={cn('block', className)}
      role="img"
      aria-label="Schéma : interfaces et cœur métier reposant sur une infrastructure souveraine"
    >
      {/* Central axis */}
      <line
        x1={CX}
        y1={30}
        x2={CX}
        y2={310}
        stroke="var(--border)"
        strokeDasharray="2 6"
        className="iso-detail"
        style={{ '--iso-delay': '900ms' } as CSSProperties}
      />
      {/* Side rails */}
      {[CX - HW, CX + HW].map((x) => (
        <line
          key={x}
          x1={x}
          y1={PLATES[0].cy}
          x2={x}
          y2={PLATES[2].cy}
          stroke="var(--border)"
          className="iso-detail"
          style={{ '--iso-delay': '1050ms' } as CSSProperties}
        />
      ))}

      {PLATES.map((plate) => (
        <g
          key={plate.cy}
          className="iso-float"
          style={
            {
              '--iso-delay': `${plate.delay}ms`,
              '--iso-float-delay': `${plate.floatDelay}ms`,
            } as CSSProperties
          }
        >
          {/* Thickness under the two lower edges */}
          <path
            d={`M ${CX - HW} ${plate.cy} L ${CX} ${plate.cy + HH} L ${CX} ${plate.cy + HH + 9} L ${CX - HW} ${plate.cy + 9} Z`}
            fill="oklch(0.21 0.03 264 / 4%)"
            className="iso-detail"
          />
          <path
            d={`M ${CX + HW} ${plate.cy} L ${CX} ${plate.cy + HH} L ${CX} ${plate.cy + HH + 9} L ${CX + HW} ${plate.cy + 9} Z`}
            fill="oklch(0.21 0.03 264 / 6%)"
            className="iso-detail"
          />
          {/* The plate itself, drawing in */}
          <path
            d={diamond(plate.cy, 1, 1)}
            fill={plate.fill}
            stroke={plate.accent}
            strokeWidth={1.1}
            className="iso-plate"
          />
          <path
            d={diamond(plate.cy, 0.62, 0.62)}
            fill="none"
            stroke={plate.accent}
            strokeOpacity={0.35}
            strokeDasharray="3 5"
            className="iso-detail"
          />
          {/* Corner nodes */}
          {[
            [CX, plate.cy - HH],
            [CX + HW, plate.cy],
            [CX, plate.cy + HH],
            [CX - HW, plate.cy],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={2.4} fill={plate.accent} className="iso-detail" />
          ))}
          <text
            x={CX + HW + 18}
            y={plate.cy + 3.5}
            fill="var(--muted-foreground)"
            fontSize={10}
            letterSpacing="0.12em"
            className="iso-detail font-mono uppercase"
          >
            {plate.label}
          </text>
        </g>
      ))}

      {/* Value rises, control descends */}
      <circle
        cx={CX - HW}
        cy={PLATES[2].cy}
        r={2.4}
        fill="var(--blue)"
        className="iso-pulse iso-pulse-up"
        style={{ '--iso-delay': '1300ms' } as CSSProperties}
      />
      <circle
        cx={CX + HW}
        cy={PLATES[0].cy}
        r={2.4}
        fill="var(--red)"
        className="iso-pulse iso-pulse-down"
        style={{ '--iso-delay': '2400ms' } as CSSProperties}
      />
      <circle
        cx={CX}
        cy={PLATES[0].cy - HH}
        r={2.2}
        fill="var(--blue)"
        className="iso-pulse iso-pulse-axis"
        style={{ '--iso-delay': '3300ms' } as CSSProperties}
      />
    </svg>
  )
}
