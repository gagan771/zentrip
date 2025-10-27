"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex min-h-screen h-auto sm:h-screen w-screen shrink-0 snap-start items-center px-4 py-16 sm:py-20 md:px-12 md:py-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground">
            Capabilities
          </h2>
          <p className="font-mono text-xs sm:text-sm md:text-base text-foreground/60">/ What we bring to the table</p>
        </div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:gap-x-16 xl:gap-x-24">
          {[
            {
              title: "Creative Development",
              description: "Pushing the boundaries of what's possible on the web",
              direction: "top",
            },
            {
              title: "Visual Design",
              description: "Crafting memorable experiences through thoughtful aesthetics",
              direction: "right",
            },
            {
              title: "Motion & Animation",
              description: "Bringing interfaces to life with purposeful movement",
              direction: "left",
            },
            {
              title: "Technical Strategy",
              description: "Building scalable solutions that perform beautifully",
              direction: "bottom",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
        <div className="h-px w-6 sm:w-8 bg-foreground/30 transition-all duration-300 group-hover:w-8 sm:group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs sm:text-sm text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-1.5 sm:mb-2 font-sans text-xl sm:text-2xl md:text-3xl font-light text-foreground">{service.title}</h3>
      <p className="max-w-sm text-sm sm:text-base leading-relaxed text-foreground/80">{service.description}</p>
    </div>
  )
}
