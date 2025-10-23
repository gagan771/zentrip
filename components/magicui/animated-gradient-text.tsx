"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className = "",
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
}: AnimatedGradientTextProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animationDuration = 3 / speed

    element.style.backgroundImage = `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`
    element.style.backgroundSize = "200% 100%"
    element.style.animation = `gradient-shift ${animationDuration}s ease-in-out infinite`

    const style = document.createElement("style")
    style.textContent = `
      @keyframes gradient-shift {
        0% {
          background-position: 200% 0;
        }
        50% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [speed, colorFrom, colorTo])

  return (
    <div ref={elementRef} className={`bg-clip-text text-transparent ${className}`}>
      {children}
    </div>
  )
}
