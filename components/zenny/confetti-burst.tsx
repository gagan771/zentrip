import type { CSSProperties } from 'react'

type ConfettiBurstProps = {
  active: boolean
}

const PIECES = [
  [8, -46, -210, 0, '#00e5dc'],
  [17, -28, 165, 40, '#74f0d5'],
  [26, -18, -135, 90, '#e8fffc'],
  [35, -38, 230, 15, '#ffca66'],
  [48, -9, -260, 60, '#00bdb5'],
  [59, -32, 190, 110, '#74f0d5'],
  [68, -15, -160, 30, '#e8fffc'],
  [79, -44, 285, 75, '#ffca66'],
  [88, -23, -300, 20, '#00e5dc'],
] as const

/** A short, one-off celebration when a live voice connection is ready. */
export function ConfettiBurst({ active }: ConfettiBurstProps) {
  if (!active) return null

  return (
    <div className="zn-confetti" aria-hidden="true">
      {PIECES.map(([left, travel, turn, delay, color], index) => (
        <span
          key={index}
          className="zn-confetti-piece"
          style={
            {
              left: `${left}%`,
              backgroundColor: color,
              animationDelay: `${delay}ms`,
              '--zn-confetti-x': `${travel}px`,
              '--zn-confetti-turn': `${turn}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
