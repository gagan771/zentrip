"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex min-h-screen h-auto sm:h-screen w-screen shrink-0 snap-start items-center px-4 py-16 sm:py-20 md:px-12 md:py-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 sm:mb-8 md:mb-12 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4">
                Building the
                <br />
                future of
                <br />
                <span className="text-foreground/40">digital</span>
              </h2>
            </div>

            <div
              className={`space-y-3 md:space-y-4 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90">
                We're a collective of designers, developers, and creative technologists obsessed with crafting
                exceptional digital experiences.
              </p>
              <p className="max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90">
                Every project is an opportunity to explore new possibilities and push creative boundaries.
              </p>
            </div>
          </div>

          {/* Right side - Stats with creative layout */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-12">
            {[
              { value: "150+", label: "Projects", sublabel: "Delivered worldwide", direction: "right" },
              { value: "8", label: "Years", sublabel: "Of innovation", direction: "left" },
              { value: "12", label: "Awards", sublabel: "Industry recognition", direction: "right" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-3 sm:gap-4 md:gap-8 border-l border-foreground/30 pl-3 sm:pl-4 md:pl-8 transition-all duration-700 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base sm:text-lg md:text-xl font-light text-foreground">{stat.label}</div>
                    <div className="font-mono text-xs sm:text-sm text-foreground/60">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)} className="w-full sm:w-auto">
            Start a Project
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)} className="w-full sm:w-auto">
            View Our Work
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
