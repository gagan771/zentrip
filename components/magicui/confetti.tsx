"use client"

import React, { useRef } from "react"
import confetti from "canvas-confetti"

interface ConfettiProps {
  options?: confetti.Options
  children?: React.ReactNode
}

export const Confetti = React.forwardRef<HTMLCanvasElement, ConfettiProps>(({ options = {}, children }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  React.useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement)

  const fire = React.useCallback(() => {
    if (canvasRef.current) {
      confetti({
        canvas: canvasRef.current,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        ...options,
      })
    }
  }, [options])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        style={{ width: "100%", height: "100%" }}
      />
      {children}
    </>
  )
})

Confetti.displayName = "Confetti"

export const ConfettiButton = React.forwardRef<
  HTMLButtonElement,
  ConfettiProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ options, children, ...props }, ref) => {
  const confettiRef = useRef<HTMLCanvasElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confettiRef.current) {
      confetti({
        canvas: confettiRef.current,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        ...options,
      })
    }
    props.onClick?.(e)
  }

  return (
    <>
      <canvas
        ref={confettiRef}
        className="pointer-events-none fixed inset-0 z-50"
        style={{ width: "100%", height: "100%" }}
      />
      <button ref={ref} {...props} onClick={handleClick}>
        {children}
      </button>
    </>
  )
})

ConfettiButton.displayName = "ConfettiButton"
