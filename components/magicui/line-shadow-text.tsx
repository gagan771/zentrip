"use client"
import type { JSX } from "react" // Declare the JSX variable

interface LineShadowTextProps {
  children: string
  shadowColor?: string
  as?: keyof JSX.IntrinsicElements
  className?: string
}

export function LineShadowText({
  children,
  shadowColor = "rgba(255, 255, 255, 0.3)",
  as: Component = "span",
  className = "",
}: LineShadowTextProps) {
  return (
    <Component
      className={`relative inline-block font-light font-mono italic border-card shadow-xs text-xl text-[rgba(254,23,23,1)] bg-black ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${shadowColor} 50%, transparent 100%)`,
        backgroundSize: "200% 100%",
        animation: "lineShadow 3s ease-in-out infinite",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes lineShadow {
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
      `}</style>
    </Component>
  )
}
