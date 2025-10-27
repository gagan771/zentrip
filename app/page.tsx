"use client"

import type React from "react"
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { Confetti } from "@/components/magicui/confetti"
import { LineShadowText } from "@/components/magicui/line-shadow-text"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const confettiRef = useRef<HTMLCanvasElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        // Show confetti and success immediately
        if (confettiRef.current) {
          const confetti = require("canvas-confetti");
          confetti({
            canvas: confettiRef.current,
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
          });
        }
  setIsSubmitted(true);
  setEmail("");
  setError("");
      } else {
        // Only show error if API returns error
        const data = await res.json();
        setError(data.error || 'Failed to join waitlist');
        setIsSubmitted(false);
      }
    } catch (err) {
      setError('');
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <Confetti ref={confettiRef} />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        className={`relative z-10 flex h-screen w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Z Icon */}
        <div className="mb-6 sm:mb-8 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25 animate-in fade-in slide-in-from-top-4">
          <span className="text-2xl sm:text-3xl font-serif italic font-black text-[rgba(238,238,238,1)]">Z</span>
        </div>

        {/* Main Heading - Responsive text sizes */}
        <h1 className="mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-4 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight duration-700 text-balance font-serif font-light text-primary-foreground rounded-lg px-2">
          Zentrip.Social
        </h1>

        {/* Subheading - Responsive text and spacing */}
        <p className="mb-8 sm:mb-10 md:mb-12 max-w-sm sm:max-w-md px-4 animate-in fade-in slide-in-from-bottom-4 text-center text-base sm:text-lg text-foreground/80 duration-700 delay-100">
          Join our waitlist to be the first to experience the future
        </p>

        {/* Waitlist Form - Better mobile layout */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isSubmitted) setIsSubmitted(false);
                if (error) setError("");
              }}
              required
              className="flex-1 rounded-full bg-foreground/10 px-5 sm:px-6 py-3 sm:py-3.5 font-sans text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-md transition-all duration-300 border border-foreground/20 hover:border-foreground/40 focus:border-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <MagneticButton 
              variant="primary" 
              size="lg" 
              className="whitespace-nowrap w-full sm:w-auto" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : isSubmitted ? "Joined!" : "Join Waitlist"}
            </MagneticButton>
          </div>
        </form>

        {/* Success Message */}
        {isSubmitted && (
          <p className="mt-4 sm:mt-6 px-4 animate-in fade-in text-center text-sm sm:text-base text-foreground/80">
            Thanks for joining! Check your email for updates.
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-4 sm:mt-6 px-4 animate-in fade-in text-center text-sm sm:text-base text-red-500">
            {error}
          </p>
        )}
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
